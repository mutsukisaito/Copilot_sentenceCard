let currentData = [];
let currentSceneTitle = "";
let lastIndex = -1;
let correctCount = 0; // ← わかった数カウント

const sceneSelectDiv = document.getElementById('sceneSelect');
const contentDiv = document.getElementById('content');
const buttonArea = document.getElementById('buttonArea');
const knowButton = document.getElementById('knowButton');
const nextButton = document.getElementById('nextButton');
const topButton = document.getElementById('topButton');
const sceneSelector = document.getElementById('sceneSelector');
const startButton = document.getElementById('startButton');
const scoreDiv = document.getElementById('score'); // スコア表示用
const newSentence = document.getElementById('newSentence');
const submitButton = document.getElementById('submitButton');

// 簡易翻訳関数（実際のプロジェクトでは外部APIを使用することを推奨）
function translate(text) {
  // ここでは簡単な例として、日本語の後ろに各言語の識別子を付けた形で返します
  return {
    en: text + " (in English)",
    cn: text + " (in Chinese)|Pinyin",
    kr: text + " (in Korean)|발음",
    es: text + " (in Spanish)|プロヌンシアシオン"
  };
}

// 送信ボタンのイベントリスナー
submitButton.addEventListener('click', () => {
  const text = newSentence.value.trim();
  if (!text) {
    alert('文章を入力してください');
    return;
  }

  // 翻訳を実行
  const translations = translate(text);
  
  // カスタムデータに追加
  const newData = {
    jp: text,
    en: translations.en,
    cn: translations.cn,
    kr: translations.kr,
    es: translations.es
  };
  customData.push(newData);
  
  // 入力欄をクリア
  newSentence.value = '';
  
  // 追加したデータの形式を表示
  alert(`以下の形式で追加しました：
  {
    jp: "${text}",
    en: "${translations.en}",
    cn: "${translations.cn}",
    kr: "${translations.kr}",
    es: "${translations.es}"
  }`);
});

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
  } else if (scene === 'custom') {
    currentData = customData;
    currentSceneTitle = "📝 自由入力";
  }
  lastIndex = -1;
  correctCount = 0;
  updateScore();
  sceneSelectDiv.classList.add('hidden');
  contentDiv.classList.remove('hidden');
  buttonArea.classList.remove('hidden');
  updateScore();
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

// わかったボタン
knowButton.addEventListener('click', () => {
  correctCount++;
  updateScore();
  renderRandomContent();
});

// 次へボタン
nextButton.addEventListener('click', () => {
  renderRandomContent();
});

// トップボタン
topButton.addEventListener('click', () => {
  currentData = [];
  currentSceneTitle = "";
  lastIndex = -1;
  correctCount = 0;
  contentDiv.classList.add('hidden');
  buttonArea.classList.add('hidden');
  sceneSelectDiv.classList.remove('hidden');
  sceneSelector.value = "";
  contentDiv.innerHTML = '';
});

// スコア更新
function updateScore() {
  scoreDiv.textContent = `わかった数: ${correctCount}`;
}
