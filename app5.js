const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.send("Welcome to the game!");
});

// サイコロを振るフォーム
app.get("/dice-form", (req, res) => {
  res.render('dice-form');
});

// サイコロの結果を表示
app.get("/dice", (req, res) => {
  let sides = Number(req.query.sides);
  if (isNaN(sides) || sides < 2) {
    res.render('error', { message: '無効な面数です。2以上の整数を入力してください。' });
    return;
  }

  const diceRoll = Math.floor(Math.random() * sides) + 1;
  res.render('dice', { sides: sides, result: diceRoll });
});

// 占いフォーム
app.get("/fortune-form", (req, res) => {
  res.render('fortune-form');
});

// 占いの結果を表示
app.get("/fortune", (req, res) => {
  const name = req.query.name;
  if (!name) {
    res.render('error', { message: '名前を入力してください。' });
    return;
  }

  const fortunes = ['大吉', '中吉', '小吉', '吉', '凶'];
  const result = fortunes[Math.floor(Math.random() * fortunes.length)];

  res.render('fortune', { name: name, result: result });
});

// エラーページ
app.get("/error", (req, res) => {
  res.render('error', { message: '無効なリクエストです。' });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
