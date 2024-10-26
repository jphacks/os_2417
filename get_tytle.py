def pullMeaning(word):
    import requests
    from bs4 import BeautifulSoup
    import urllib3

    # SSL証明書の警告を無視（注意：セキュリティリスクがあります）
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

    url = f"https://e-words.jp/w/{word}.html"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }

    # verify=Falseを追加してSSL証明書の検証をスキップ
    response = requests.get(url, headers=headers, verify=False)

    # BeautifulSoupを使ってHTMLを解析
    soup = BeautifulSoup(response.content, 'html.parser')

    # metaタグのdescriptionを抽出
    meta_description = soup.find('meta', attrs={'name': 'description'})

    if meta_description:
        print("Meta Description:", meta_description.get('content'))
    else:
        print("Meta Descriptionが見つかりませんでした。HTML構造を確認してください。")