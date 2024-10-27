class WordHistory {
    constructor(div1, div2) {
        this.div1 = div1; // 単語を表示する要素
        this.div2 = div2; // 意味を表示する要素
        this.history = new Map();
        this.ITWordhistory = new Map();
    }

    search(word) {
        return fetch(`http://localhost:8080/meaning?word=${encodeURIComponent(word)}`)
            .then(response => response.json())
            .then(data => data.error ? 'error' : data.meaning)
            .catch(error => {
                console.error('エラー:', error);
                return 'error';
            });
    }

    async setHistory(wordArray) {
        for (const word of wordArray) {
            if (!this.history.has(word)) {
                const meaning = await this.search(word);
                this.history.set(word, meaning);
                if (meaning!=='説明が見つかりませんでした。'&&meaning!=='error') {                    
                    await this.setITWordhistory(word); // ITWordhistoryの更新を追加
                }
            }
        }
        this.historyView(); // 全ての単語の処理後に一度だけ呼び出す
    }

    setITWordhistory(word) {
        console.log(word);
        return sendQuery(word)
            .then(meaning => {
                if (meaning !== 'error') {
                    this.ITWordhistory.set(word, meaning.choices[0].message.content);
                }
            })
            .catch(error => {
                console.error('エラー:', error);
            });
    }

    historyView() {
        console.log(this.history);
        this.div1.innerHTML = '';
        this.div2.innerHTML = '';

        this.history.forEach((meaning, word) => {
            if (meaning !== 'error' && meaning !== '説明が見つかりませんでした。') {
                const wordElement = document.createElement('div');
                wordElement.textContent = word;
                this.div1.appendChild(wordElement);

                const meaningElement = document.createElement('div');
                meaningElement.textContent = meaning;
                meaningElement.style.height = 'auto';
                this.div2.appendChild(meaningElement);
                requestAnimationFrame(() => {
                    wordElement.style.height = `${meaningElement.offsetHeight}px`;
                });
            }
        });
    }

    getITWordHistory(){
        return this.ITWordhistory;
    }
}
/* Map(6) {'オンプレミス' => {…}, '環境' => {…}, 'スケーラビリティ' => {…}, 'セキュリティ' => {…}, 'データ' => {…}, …}
[[Entries]]
0
: 
{"オンプレミス" => Object}
key
: 
"オンプレミス"
value
: 
choices
: 
Array(1)
0
: 
finish_reason
: 
"stop"
index
: 
0
logprobs
: 
null
message
: 
{role: 'assistant', content: '自社内で操作', refusal: null} */