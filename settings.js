const input = document.getElementById("focus-minutes");
const applyBtn = document.getElementById("apply");
const error = document.getElementById("error");

// 현재 저장된 설정을 입력창에 채워 넣는다.
input.value = loadFocusMinutes();

function apply() {
  const minutes = normalizeMinutes(input.value);

  if (minutes === null) {
    error.textContent = `${MIN_MINUTES}분 이상 ${MAX_MINUTES}분 이하로 입력해 주세요.`;
    error.hidden = false;
    input.focus();
    input.select();
    return;
  }

  saveFocusMinutes(minutes);
  location.href = "index.html";
}

applyBtn.addEventListener("click", apply);

// 입력창에서 Enter를 눌러도 설정이 적용되게 한다.
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") apply();
});

input.addEventListener("input", () => {
  error.hidden = true;
});
