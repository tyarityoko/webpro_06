"use strict";

let number = 0;
const bbs = document.querySelector('#bbs');

// --- 既存のコード省略 ---

// 投稿削除機能
document.querySelector('#delete').addEventListener('click', () => {
    const id = Number(prompt("削除する投稿のIDを入力してください:"));
    const params = {
        method: "POST",
        body: `id=${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    fetch("/delete", params)
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                alert("削除しました！");
                location.reload();
            } else {
                alert("削除に失敗しました。");
            }
        });
});

// 投稿編集機能
document.querySelector('#edit').addEventListener('click', () => {
    const id = Number(prompt("編集する投稿のIDを入力してください:"));
    const name = prompt("新しい名前を入力してください:");
    const message = prompt("新しいメッセージを入力してください:");
    const params = {
        method: "POST",
        body: `id=${id}&name=${name}&message=${message}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    fetch("/edit", params)
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                alert("編集しました！");
                location.reload();
            } else {
                alert("編集に失敗しました。");
            }
        });
});

// 投稿全削除機能
document.querySelector('#clear').addEventListener('click', () => {
    const confirmClear = confirm("全ての投稿を削除しますか？");
    if (!confirmClear) return;

    const params = {
        method: "POST",
        body: '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    fetch("/clear", params)
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                alert("全ての投稿を削除しました！");
                location.reload();
            }
        });
});

