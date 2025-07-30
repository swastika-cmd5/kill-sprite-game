let score = 0;
let gameInterval;
let timerInterval;
let timeLeft = 30;
let moveSpeed = 2000;
const highScoreDisplay = document.getElementById("highScore");
let highScore = localStorage.getItem("pixelHighScore") || 0;
highScoreDisplay.textContent = highScore;

const sprite = document.getElementById("sprite");
const spriteWrapper = document.getElementById("spriteWrapper");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const preview = document.getElementById("preview");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const imageInput = document.getElementById("imageInput");
const hitbox = document.getElementById("hitbox");
const difficulty = document.getElementById("difficulty");

imageInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imgData = e.target.result;
      preview.src = imgData;
      sprite.src = imgData;
      spriteWrapper.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

function startGame() {
  if (!sprite.src || sprite.src.includes("blank")) {
    alert("Please upload an image first!");
    return;
  }

  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;

  const diff = difficulty.value;
  moveSpeed = diff === "hard" ? 500 : 1700;

  startScreen.style.display = "none";
  gameScreen.style.display = "block";
  spriteWrapper.style.display = "block";

  moveSprite();
  gameInterval = setInterval(moveSprite, moveSpeed);
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = timeLeft;
  if (timeLeft <= 0) {
    endGame();
  }
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  spriteWrapper.style.display = "none";
  alert("⏱ Time's up! Your final score is: " + score);
  /*if (score > highScore) {
    highScore = score;
    localStorage.setItem("pixelHighScore", highScore);
    highScoreDisplay.textContent = highScore;
  }  */
  gameScreen.style.display = "none";
  startScreen.style.display = "block";
}

function moveSprite() {
  const x = Math.random() * (window.innerWidth - 150);
  const y = Math.random() * (window.innerHeight - 150);
  spriteWrapper.style.left = `${x}px`;
  spriteWrapper.style.top = `${y}px`;
}

hitbox.onclick = () => {
  score++;
  scoreDisplay.textContent = score;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("pixelHighScore", highScore);
    highScoreDisplay.textContent = highScore;
  }
};

