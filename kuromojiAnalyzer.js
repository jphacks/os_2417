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
    }
  
    analysisNoun(fullTranscript) {
      console.log('解析開始');
      let returnData = [];
      kuromoji.builder({ dicPath: this.DICT_PATH }).build((_err, tokenizer) => {
        const tokens = tokenizer.tokenize(fullTranscript);
        tokens.forEach((token) => {
          const surface = token.surface_form;
          const pos = token.pos;
          if (pos === '名詞') {
            returnData.push(surface);
          }
        });
      });
      return returnData;
    }
    analysisView(analysis) {
        console.log('解析');
        analysis.innerHTML = '';
        kuromoji.builder({ dicPath: analyzer.DICT_PATH }).build((_err, tokenizer) => {
          const tokens = tokenizer.tokenize(fullTranscript);
          tokens.forEach((token) => {
            const surface = token.surface_form;
            const pos = token.pos;
            const color = analyzer.POS_COLORS[pos] || analyzer.POS_COLORS["その他"];
            const wordSpan = document.createElement('span');
            wordSpan.textContent = surface;
            wordSpan.style.color = color;
            analysis.appendChild(wordSpan);
          });
        });
    }
  }
  