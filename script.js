let currentData = [];
let currentSceneTitle = "";
let lastIndex = -1;
let correctCount = 0; // ← わかった数カウント

const sceneSelectDiv = document.getElementById('sceneSelect');
const contentDiv = document.getElementById('content');
const nextButton = document.getElementById('nextButton');
const topButton = document.getElementById('topButton');
const knowButton = document.getElementById('knowButton'); // 追加
const buttonsDiv = document.getElementById('buttons');
const sceneSelector = document.getElementById('sceneSelector');
const startButton = document.getElementById('startButton');
const scoreDiv = document.getElementById('score'); // スコア表示用

// スタートボタン押したらシーン開始
startButton.addEventListener('click', () => {
  const selectedScene = sceneSelector.value;
  if (selectedScene) {
    startScene(selectedScene);
  } else {
    alert('シーンを選択してください');
  }
});

function startScene(scene) {
  if (scene === 'airport') {
    currentData = airportData;
    currentSceneTitle = "✈️ 空港";
  } else if (scene === 'hotel') {
    currentData = hotelData;
    currentSceneTitle = "🏨 ホテル";
  } else if (scene === 'restaurant') {
    currentData = restaurantData;
    currentSceneTitle = "🍽 レストラン";
  } else if (scene === 'daily') {
    currentData = dailyData;
    currentSceneTitle = "🗣️ 日常会話";
  }
  lastIndex = -1;
  correctCount = 0;
  updateScore();
  sceneSelectDiv.classList.add('hidden');
  contentDiv.classList.remove('hidden');
  buttonsDiv.classList.remove('hidden');
  scoreDiv.classList.remove('hidden');
  renderRandomContent();
}

function renderRandomContent() {
  if (currentData.length === 0) return;

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * currentData.length);
  } while (randomIndex === lastIndex && currentData.length > 1);

  lastIndex = randomIndex;
  const item = currentData[randomIndex];

  const [cnText, cnPinyin] = item.cn.split('|').map(str => str.trim());
  const [krText, krPronunciation] = item.kr.split('|').map(str => str.trim());
  const [esText, esPronunciation] = item.es.split('|').map(str => str.trim());

  contentDiv.innerHTML = `
    <h1 class="text-xl font-bold mb-2">${currentSceneTitle}</h1>
    <h2 class="text-2xl font-bold mb-4">${item.jp}</h2>
    <div class="text-left space-y-4">
      <div>
        <span class="text-2xl">🇺🇸</span> ${item.en}
      </div>
      <div>
        <span class="text-2xl">🇨🇳</span> ${cnText}<br>
        <span class="text-sm text-gray-600">${cnPinyin}</span>
      </div>
      <div>
        <span class="text-2xl">🇰🇷</span> ${krText}<br>
        <span class="text-sm text-gray-600">${krPronunciation}</span>
      </div>
      <div>
        <span class="text-2xl">🇪🇸</span> ${esText}<br>
        <span class="text-sm text-gray-600">${esPronunciation}</span>
      </div>
    </div>
  `;
}

function updateScore() {
  scoreDiv.textContent = `わかった数: ${correctCount}`;
}

nextButton.addEventListener('click', () => {
  renderRandomContent();
});

knowButton.addEventListener('click', () => {
  correctCount++;
  updateScore();
  renderRandomContent();
});

topButton.addEventListener('click', () => {
  currentData = [];
  currentSceneTitle = "";
  lastIndex = -1;
  correctCount = 0;
  contentDiv.classList.add('hidden');
  buttonsDiv.classList.add('hidden');
  scoreDiv.classList.add('hidden');
  sceneSelectDiv.classList.remove('hidden');
  sceneSelector.value = "";
  contentDiv.innerHTML = '';
});
