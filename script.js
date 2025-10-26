/* ===========================
   CONFIGURACIÓN GENERAL
   =========================== */

const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spinBtn');
const scoreEl = document.getElementById('score');
const categoryLabel = document.getElementById('categoryLabel');
const questionText = document.getElementById('questionText');
const optionsList = document.getElementById('optionsList');
const resultBox = document.getElementById('resultBox');
const resultMainEl = document.getElementById('resultMain');
const resultRefEl  = document.getElementById('resultRef');

let score = 0;
let streak = 0;
let isSpinning = false;
let currentRotation = 0;

/* ===========================
   DATOS Y CONFIG
   =========================== */

/*
Muy importante:
El orden aquí DEBE coincidir con el orden REAL de los colores/sectores en tu ruleta
según caen bajo la flecha (en sentido de las manecillas del reloj).

De lo que observaste en pantalla:
  - Principios Morales
  - Historia de Israel
  - Evangelios
  - Profecías
  - Personajes
*/
const categories = [
  "Principios Morales",
  "Historia de Israel",
  "Evangelios",
  "Profecías",
  "Personajes"
];

const categoryProgress = {
  "Personajes": 0,
  "Profecías": 0,
  "Evangelios": 0,
  "Historia de Israel": 0,
  "Principios Morales": 0
};

// Sonidos
const spinSound = new Audio('sounds/spin.mp3');
spinSound.loop = true;
const stopSound = new Audio('sounds/ding.mp3');
stopSound.volume = 0.7;

/* ===========================
   FUNCIONES DE UI
   =========================== */

function updateProgressDisplay() {
  document.getElementById('prog-personajes').textContent  = categoryProgress["Personajes"];
  document.getElementById('prog-profecias').textContent   = categoryProgress["Profecías"];
  document.getElementById('prog-evangelios').textContent  = categoryProgress["Evangelios"];
  document.getElementById('prog-israel').textContent      = categoryProgress["Historia de Israel"];
  document.getElementById('prog-morales').textContent     = categoryProgress["Principios Morales"];
}

function addScoreWithStreak(isCorrect) {
  if (isCorrect) {
    const gain = 10 + (streak - 1) * 5;
    score += gain;
  } else {
    score -= 3;
    if (score < 0) score = 0;
  }
  scoreEl.textContent = score;
}

function showResult(isCorrect, titulo, refTexto) {
  if (isCorrect) {
    resultMainEl.textContent = `${titulo} ✓ | Racha: ${streak}`;
    resultMainEl.classList.remove('no');
    resultMainEl.classList.add('ok');
  } else {
    resultMainEl.textContent = `${titulo} ✗`;
    resultMainEl.classList.remove('ok');
    resultMainEl.classList.add('no');
  }
  resultRefEl.textContent = refTexto || "";
  resultBox.classList.add('show', 'fade-in-scale');
}

function reanimate(el) {
  el.classList.remove('fade-in-scale');
  void el.offsetWidth;
  el.classList.add('fade-in-scale');
}

/* ===========================
   PREGUNTAS
   =========================== */

let currentCategory = null;
let currentQuestion = null;
let answered = false;

function pickRandomQuestion(categoryName) {
  const pool = questionBank[categoryName];
  if (!pool || pool.length === 0) return null;
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}

function showQuestionForCategory(categoryName) {
  currentCategory = categoryName;
  currentQuestion = pickRandomQuestion(categoryName);
  answered = false;

  categoryLabel.textContent = categoryName;

  if (currentQuestion) {
    questionText.textContent = currentQuestion.q;
  } else {
    questionText.textContent = "(No hay preguntas disponibles en esta categoría todavía)";
  }

  optionsList.innerHTML = "";
  resultBox.classList.remove('show', 'fade-in-scale');
  resultMainEl.textContent = "";
  resultRefEl.textContent = "";

  if (currentQuestion && currentQuestion.options) {
    currentQuestion.options.forEach((optText, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = optText;
      btn.disabled = false;

      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        const isCorrect = (i === currentQuestion.correctIndex);

        if (isCorrect) {
          btn.classList.add('correct');
        } else {
          btn.classList.add('incorrect');
        }

        Array.from(optionsList.children).forEach(b => {
          b.disabled = true;
          const index = [...optionsList.children].indexOf(b);
          if (index === currentQuestion.correctIndex) {
            b.classList.add('correct');
          }
        });

        if (isCorrect) {
          streak++;
          categoryProgress[currentCategory]++;
          addScoreWithStreak(true);
          showResult(true, "¡Correcto!", currentQuestion.ref);
        } else {
          streak = 0;
          addScoreWithStreak(false);
          showResult(false, "Incorrecto", currentQuestion.ref);
        }

        updateProgressDisplay();
      });

      optionsList.appendChild(btn);
    });
  }

  reanimate(questionText);
  reanimate(optionsList);
}

/* ===========================
   RULETA
   =========================== */

/*
Lógica:
- Tomamos el ángulo final en grados después del giro.
- Lo normalizamos a [0,360).
- Cada sector ocupa 72° (360 / 5).
- sectorIndex = 0..4
- Devolvemos categories[sectorIndex].
*/
function getCategoryFromAngle(angleDeg) {
  let a = angleDeg % 360;
  if (a < 0) a += 360;

  const sectorSize = 360 / categories.length; // 72
  const index = Math.floor(a / sectorSize);   // 0..4
  return categories[index];
}

function spinWheel() {
  if (isSpinning) return;
  isSpinning = true;
  spinBtn.disabled = true;

  spinSound.currentTime = 0;
  spinSound.play().catch(() => {});

  const extra = Math.floor(Math.random() * 360);
  const totalRotation = currentRotation + 1080 + extra;

  wheel.style.transition = "transform 4s cubic-bezier(0.12, 0.11, 0.08, 1)";
  wheel.style.transform = `rotate(${totalRotation}deg)`;

  setTimeout(() => {
    spinSound.pause();
    spinSound.currentTime = 0;
    stopSound.play().catch(() => {});

    const finalAngle = totalRotation % 360;
    currentRotation = totalRotation;

    const category = getCategoryFromAngle(finalAngle);
    showQuestionForCategory(category);

    spinBtn.disabled = false;
    isSpinning = false;
  }, 4000);
}

/* ===========================
   INICIO
   =========================== */

function init() {
  updateProgressDisplay();
  scoreEl.textContent = score;
  categoryLabel.textContent = "—";
  questionText.textContent = "Gira la ruleta para obtener una pregunta.";
  optionsList.innerHTML = "";
  resultBox.classList.remove('show', 'fade-in-scale');

  spinBtn.addEventListener('click', spinWheel);
}

init();
