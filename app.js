const textarea = document.getElementById('input');
const p = document.getElementById('output');

//kuromoji.js
const controler = new Controler(textarea,p);

textarea.addEventListener('input',()=>{
  controler.analysis();
})
