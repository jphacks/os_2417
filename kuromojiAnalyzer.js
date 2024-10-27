class KuromojiAnalyzer {
  constructor() {
      this.DICT_PATH = "./dict";
      this.POS_COLORS = {
          "名詞": "blue",
          "動詞": "green",
          "形容詞": "red",
          "副詞": "purple",
          "助詞": "orange",
          "助動詞": "pink",
          "記号": "gray",
          "その他": "black"
      };
      this.tokenizer = null;
      this.isProcessing = false;
      this.nounHistory = []; // 名詞のみ入れる

      kuromoji.builder({ dicPath: this.DICT_PATH }).build((_err, tokenizer) => {
          if (_err) {
              console.error("トークナイザーのビルドに失敗しました。", _err);
              return;
          }
          this.tokenizer = tokenizer;
      });
  }

  analysisNoun() {
      return this.nounHistory;
  }

  analysisView(analysis, fullTranscript, callback) {
      if (this.isProcessing) {
          callback && callback(); // コールバックを実行して再呼び出しを知らせる
          return;
      }
      this.isProcessing = true;

      if (this.tokenizer) {
          const tokens = this.tokenizer.tokenize(fullTranscript);

          const fragment = document.createDocumentFragment();
          tokens.forEach((token) => {
              const pos = token.pos;
              const color = this.POS_COLORS[pos] || this.POS_COLORS["その他"];

              if (pos === '名詞' && !this.nounHistory.includes(token.surface_form)) {
                  this.nounHistory.push(token.surface_form);
              }

              const wordSpan = document.createElement('span');
              wordSpan.textContent = token.surface_form;
              wordSpan.style.color = color;
              fragment.appendChild(wordSpan);
          });

          analysis.innerHTML = '';
          analysis.appendChild(fragment);

          this.isProcessing = false;
          callback && callback();
      } else {
          console.error("トークナイザーがビルドされていません");
          this.isProcessing = false;
      }
  }
}

class Controler {
  constructor(textarea, p, history, historydec) {
      this.textarea = textarea;
      this.p = p;
      this.update = false;
      this.historyUpdate = false; // history更新中のフラグ
      this.kuromojiAnalyzer = new KuromojiAnalyzer();
      this.wordHistory = new WordHistory(history, historydec);
  }

  setupdate() {
      this.update = true;
  }

  setHistoryUpdate() {
      this.historyUpdate = true;
  }

  analysis() {
      if (this.kuromojiAnalyzer.isProcessing) {
          this.setupdate();
          return;
      }
      this.kuromojiAnalyzer.analysisView(this.p, this.textarea.value, () => {
          if (this.update) {
              this.update = false;
              this.analysis();
          } else {
              this.updateHistory();
          }
      });
  }

  updateHistory() {
      if (this.historyUpdate) {
          return;
      }
      this.setHistoryUpdate();
      const nouns = this.kuromojiAnalyzer.analysisNoun();
      this.wordHistory.setHistory(nouns).then(() => {
          this.historyUpdate = false;
      });
  }

  getKuromojiAnalyzer() {
      return this.kuromojiAnalyzer;
  }
}
