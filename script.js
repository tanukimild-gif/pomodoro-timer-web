// 설정 페이지에서 저장한 시간을 불러온다. (storage.js)
const TOTAL_MS = loadFocusMinutes() * 60 * 1000;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

let remainingMs = TOTAL_MS;
let endsAt = 0;
let intervalId = null;

function render() {
  const totalSeconds = Math.max(0, Math.ceil(remainingMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  display.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  display.setAttribute("datetime", `PT${minutes}M${seconds}S`);
}

function updateButtons() {
  const running = intervalId !== null;
  startBtn.disabled = running || remainingMs === 0;
  stopBtn.disabled = !running;
  resetBtn.disabled = !running && remainingMs === TOTAL_MS;
}

function tick() {
  // 남은 시간은 목표 시각과의 차이로 계산해 setInterval 오차가 누적되지 않게 한다.
  remainingMs = Math.max(0, endsAt - Date.now());
  render();

  if (remainingMs === 0) {
    clearTimer();
    updateButtons();
  }
}

function clearTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function start() {
  if (intervalId !== null || remainingMs === 0) return;

  endsAt = Date.now() + remainingMs;
  intervalId = setInterval(tick, 250);
  updateButtons();
}

function stop() {
  if (intervalId === null) return;

  remainingMs = Math.max(0, endsAt - Date.now());
  clearTimer();
  render();
  updateButtons();
}

function reset() {
  clearTimer();
  remainingMs = TOTAL_MS;
  render();
  updateButtons();
}

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);

render();
updateButtons();
