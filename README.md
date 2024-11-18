# webpro_06 プログラムドキュメント

このリポジトリには、`app5.js` を使用したWebアプリケーションが含まれています。このプログラムは、ユーザーに対して「じゃんけん」や「サイコロ」「占い」などの簡単なゲーム機能を提供します。

## ファイル一覧

| ファイル名              | 説明                               |
|-------------------------|------------------------------------|
| `app5.js`               | プログラム本体                     |
| `public/janken.html`    | じゃんけんの開始画面               |
| `views/dice-form.ejs`   | サイコロの面数入力画面             |
| `views/dice.ejs`        | サイコロの結果表示画面             |
| `views/fortune-form.ejs`| 占いの名前入力画面                |
| `views/fortune.ejs`     | 占い結果表示画面                  |
| `views/error.ejs`       | エラーページ                       |

## 起動方法

1. **必要なソフトウェアをインストール**
   プロジェクトを実行するためには、Node.jsが必要です。公式サイトから最新の安定版をインストールしてください。

2. **依存関係のインストール**
   プロジェクトディレクトリで以下のコマンドを実行し、必要なパッケージをインストールします。

   ```bash
   npm install express ejs
   ```
3. **サーバーの起動**
   次に、以下のコマンドでサーバーを起動します。

   ```bash
   node app5.js
   ```
   
   サーバーが正常に起動すると、以下のメッセージが表示されます。

   ```bash
   Example app listening on port 8080!
   ```

4. **ブラウザでのアクセス** 
   ブラウザを開き、以下のURLにアクセスします。

   ```bash
   http://localhost:8080
   ```

## コンパイル方法

1. **webpro_06を開きます**
   コードは以下の通りにします。

   ```bash
   cd webpro_06
   ```

2. **コードをpushします**

   コードは以下の通りにします。これによりgithubのコードが書き換えられる。なお、コメントは変更理由や変更内容を書くためにあるので、決してコメントのまま入力・実行しないこと。

   ```bash
   $ git add .
   $ git commit -am 'コメント'
   $ git push
   ``` 
4. **それぞれの遊びのurlに飛びます**

   じゃんけんのurl
   ```bash
   http://localhost:8080/janken
   ```

   サイコロのurl
   ```bash
   http://localhost:8080/dice?sides=6
   ```

   占いのurl
   ```bash
   http://localhost:8080/fortune?name=あなたの名前
   ```
## フローチャート

1. **じゃんけん**
 
```mermaid
flowchart TD;
    start["開始"] --> choose["手を選択"];
    choose --> compare{"勝敗の判定"};
    compare -->|勝ち| win["勝利"];
    compare -->|負け| lose["敗北"];
    compare -->|引き分け| draw["引き分け"];
    win --> end1["終了"];
    lose --> end1;
    draw --> end1;
 ```

2. **サイコロ**
   
```mermaid
 flowchart TD;
    start["開始"] --> input["目数を入力"];
    input --> roll["ランダムな目を生成"];
    roll --> display["結果を表示"];
    display --> end1["終了"];
 ```
3. **占い**

```mermaid
flowchart TD;
    start["開始"] --> input["名前を入力"];
    input --> calculate["運勢を計算"];
    calculate --> display["結果を表示"];
    display --> end1["終了"];
 ```   

