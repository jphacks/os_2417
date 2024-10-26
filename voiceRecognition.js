class SpeechRecognitionHandler {
    constructor(transcriptionElement, startButton, stopButton) {
      this.transcriptionElement = transcriptionElement;  // 音声認識結果を表示する要素
      this.startButton = startButton;  // 音声認識開始ボタン
      this.stopButton = stopButton;  // 音声認識停止ボタン
      this.isRecording = false;  // 録音中かどうかのフラグ
      this.fullTranscript = '';  // 全体の文字起こしを保存
  
      // Web Speech APIのサポート確認
      window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!window.SpeechRecognition) {
        alert('このブラウザはWeb Speech APIをサポートしていません');
        console.error('このブラウザはWeb Speech APIをサポートしていません');
        return;
      }
  
      // SpeechRecognitionの設定
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'ja-JP';  // 日本語を設定
      this.recognition.continuous = true;  // 継続的に音声を認識する
      this.recognition.interimResults = true;  // 中間結果を取得
  
      // ボタンにイベントリスナーを追加
      this.startButton.addEventListener('click', () => this.start());
      this.stopButton.addEventListener('click', () => this.stop());
  
      // 音声認識結果処理
      this.recognition.onresult = (event) => this.onResult(event);
  
      // 音声認識が停止されたときの処理
      this.recognition.onend = () => this.onEnd();
  
      // エラーハンドリング
      this.recognition.onerror = (event) => this.onError(event);
    }
  
    // 音声認識開始
    start() {
      if (!this.isRecording) {
        this.recognition.start();
        this.isRecording = true;
        this.startButton.disabled = true;
        this.stopButton.disabled = false;
      }
    }
  
    // 音声認識停止
    stop() {
      if (this.isRecording) {
        this.recognition.stop();
        this.isRecording = false;
        this.startButton.disabled = false;
        this.stopButton.disabled = true;
      }
    }
  
    // 認識結果の処理
    onResult(event) {
      let interimTranscript = '';  // 中間結果を保存する変数
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          this.fullTranscript += event.results[i][0].transcript;  // 最終結果を累積
        } else {
          interimTranscript += event.results[i][0].transcript;  // 中間結果を更新
        }
      }
      this.transcriptionElement.innerHTML = this.fullTranscript + '<br><i>' + interimTranscript + '</i>';
    }
  
    // 音声認識が手動で停止されていない場合、再開
    onEnd() {
      if (this.isRecording) {
        this.recognition.start();
      }
    }
  
    // エラーハンドリング
    onError(event) {
      console.error('Speech recognition error:', event.error);
      this.transcriptionElement.innerHTML = 'エラーが発生しました: ' + event.error;
      this.isRecording = false;
      this.startButton.disabled = false;
      this.stopButton.disabled = true;
    }
  }
  
  // 使用例
  const transcriptionElement = document.getElementById('transcription');
  const startButton = document.getElementById('startBtn');
  const stopButton = document.getElementById('stopBtn');
  const speechRecognitionHandler = new SpeechRecognitionHandler(transcriptionElement, startButton, stopButton);
  