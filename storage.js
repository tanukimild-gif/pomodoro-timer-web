// 메인 페이지와 설정 페이지가 공유하는 설정 저장소.
const STORAGE_KEY = "pomodoro.focusMinutes";
const DEFAULT_MINUTES = 25;
const MIN_MINUTES = 1;
const MAX_MINUTES = 120;

// 유효한 정수 분 단위만 통과시키고, 그 외에는 null을 반환한다.
function normalizeMinutes(value) {
  const minutes = Math.round(Number(value));

  if (!Number.isFinite(minutes)) return null;
  if (minutes < MIN_MINUTES || minutes > MAX_MINUTES) return null;

  return minutes;
}

function loadFocusMinutes() {
  try {
    return normalizeMinutes(localStorage.getItem(STORAGE_KEY)) ?? DEFAULT_MINUTES;
  } catch {
    // 브라우저가 저장소를 막아둔 경우(시크릿 모드 등)에도 기본값으로 동작한다.
    return DEFAULT_MINUTES;
  }
}

function saveFocusMinutes(minutes) {
  try {
    localStorage.setItem(STORAGE_KEY, String(minutes));
  } catch {
    // 저장에 실패해도 화면 동작은 막지 않는다.
  }
}
