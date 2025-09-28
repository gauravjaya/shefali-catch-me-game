let score = 0;
let timer = 60;
let interval;
let shefali, gaurav, dialogueBox;
let gameArea;
let difficulty = "easy";

document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("restartBtn").addEventListener("click", () => location.reload());

function startGame() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("game-ui").classList.remove("hidden");

  score = 0;
  timer = 60;
  difficulty = document.getElementById("difficulty").value;

  shefali = document.getElementById("shefali");
  gaurav = document.getElementById("gaurav");
  dialogueBox = document.getElementById("dialogue");
  gameArea = document.getElementById("game-area");

  shefali.style.left = "50px";
  shefali.style.top = "50px";
  gaurav.style.left = "200px";
  gaurav.style.top = "200px";

  document.addEventListener("mousemove", moveShefali);
  document.addEventListener("touchmove", moveShefaliTouch);

  interval = setInterval(gameLoop, 1000 / 30);
  let countdown = setInterval(() => {
    timer--;
    document.getElementById("timer").innerText = "Time: " + timer;
    if (timer <= 0) {
      clearInterval(interval);
      clearInterval(countdown);
      endGame();
    }
  }, 1000);
}

function moveShefali(e) {
  let rect = gameArea.getBoundingClientRect();
  let x = e.clientX - rect.left - shefali.offsetWidth / 2;
  let y = e.clientY - rect.top - shefali.offsetHeight / 2;
  shefali.style.left = Math.max(0, Math.min(rect.width - shefali.offsetWidth, x)) + "px";
  shefali.style.top = Math.max(0, Math.min(rect.height - shefali.offsetHeight, y)) + "px";
}

function moveShefaliTouch(e) {
  let rect = gameArea.getBoundingClientRect();
  let touch = e.touches[0];
  let x = touch.clientX - rect.left - shefali.offsetWidth / 2;
  let y = touch.clientY - rect.top - shefali.offsetHeight / 2;
  shefali.style.left = Math.max(0, Math.min(rect.width - shefali.offsetWidth, x)) + "px";
  shefali.style.top = Math.max(0, Math.min(rect.height - shefali.offsetHeight, y)) + "px";
}

function gameLoop() {
  let shefaliRect = shefali.getBoundingClientRect();
  let gauravRect = gaurav.getBoundingClientRect();
  let gameRect = gameArea.getBoundingClientRect();

  let dx = shefaliRect.left - gauravRect.left;
  let dy = shefaliRect.top - gauravRect.top;
  let distance = Math.sqrt(dx * dx + dy * dy);

  let speed = difficulty === "easy" ? 2 : difficulty === "medium" ? 4 : 6;

  gaurav.style.left = Math.max(0, Math.min(gameRect.width - gaurav.offsetWidth,
    gaurav.offsetLeft - dx / distance * speed)) + "px";
  gaurav.style.top = Math.max(0, Math.min(gameRect.height - gaurav.offsetHeight,
    gaurav.offsetTop - dy / distance * speed)) + "px";

  if (distance < 50) {
    score++;
    document.getElementById("score").innerText = "Score: " + score;
    dialogueBox.innerText = getDialogue(score);
    gaurav.style.left = Math.random() * (gameRect.width - gaurav.offsetWidth) + "px";
    gaurav.style.top = Math.random() * (gameRect.height - gaurav.offsetHeight) + "px";
  }
}

function getDialogue(score) {
  if (score === 1) return "That tickles! 😅";
  if (score === 2) return "Be gentle! I can do anything for you ❤️";
  if (score >= 3) return "You got me — I'm yours 💕";
  return "";
}

function endGame() {
  document.getElementById("game-ui").classList.add("hidden");
  document.getElementById("end-screen").classList.remove("hidden");
  document.getElementById("final-stats").innerText =
    "Final Score: " + score + " | Time Up!";
}
