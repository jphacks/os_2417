class SpeechRecognitionHandler {
    constructor(lang = 'ja-JP',textarea) {
      // Web Speech API のサポート確認
      window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!window.SpeechRecognition) {
        alert('このブラウザはWeb Speech APIをサポートしていません');
        console.error('このブラウザはWeb Speech APIをサポートしていません');
        return;
      }
  
      this.recognition = new SpeechRecognition();
      this.recognition.lang = lang;
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      
      this.isRecording = false;
      this.fullTranscript = '';
  
      // イベントハンドラのバインド
      this.recognition.onresult = this.handleResult.bind(this);
      this.recognition.onend = this.handleEnd.bind(this);
      this.recognition.onerror = this.handleError.bind(this);

      //
      this.textarea = textarea;
    }
  
    // 音声認識を開始する
    start() {
      if (!this.isRecording) {
        this.recognition.start();
        this.isRecording = true;
        this.updateButtonState();
      }
    }
  
    // 音声認識を停止する
    stop() {
      if (this.isRecording) {
        this.recognition.stop();
        this.isRecording = false;
        this.updateButtonState();
      }
    }
  
    // 結果の処理
    handleResult(event) {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          this.fullTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      this.textarea.innerHTML = this.fullTranscript + interimTranscript;
    }
  
    // 音声認識が停止された場合の処理
    handleEnd() {
      if (this.isRecording) {
        this.recognition.start();  // 手動で停止しない限り再開
      }
    }
  
    // エラーハンドリング
    handleError(event) {
      console.error('Speech recognition error:', event.error);
      transcription.innerHTML = 'エラーが発生しました: ' + event.error;
      this.isRecording = false;
      this.updateButtonState();
    }
  
    // ボタンの状態を更新する
    updateButtonState() {
      startBtn.disabled = this.isRecording;
      stopBtn.disabled = !this.isRecording;
    }
  
    // テキストをリセットする
    resetTranscript() {
      this.fullTranscript = '';
      textarea.innerHTML = '';
    }
  }
  
  // ボタンにイベントリスナーを設定
//   startBtn.addEventListener('click', () => {
//     if (!speechHandler) {
//       window.speechHandler = new SpeechRecognitionHandler();
//     }
//     speechHandler.start();
//   });
  
//   stopBtn.addEventListener('click', () => {
//     if (speechHandler) {
//       speechHandler.stop();
//     }
//   });
  