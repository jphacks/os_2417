// Web Speech APIのサポート確認
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!window.SpeechRecognition) {
  alert('このブラウザはWeb Speech APIをサポートしていません');
  console.error('このブラウザはWeb Speech APIをサポートしていません')
}


const recognition = new SpeechRecognition();
recognition.lang = 'ja-JP';  // 日本語を設定
recognition.continuous = true;  // 継続的に音声を認識する
recognition.interimResults = true;  // 中間結果を取得

const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const testBtn = document.getElementById('mojikaiseki');

const transcription = document.getElementById('transcription');
const analysis = document.getElementById('analysis');

let isRecording = false;
let fullTranscript = '';  // 全体の文字起こしを保存する変数

// 音声認識開始
startBtn.addEventListener('click', () => {
  if (!isRecording) {
    recognition.start();
    isRecording = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    transcription.innerHTML = '認識中...';
  }
});

// 音声認識停止
stopBtn.addEventListener('click', () => {
  if (isRecording) {
    recognition.stop();
    isRecording = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
});

// 認識された結果を累積して表示
recognition.onresult = (event) => {
  let interimTranscript = '';  // 中間結果を保存する変数
  for (let i = event.resultIndex; i < event.results.length; i++) {
    if (event.results[i].isFinal) {
      // 最終結果をfullTranscriptに追加
      fullTranscript += event.results[i][0].transcript;
    } else {
      // 中間結果をinterimTranscriptに追加
      interimTranscript += event.results[i][0].transcript;
    }
  }
  // 最終結果と中間結果を合成して表示
  transcription.innerHTML = fullTranscript + '<br><i>' + interimTranscript + '</i>';
};

// 音声認識が停止された場合
recognition.onend = () => {
  if (isRecording) {
    recognition.start();  // 手動で停止しない限り、認識が終了すると再開
  }
};

// エラーハンドリング
recognition.onerror = (event) => {
  console.error('Speech recognition error:', event.error);
  transcription.innerHTML = 'エラーが発生しました: ' + event.error;
  isRecording = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

//kuromoji.js
const analyzer = new KuromojiAnalyzer();
testBtn.addEventListener('click', () => {
  analyzer.analysisView(analysis);
  console.log(analyzer.analysisNoun(fullTranscript));
});
