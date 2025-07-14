// -------------------- Qeydiyyat / Giriş ----------------------
const authScreen = document.getElementById("authScreen");
const gameScreen = document.getElementById("gameScreen");
const usernameInput = document.getElementById("usernameInput");
const authError = document.getElementById("authError");

function loginUser() {
  const username = usernameInput.value.trim();
  if (username.length < 3) {
    authError.textContent = "Ad ən az 3 simvol olmalıdır.";
    return;
  }
  localStorage.setItem("username", username);
  authScreen.style.display = "none";
  gameScreen.style.display = "block";
  switchMode("solo");
}

// ------------------ Audio ------------------
const correctSound = new Audio('./true.mp3');
const wrongSound = new Audio('../public/basaramadik-abi-[AudioTrimmer.com] copy.mp3');

// ------------------ Başlanğıc Dəyərlər ------------------
let currentMode = 'solo';
let currentScore = 0;
let correctCountry = null;
let soundOn = true;

const flagImg = document.getElementById('flag');
const optionsDiv = document.getElementById('options');
const scoreSpan = document.getElementById('score');
const rankNameSpan = document.getElementById('rankName');
const scoreHistoryDiv = document.getElementById('scoreHistory');
const leaderboardOl = document.getElementById('leaderboard');
const btnSolo = document.getElementById('btnSolo');
const btnCompetitive = document.getElementById('btnCompetitive');
const soundToggleBtn = document.getElementById('soundToggle');

btnSolo.onclick = () => switchMode('solo');
btnCompetitive.onclick = () => switchMode('competitive');
soundToggleBtn.onclick = () => {
  soundOn = !soundOn;
  soundToggleBtn.textContent = `Səs: ${soundOn ? 'Aktiv' : 'Deaktiv'}`;
  soundToggleBtn.classList.toggle('off', !soundOn);
};

// ------------------ Rütbə Sistemi ------------------
const ranks = [
  { name: "Yeni Başlayan", minScore: 0 },
  { name: "Bayraq Yığan", minScore: 10 },
  { name: "Bayraq Bilgini", minScore: 250 },
  { name: "Bayraq Ustası", minScore: 400 },
  { name: "Bayraq Şahini", minScore: 600 },
  { name: "Bayraq Qalibi", minScore: 750 }
];

function getRank(score) {
  let rank = ranks[0].name;
  for (let i = ranks.length - 1; i >= 0; i--) {
    if (score >= ranks[i].minScore) {
      rank = ranks[i].name;
      break;
    }
  }
  return rank;
}

function updateScore() {
  scoreSpan.textContent = currentScore;
}

function updateRank() {
  rankNameSpan.textContent = getRank(currentScore);
}

// ------------------ Suallar ------------------
// easyCountries, mediumCountries, hardCountries array-larını ayrıca fayldan əlavə et!
const easyCountries = [
  { name: "Azərbaycan", flag: "https://flagcdn.com/w320/az.png" },
  { name: "Albania", flag: "https://flagcdn.com/w320/al.png" },
  { name: "Argentina", flag: "https://flagcdn.com/w320/ar.png" },
  { name: "Avstraliya", flag: "https://flagcdn.com/w320/au.png" },
  { name: "Avstriya", flag: "https://flagcdn.com/w320/at.png" },
  { name: "Braziliya", flag: "https://flagcdn.com/w320/br.png" },
  { name: "Fransa", flag: "https://flagcdn.com/w320/fr.png" },
  { name: "Almaniya", flag: "https://flagcdn.com/w320/de.png" },
  { name: "İspaniya", flag: "https://flagcdn.com/w320/es.png" },
  { name: "İtaliya", flag: "https://flagcdn.com/w320/it.png" },
  { name: "Rusiya", flag: "https://flagcdn.com/w320/ru.png" },
  { name: "Ukrayna", flag: "https://flagcdn.com/w320/ua.png" },
  { name: "Türkiyə", flag: "https://flagcdn.com/w320/tr.png" },
  { name: "Birləşmiş Krallıq", flag: "https://flagcdn.com/w320/gb.png" },
  { name: "Amerika Birləşmiş Ştatları", flag: "https://flagcdn.com/w320/us.png" },
  { name: "Meksika", flag: "https://flagcdn.com/w320/mx.png" },
  { name: "Misir", flag: "https://flagcdn.com/w320/eg.png" },
  { name: "Hindistan", flag: "https://flagcdn.com/w320/in.png" },
  { name: "Çin", flag: "https://flagcdn.com/w320/cn.png" },
  { name: "Yaponiya", flag: "https://flagcdn.com/w320/jp.png" }
];

const mediumCountries = [
  { name: "Bolqarıstan", flag: "https://flagcdn.com/w320/bg.png" },
  { name: "Çexiya", flag: "https://flagcdn.com/w320/cz.png" },
  { name: "Danimarka", flag: "https://flagcdn.com/w320/dk.png" },
  { name: "Finlandiya", flag: "https://flagcdn.com/w320/fi.png" },
  { name: "Hollandiya", flag: "https://flagcdn.com/w320/nl.png" },
  { name: "Macarıstan", flag: "https://flagcdn.com/w320/hu.png" },
  { name: "Norveç", flag: "https://flagcdn.com/w320/no.png" },
  { name: "Polşa", flag: "https://flagcdn.com/w320/pl.png" },
  { name: "Portuqaliya", flag: "https://flagcdn.com/w320/pt.png" },
  { name: "Rumıniya", flag: "https://flagcdn.com/w320/ro.png" },
  { name: "Slovakiya", flag: "https://flagcdn.com/w320/sk.png" },
  { name: "Sloveniya", flag: "https://flagcdn.com/w320/si.png" },
  { name: "İsveç", flag: "https://flagcdn.com/w320/se.png" },
  { name: "İsveçrə", flag: "https://flagcdn.com/w320/ch.png" },
  { name: "Cənubi Afrika", flag: "https://flagcdn.com/w320/za.png" },
  { name: "Moldova", flag: "https://flagcdn.com/w320/md.png" },
  { name: "Kolumbiya", flag: "https://flagcdn.com/w320/co.png" },
  { name: "Qazaxıstan", flag: "https://flagcdn.com/w320/kz.png" },
  { name: "Qətər", flag: "https://flagcdn.com/w320/qa.png" },
  { name: "İsrail", flag: "https://flagcdn.com/w320/il.png" }
];

const hardCountries = [
  { name: "Makedoniya (Şimali Makedoniya)", flag: "https://flagcdn.com/w320/mk.png" },
  { name: "Madaqaskar", flag: "https://flagcdn.com/w320/mg.png" },
  { name: "Malavi", flag: "https://flagcdn.com/w320/mw.png" },
  { name: "Malayziya", flag: "https://flagcdn.com/w320/my.png" },
  { name: "Maldiv adaları", flag: "https://flagcdn.com/w320/mv.png" },
  { name: "Mali", flag: "https://flagcdn.com/w320/ml.png" },
  { name: "Malta", flag: "https://flagcdn.com/w320/mt.png" },
  { name: "Marşall adaları", flag: "https://flagcdn.com/w320/mh.png" },
  { name: "Mavritaniya", flag: "https://flagcdn.com/w320/mr.png" },
  { name: "Mavriki", flag: "https://flagcdn.com/w320/mu.png" },
  { name: "Mikroneziya", flag: "https://flagcdn.com/w320/fm.png" },
  { name: "Monako", flag: "https://flagcdn.com/w320/mc.png" },
  { name: "Monqolustan", flag: "https://flagcdn.com/w320/mn.png" },
  { name: "Monteneqro", flag: "https://flagcdn.com/w320/me.png" },
  { name: "Mərakeş", flag: "https://flagcdn.com/w320/ma.png" },
  { name: "Mozambik", flag: "https://flagcdn.com/w320/mz.png" },
  { name: "Myanma", flag: "https://flagcdn.com/w320/mm.png" },
  { name: "Namibiya", flag: "https://flagcdn.com/w320/na.png" },
  { name: "Nauru", flag: "https://flagcdn.com/w320/nr.png" },
  { name: "Nepal", flag: "https://flagcdn.com/w320/np.png" },
  { name: "Nikaraqua", flag: "https://flagcdn.com/w320/ni.png" },
  { name: "Niger", flag: "https://flagcdn.com/w320/ne.png" },
  { name: "Nigeriya", flag: "https://flagcdn.com/w320/ng.png" },
  { name: "Oman", flag: "https://flagcdn.com/w320/om.png" },
  { name: "Pakistan", flag: "https://flagcdn.com/w320/pk.png" },
  { name: "Palau", flag: "https://flagcdn.com/w320/pw.png" },
  { name: "Panama", flag: "https://flagcdn.com/w320/pa.png" },
  { name: "Papua Yeni Qvineya", flag: "https://flagcdn.com/w320/pg.png" },
  { name: "Paraqvay", flag: "https://flagcdn.com/w320/py.png" },
  { name: "Peru", flag: "https://flagcdn.com/w320/pe.png" },
  { name: "Filippin", flag: "https://flagcdn.com/w320/ph.png" },
  { name: "Samoa", flag: "https://flagcdn.com/w320/ws.png" },
  { name: "San-Marino", flag: "https://flagcdn.com/w320/sm.png" },
  { name: "Sao Tome və Prinsipi", flag: "https://flagcdn.com/w320/st.png" },
  { name: "Seneqal", flag: "https://flagcdn.com/w320/sn.png" },
  { name: "Serbiya", flag: "https://flagcdn.com/w320/rs.png" },
  { name: "Seyşel adaları", flag: "https://flagcdn.com/w320/sc.png" },
  { name: "Sierra Leone", flag: "https://flagcdn.com/w320/sl.png" },
  { name: "Sinqapur", flag: "https://flagcdn.com/w320/sg.png" },
  { name: "Solomon adaları", flag: "https://flagcdn.com/w320/sb.png" },
  { name: "Somali", flag: "https://flagcdn.com/w320/so.png" },
  { name: "Cənubi Sudan", flag: "https://flagcdn.com/w320/ss.png" },
  { name: "Sudan", flag: "https://flagcdn.com/w320/sd.png" },
  { name: "Surinam", flag: "https://flagcdn.com/w320/sr.png" },
  { name: "Suriya", flag: "https://flagcdn.com/w320/sy.png" },
  { name: "Tayvan", flag: "https://flagcdn.com/w320/tw.png" },
  { name: "Tacikistan", flag: "https://flagcdn.com/w320/tj.png" },
  { name: "Tanzaniya", flag: "https://flagcdn.com/w320/tz.png" },
  { name: "Tailand", flag: "https://flagcdn.com/w320/th.png" },
  { name: "Timor-Leste", flag: "https://flagcdn.com/w320/tl.png" },
  { name: "Toqo", flag: "https://flagcdn.com/w320/tg.png" },
  { name: "Tonqa", flag: "https://flagcdn.com/w320/to.png" },
  { name: "Trinidad və Tobaqo", flag: "https://flagcdn.com/w320/tt.png" },
  { name: "Tunis", flag: "https://flagcdn.com/w320/tn.png" },
  { name: "Türkmənistan", flag: "https://flagcdn.com/w320/tm.png" },
  { name: "Tuvalu", flag: "https://flagcdn.com/w320/tv.png" },
  { name: "Uqanda", flag: "https://flagcdn.com/w320/ug.png" },
  { name: "Uruqvay", flag: "https://flagcdn.com/w320/uy.png" },
  { name: "Vanuatu", flag: "https://flagcdn.com/w320/vu.png" },
  { name: "Venesuela", flag: "https://flagcdn.com/w320/ve.png" },
  { name: "Vyetnam", flag: "https://flagcdn.com/w320/vn.png" },
  { name: "Yəmən", flag: "https://flagcdn.com/w320/ye.png" },
  { name: "Zambiya", flag: "https://flagcdn.com/w320/zm.png" },
  { name: "Zimbabve", flag: "https://flagcdn.com/w320/zw.png" },
  { name: "Fələstin Dövlət(i)", flag: "https://flagcdn.com/w320/ps.png" }
];

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function switchMode(mode) {
  currentMode = mode;
  currentScore = 0;
  saveScore();
  updateScore();
  updateRank();
  clearScoreHistory();

  if (mode === 'solo') {
    nextQuestion();
  } else if (mode === 'competitive') {
    loadScore();
    updateLeaderboard();
    nextQuestion();
  } else if (mode === 'multiplayer') {
    // Multiplayer üçün seçim verək:
    const choice = prompt("Yeni otaq yaratmaq üçün 'Y' yazın, mövcud otağa qoşulmaq üçün otaq ID daxil edin:");

    let roomId;
    if (choice && choice.toLowerCase() === 'y') {
      // Yeni unikal otaq ID yaradılır
      roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
      alert(`Yeni otaq yaradıldı! Otaq ID: ${roomId}\nRəqibinizə bu ID-ni göndərin.`);
    } else if (choice) {
      // İstifadəçi mövcud otaq ID-ni daxil edib
      roomId = choice.toUpperCase();
    } else {
      alert("Otaq ID daxil edilmədi. Multiplayer rejimindən çıxılır.");
      return;
    }

    joinRoom(roomId);
    showRoomId(roomId);
  }
}



function saveScore() {
  if (currentMode === 'competitive') {
    localStorage.setItem('competitiveScore', currentScore);
  }
}

function loadScore() {
  if (currentMode === 'competitive') {
    const saved = localStorage.getItem('competitiveScore');
    currentScore = saved ? parseInt(saved) : 0;
    updateScore();
    updateRank();
  }
}

function nextQuestion() {
  if (currentMode === 'competitive') loadScore();

  let pool;
  if (currentMode === 'solo') {
    pool = easyCountries.concat(mediumCountries, hardCountries);
  } else {
    if (currentScore < 10) pool = easyCountries;
    else if (currentScore < 25) pool = mediumCountries;
    else pool = hardCountries;
  }

  correctCountry = pool[Math.floor(Math.random() * pool.length)];

  let options = [correctCountry];
  while (options.length < 4) {
    const allCountries = easyCountries.concat(mediumCountries, hardCountries);
    const randomCountry = allCountries[Math.floor(Math.random() * allCountries.length)];
    if (!options.some(c => c.name === randomCountry.name)) {
      options.push(randomCountry);
    }
  }
  shuffleArray(options);

  flagImg.src = correctCountry.flag;
  flagImg.alt = correctCountry.name;

  optionsDiv.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt.name;
    btn.onclick = () => checkAnswer(btn, opt.name === correctCountry.name);
    optionsDiv.appendChild(btn);
  });

  updateScore();
  updateRank();
}

function checkAnswer(btn, isCorrect) {
  const buttons = optionsDiv.querySelectorAll("button");
  buttons.forEach(b => b.disabled = true);

  if (isCorrect) {
    btn.classList.add("correct");
    currentScore += 10;
    if (soundOn) correctSound.play();
    addToScoreHistory(10);
  } else {
    btn.classList.add("wrong");
    [...buttons].find(b => b.textContent === correctCountry.name)?.classList.add("correct");
    currentScore = Math.max(0, currentScore - 5);
    if (soundOn) wrongSound.play();
    addToScoreHistory(-10);
  }

  updateScore();
  updateRank();
  saveScore();
  updateLeaderboard();

  // Multiplayer rejimindəsə serverə göndər
  if (currentMode === 'multiplayer') {
    // Otaq ID-ni hardan alacağına qərar verməlisən, məsələn localStorage-da saxla
    const roomId = localStorage.getItem('roomId');
    sendAnswer(roomId, isCorrect);
  }

  setTimeout(() => {
    nextQuestion();
  }, 1500);
}


// ------------------ Xal Tarixi ------------------
const scoreHistoryArr = [];

function addToScoreHistory(points) {
  if (scoreHistoryArr.length > 9) scoreHistoryArr.shift();
  scoreHistoryArr.push(points);
  renderScoreHistory();
}

function renderScoreHistory() {
  scoreHistoryDiv.innerHTML = scoreHistoryArr.map(p => {
    const sign = p > 0 ? '+' : '';
    const color = p > 0 ? 'lime' : 'red';
    return `<div style="color:${color}; font-weight:700;">${sign}${p}</div>`;
  }).join('');
}

function clearScoreHistory() {
  scoreHistoryArr.length = 0;
  scoreHistoryDiv.innerHTML = "";
}

// ------------------ Lider lövhəsi ------------------
function updateLeaderboard() {
  const leaderboardKey = 'leaderboardScores';
  let leaderboard = JSON.parse(localStorage.getItem(leaderboardKey)) || [];

  if (currentScore > 0) {
    if (!leaderboard.includes(currentScore)) {
      leaderboard.push(currentScore);
    }
  }

  leaderboard = leaderboard.sort((a, b) => b - a).slice(0, 5);
  localStorage.setItem(leaderboardKey, JSON.stringify(leaderboard));

  leaderboardOl.innerHTML = leaderboard.map(s => `<li>${s} xal</li>`).join('');
}
const btnMultiplayer = document.getElementById('btnMultiplayer');
btnMultiplayer.onclick = () => switchMode('multiplayer');

// ------------------ Səhifə Yükləndikdə ------------------
document.addEventListener("DOMContentLoaded", () => {
  const savedUser = localStorage.getItem("username");
  if (savedUser) {
    authScreen.style.display = "none";
    gameScreen.style.display = "block";
    switchMode("solo");
  } else {
    authScreen.style.display = "flex";
    gameScreen.style.display = "none";
  }
});
const socket = io(); // Render özü domain verəcək, bu avtomatik işləyəcək
 // server ünvanı

// Multiplayer rejimində otağa qoşul
function joinRoom(roomId) {
  localStorage.setItem('roomId', roomId);
  socket.emit('joinRoom', roomId);
}


socket.on('roomFull', () => {
  alert("Otaq doludur, başqa otaq seçin.");
});

socket.on('roomUpdate', (players) => {
  console.log("Otaqdakı oyunçular:", players);
  // UI-də rəqib oyunçu göstərmək üçün istifadə edə bilərsən
});

socket.on('startGame', () => {
  console.log("Oyun başladı!");
  nextQuestion();
});
socket.on('scoreUpdate', (scores) => {
  console.log('Skorlar yeniləndi:', scores);
  // Məsələn, div əlavə et və hər oyunçunun skorunu göstər
  let scoreBoardDiv = document.getElementById('multiplayerScoreboard');
  if (!scoreBoardDiv) {
    scoreBoardDiv = document.createElement('div');
    scoreBoardDiv.id = 'multiplayerScoreboard';
    document.body.appendChild(scoreBoardDiv);
  }
  const playersScores = Object.entries(scores).map(([playerId, score]) => {
    return `<div>${playerId}: ${score} xal</div>`;
  }).join('');
  scoreBoardDiv.innerHTML = playersScores;
});


// Cavab verdikdə serverə bildir
function sendAnswer(roomId, isCorrect) {
  socket.emit('answer', { roomId, isCorrect });
}



function showRoomId(roomId) {
  const roomInfoDiv = document.getElementById('roomInfo');
  roomInfoDiv.textContent = `Otaq ID: ${roomId}`;
}
