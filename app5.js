

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number(req.query.win);
  let total = Number(req.query.total);
  console.log({ hand, win, total });

  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = '';
  if (num == 1) cpu = 'グー'; // Rock
  else if (num == 2) cpu = 'チョキ'; // Scissors
  else cpu = 'パー'; // Paper

  // 勝敗の判定
  let judgement = '';
  if (hand === 'グー') {
    if (cpu === 'グー') judgement = '引き分け'; // Draw
    else if (cpu === 'チョキ') {
      judgement = '勝ち'; // Win
      win += 1;
    } else {
      judgement = '負け'; // Lose
    }
  } else if (hand === 'チョキ') {
    if (cpu === 'グー') {
      judgement = '負け'; // Lose
    } else if (cpu === 'チョキ') {
      judgement = '引き分け'; // Draw
    } else {
      judgement = '勝ち'; // Win
      win += 1;
    }
  } else if (hand === 'パー') {
    if (cpu === 'グー') {
      judgement = '勝ち'; // Win
      win += 1;
    } else if (cpu === 'チョキ') {
      judgement = '負け'; // Lose
    } else {
      judgement = '引き分け'; // Draw
    }
  } else {
    judgement = '無効な手です'; // Invalid hand
  }

  total += 1; // 総試合数を増やす

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };

  res.render('janken', display);
});
