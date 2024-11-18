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
```mermaid
 flowchart TD;
    start["開始"] --> input["目数を入力"];
    input --> roll["ランダムな目を生成"];
    roll --> display["結果を表示"];
    display --> end1["終了"];
 ```

```mermaid
flowchart TD;
    start["開始"] --> input["名前を入力"];
    input --> calculate["運勢を計算"];
    calculate --> display["結果を表示"];
    display --> end1["終了"];
 ```   

