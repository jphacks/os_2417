const textarea = document.getElementById('input');
const p = document.getElementById('output');
const i = document.getElementById('microphone');

//履歴
const history = document.getElementById('history');
const historydec = document.getElementById('historydec')

//kuromoji.js
const controler = new Controler(textarea,p,history,historydec);

textarea.addEventListener('input',()=>{
  controler.analysis();
})

//音声認識
const speechRecognitionHandler = new SpeechRecognitionHandler(textarea, controler);
i.addEventListener('click', () => {
    speechRecognitionHandler.action(); // 音声認識の開始または停止を切り替える
});

const updateView = () => {
  console.log(controler.wordHistory.ITWordhistory);
}
// const updatehistory = () => {
//   console.log(textarea.value);
//   wordHistory.setHistory(controler.getKuromojiAnalyzer().analysisNoun(textarea.value))
//   wordHistory.historyView()
// }