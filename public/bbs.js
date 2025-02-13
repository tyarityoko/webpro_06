"use strict";

let number = 0;
const bbs = document.querySelector('#bbs');

document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {
        method: "POST",
        body:  'name='+name+'&message='+message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log(params);
    const url = "/post";
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then((response) => {
            console.log(response);
            document.querySelector('#message').value = "";
        });
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {
        method: "POST",
        body: '',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    const url = "/check";
    fetch(url, params)
        .then((response) => {
            if (!response.ok) throw new Error('Error');
            return response.json();
        })
        .then((response) => {
            if (number != response.number) {
                fetch('/read', {
                    method: "POST",
                    body: `start=${number}`,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                    .then((res) => res.json())
                    .then((res) => {
                        number += res.messages.length;
                        for (let mes of res.messages) {
                            let cover = document.createElement('div');
                            cover.className = 'cover';

                            let name_area = document.createElement('span');
                            name_area.className = 'name';
                            name_area.innerText = mes.name;

                            let mes_area = document.createElement('span');
                            mes_area.className = 'mes';
                            mes_area.innerText = mes.message;

                            // いいねボタン
                            let like_btn = document.createElement('button');
                            like_btn.innerText = `👍 (${mes.likes || 0})`;
                            like_btn.addEventListener('click', () => {
                                fetch(`/bbs/${mes.id}/like`, {
                                    method: "POST",
                                    headers: { 'Content-Type': 'application/json' },
                                })
                                    .then((res) => res.json())
                                    .then((res) => {
                                        like_btn.innerText = `👍 (${res.likes})`; 
                                    })
                                    .catch(console.error);
                            });

                            // コメントフォーム
                            let comment_area = document.createElement('div');
                            let comment_input = document.createElement('input');
                            comment_input.placeholder = 'コメントを追加';
                            let comment_btn = document.createElement('button');
                            comment_btn.innerText = '送信';

                            comment_btn.addEventListener('click', () => {
                                fetch(`/bbs/${mes.id}/comment`, {
                                    method: 'POST',
                                    body: JSON.stringify({ comment: comment_input.value }),
                                    headers: { 'Content-Type': 'application/json' }
                                })
                                    .then((res) => res.json())
                                    .then((res) => {
                                        let new_comment = document.createElement('div');
                                        new_comment.innerText = res.comments[res.comments.length - 1];
                                        comment_area.appendChild(new_comment);
                                        comment_input.value = ''; 
                                    })
                                    .catch(console.error);
                            });

                            // 投稿編集ボタン
                            let edit_btn = document.createElement('button');
                            edit_btn.innerText = '編集';
                            edit_btn.addEventListener('click', () => {
                                let edit_area = document.createElement('input');
                                edit_area.value = mes.message; 
                                let save_btn = document.createElement('button');
                                save_btn.innerText = '保存';

                                save_btn.addEventListener('click', () => {
                                    fetch(`/bbs/${mes.id}`, {
                                        method: 'PUT',
                                        body: JSON.stringify({ message: edit_area.value }),
                                        headers: { 'Content-Type': 'application/json' }
                                    })
                                        .then((res) => res.json())
                                        .then((res) => {
                                            mes_area.innerText = res.message;
                                            cover.removeChild(edit_area);
                                            cover.removeChild(save_btn);
                                        })
                                        .catch(console.error);
                                });

                                cover.appendChild(edit_area);
                                cover.appendChild(save_btn);
                            });

                            // 追加する要素を順番に組み立て
                            cover.appendChild(name_area);
                            cover.appendChild(mes_area);
                            cover.appendChild(like_btn);
                            cover.appendChild(comment_area);
                            comment_area.appendChild(comment_input);
                            comment_area.appendChild(comment_btn);
                            cover.appendChild(edit_btn);

                            bbs.appendChild(cover);
                        }
                    });
            }
        });
});
