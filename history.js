class WordHistory {
    constructor(div1, div2) {
        this.div1 = div1; // 単語を表示する要素
        this.div2 = div2; // 意味を表示する要素
        this.history = new Map();
    }

    search(word) {
        return fetch(`http://localhost:8080/meaning?word=${encodeURIComponent(word)}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    return 'error'; // エラーがある場合、"error"を返す
                } else {
                    return data.meaning; // 意味が取得できた場合、それを返す
                }
            })
            .catch(error => {
                console.error('エラー:', error);
                return 'error'; // 通信エラーの場合も "error" を返す
            });
    }

    async setHistory(wordArray) {
        for (const word of wordArray) {
            if (!this.history.has(word)) {
                const meaning = await this.search(word); // 意味の取得を待機
                this.history.set(word, meaning); // 取得した意味を history に保存
            }
        }
    }

    historyView() {
        // 'error'のエントリを除いて表示する
        console.log(this.history)
        this.div1.innerHTML = ''; // 以前の内容をクリア
        this.div2.innerHTML = ''; // 以前の内容をクリア

        this.history.forEach((meaning, word) => {
            if (meaning !== 'error'&&meaning !== '説明が見つかりませんでした。') { // 'error'を除外
                const wordElement = document.createElement('div');
                wordElement.textContent = word;
                this.div1.appendChild(wordElement);

                const meaningElement = document.createElement('div');
                meaningElement.textContent = meaning;
                this.div2.appendChild(meaningElement);
            }
        });
    }
}
