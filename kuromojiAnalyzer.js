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

  analysisView(analysis, fullTranscript, ITWordMap, callback) {
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

            // ITWordMapによる置き換え
            let surfaceForm = token.surface_form
            if (ITWordMap.has(surfaceForm)) {
              surfaceForm = ITWordMap.get(surfaceForm);
            }

            const wordSpan = document.createElement('span');
            wordSpan.textContent = surfaceForm; // 置き換えた単語を設定
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