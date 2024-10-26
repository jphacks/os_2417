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
  
      // トークナイザーを一度ビルドして再利用
      kuromoji.builder({ dicPath: this.DICT_PATH }).build((_err, tokenizer) => {
        if (_err) {
          console.error("トークナイザーのビルドに失敗しました。", _err);
          return;
        }
        this.tokenizer = tokenizer;
      });
      this.nounHistory = []; // 名詞のみ入れる
    }
  
    analysisNoun(fullTranscript) {
      console.log('解析開始');
      const returnData = [];
      if (this.tokenizer) {
        const tokens = this.tokenizer.tokenize(fullTranscript);
        tokens.forEach((token) => {
          if (token.pos === '名詞') {
            returnData.push(token.surface_form);
          }
        });
      }
      return returnData;
    }
  
    analysisView(analysis, fullTranscript, callback) {
      if (this.isProcessing) {
        callback && callback(); // コールバックを実行して再呼び出しを知らせる
        return;
      }
      this.isProcessing = true;
  
      if (this.tokenizer) {
        const tokens = this.tokenizer.tokenize(fullTranscript);
  
        // 一度メモリ上でスパン要素を構築してからDOMに反映
        const fragment = document.createDocumentFragment();
        tokens.forEach((token) => {
          const pos = token.pos;
          const color = this.POS_COLORS[pos] || this.POS_COLORS["その他"];
  
          // Check if the token is a noun and not already in nounHistory
          if (pos === '名詞' && !this.nounHistory.includes(token.surface_form)) {
            this.nounHistory.push(token.surface_form); // Add to nounHistory
          }
  
          // Create a span element for each word with the assigned color
          const wordSpan = document.createElement('span');
          wordSpan.textContent = token.surface_form;
          wordSpan.style.color = color;
          fragment.appendChild(wordSpan);
        });
  
        analysis.innerHTML = '';
        analysis.appendChild(fragment); // DOM操作を一括で行う
  
        this.isProcessing = false;
        callback && callback(); // コールバックで再呼び出しを通知
      } else {
        console.error("トークナイザーがビルドされていません");
        this.isProcessing = false;
      }
    }
  }
  