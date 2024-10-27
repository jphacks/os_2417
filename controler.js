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
  