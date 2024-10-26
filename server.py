from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import urllib3

app = Flask(__name__)
CORS(app)  # JavaScriptからアクセスするためCORSを有効に

def pullMeaning(word):
    # SSL証明書の警告を無視
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

    url = f"https://e-words.jp/w/{word}.html"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }

    # verify=FalseでSSL証明書の検証をスキップ
    response = requests.get(url, headers=headers, verify=False)
    soup = BeautifulSoup(response.content, 'html.parser')

    # metaタグのdescriptionを抽出
    meta_description = soup.find('meta', attrs={'name': 'description'})
    if meta_description:
        return meta_description.get('content')
    else:
        return "説明が見つかりませんでした。"

@app.route('/meaning', methods=['GET'])
def get_meaning():
    word = request.args.get('word', '')
    if not word:
        return jsonify({"error": "単語が指定されていません"}), 400

    meaning = pullMeaning(word)
    return jsonify({"word": word, "meaning": meaning})

if __name__ == '__main__':
    app.run(host='localhost', port=8080)
