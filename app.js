const textarea = document.getElementById('input');
const p = document.getElementById('output');
const i = document.getElementById('microphone');

//kuromoji.js
const controler = new Controler(textarea,p);

textarea.addEventListener('input',()=>{
  controler.analysis();
})

//音声認識
const speechRecognitionHandler = new SpeechRecognitionHandler(textarea, controler);
i.addEventListener('click', () => {
    speechRecognitionHandler.action(); // 音声認識の開始または停止を切り替える
});

//履歴
const history = document.getElementById('history');
const historydec = document.getElementById('historydec')

const wordHistory = new WordHistory(history,historydec);

const updatehistory = () => {
  console.log(textarea.value);
  wordHistory.setHistory(controler.getKuromojiAnalyzer().analysisNoun(textarea.value))
  wordHistory.historyView()
}