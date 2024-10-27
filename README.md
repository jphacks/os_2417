# ユーズミー

![アイコン_ユーズミー](https://github.com/user-attachments/assets/d7672f6b-42c2-4ec6-99d6-61822f6c5220)



## 製品概要
### 背景(製品開発のきっかけ、課題等）
知らないIT用語を一々検索するのは面倒くさい！説明するのも面倒くさい！そんなお悩みを持つあなたのための！「ユーズミー」です！
 
### 製品説明（具体的な製品の説明）
IT用語を含む文を入力すると、IT用語を含めない文に変換します。
### 特長
#### 1. 特長1　
IT用語をIT用語を使わない言葉に置き換えます。
#### 2. 特長2　
キーボードと音声の両方で入力できます。
#### 3. 特長3　
過去に入力されたIT用語とその意味を履歴で確認できます。

 ### 解決出来ること
*  IT用語の解説が必要なくなります
*  エンジニアとクライアントが直接話すため、要求に沿いやすくなります
*  エンジニアとクライアントの間の齟齬が生じなくなります
*  何も知らない文系がハッカソンに迷い込んだ時、「ユーズミー」を使えば安心安全。チームメンバーの会話にもしっかりとついていけます

 ### 今後の展望
*  言語処理に少し時間がかかっているので、軽量化を行う
*  AIの出力結果にムラがあるので、命令等の調整を行う
*  辞書へのIT用語の追加
*  要約部分の精査
 ### 注力したこと（こだわり等）
*  生成系AIから望む言葉を取り出すのが難しかった。
*  文章の中から名詞のみ抽出→IT用語のみ抽出しそれを簡略化してAIに要約させるという構造を考えるのに苦労した。
*  初心者が半分いるチームにも関わらず満足するアプリケーションを完成させることができた

## 開発技術
### 活用した技術
#### API・データ
* openai
* https://e-words.jp/
* Web Speech API
* kuromoji

#### フレームワーク・ライブラリ・モジュール
* kuromoji.js
* flask

#### デバイス
* PC

### 独自技術
#### ハッカソンで開発した独自機能・技術
* ウェブサイトに入力したIT用語を含んだ文章を非IT職の方にも伝わる言葉に翻訳する機能
* 翻訳したIT用語の説明をWebサイトの下部に表示する機能

* IT用語を含んだ会話を音声認識し、リアルタイムでITエンジニア以外の方にも伝わるように翻訳する機能

<!-- * 独自で開発したものの内容をこちらに記載してください
* 特に力を入れた部分をファイルリンク、またはcommit_idを記載してください。 -->