"use strict";

const express = require("express");
const app = express();

let bbs = []; // メモリ内の投稿データ

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// --- 既存のコード省略 ---

// 投稿削除機能
app.post("/delete", (req, res) => {
    const id = Number(req.body.id);
    bbs = bbs.filter((post, index) => index !== id);
    res.json({ success: true, number: bbs.length });
});

// 投稿編集機能
app.post("/edit", (req, res) => {
    const id = Number(req.body.id);
    const name = req.body.name;
    const message = req.body.message;
    if (bbs[id]) {
        bbs[id] = { name, message };
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// 投稿全削除機能
app.post("/clear", (req, res) => {
    bbs = [];
    res.json({ success: true });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
