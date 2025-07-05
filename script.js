const parts = ["頭", "あご", "おなか", "背中", "手", "足", "おしり", "しっぽ"];
let danger = [];

const dangerMessages = ["シャーッ！！"];
const safeMessages = ["ゴロゴロ…"];

let maxRounds = 5;
let currentRound = 0;
let gameOver = false;
let tappedParts = new Set(); // ← 押された部位を記録

const reaction = document.getElementById('reaction');
const scratchImg = document.getElementById('scratch-img');
const resultsEl = document.getElementById('results');
const roundSelect = document.getElementById('round-select');

function pick() {
  danger = [];
  const count = Math.floor(Math.random() * 2) + 1;
  while (danger.length < count) {
    const p = parts[Math.floor(Math.random() * parts.length)];
    if (!danger.includes(p)) danger.push(p);
  }

  currentRound = 0;
  gameOver = false;
  tappedParts.clear(); // ← ラウンドの頭でリセット

  reaction.textContent = "なでて！";
  resultsEl.innerHTML = "";
  scratchImg.classList.add('hidden');

  // ボタン状態リセット
  document.querySelectorAll('.part-btn').forEach(btn => {
    btn.textContent = "";
    btn.disabled = false;
  });
}

document.querySelectorAll('.part-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (gameOver) return;

    const part = btn.dataset.part;
    if (tappedParts.has(part)) {
      reaction.textContent = `⚠️ 「${part}」はもうなでたよ！`;
      return;
    }

    tappedParts.add(part);
    btn.textContent = "✋🏻";
    btn.disabled = true;

    currentRound++;

    if (danger.includes(part)) {
      gameOver = true;

      scratchImg.classList.remove('hidden');
      setTimeout(() => {
        scratchImg.classList.add('hidden');
        reaction.textContent = `❌ シャーッ！！ 失敗！ゲーム終了`;
      }, 1000);

      resultsEl.innerHTML += `<div>${currentRound}回目： ❌ </div>`;
    } else {
      reaction.textContent = `⭕️ ゴロゴロ…`;
      resultsEl.innerHTML += `<div>${currentRound}回目： ⭕️ </div>`;

      if (currentRound >= maxRounds) {
        gameOver = true;
        reaction.textContent += " 〜クリア！〜";
      }
    }
  });
});

document.getElementById('next').addEventListener('click', () => {
  pick();
});

roundSelect.addEventListener('change', e => {
  maxRounds = Number(e.target.value);
  pick();
});

pick();