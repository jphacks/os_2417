class SpeechRecognitionHandler {
    constructor(textarea, controller) {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!window.SpeechRecognition) {
            alert('このブラウザはWeb Speech APIをサポートしていません');
            console.error('このブラウザはWeb Speech APIをサポートしていません');
            return;
        }

        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'ja-JP';  // 日本語を設定
        this.recognition.continuous = true;  // 継続的に音声を認識する
        this.recognition.interimResults = true;  // 中間結果を取得

        this.isRecording = false;  // 音声認識が録音中かどうかを管理
        this.fullTranscript = '';  // 全体の文字起こしを保存する変数

        this.textarea = textarea;  // 音声入力する内容を出力する先
        this.controller = controller;

        // 認識された結果を累積して表示
        this.recognition.onresult = (event) => {
            let interimTranscript = '';  // 中間結果を保存する変数
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    // 最終結果をfullTranscriptに追加
                    this.fullTranscript += event.results[i][0].transcript;
                } else {
                    // 中間結果をinterimTranscriptに追加
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            // 最終結果と中間結果を合成して表示
            this.textarea.value = this.fullTranscript + interimTranscript;
            this.controller.analysis(); // 解析を呼び出す
        };
        
        // エラーハンドリング
        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.textarea.innerHTML = 'エラーが発生しました: ' + event.error;
            this.isRecording = false;
            this.textarea.disabled = false;  // エラー発生時にテキストエリアを再び有効にする
        };
    }

    start() {
        if (!this.isRecording) {
            this.reset(); // テキストエリアをリセット
            this.recognition.start();
            this.isRecording = true;
            this.textarea.innerHTML = '認識中...';
            this.textarea.disabled = true;  // テキストエリアを無効にする
        }
    }

    stop() {
        if (this.isRecording) {
            this.recognition.stop();
            this.isRecording = false;
            this.textarea.disabled = false;  // テキストエリアを再び有効にする
        }
    }

    reset() {
        this.fullTranscript = '';
        this.textarea.innerHTML = '';  // テキストエリアをクリア
    }

    action() {
        if (this.isRecording) {
            this.stop();
        } else {
            this.start();
        }
    }
}