/**
 * weatherUtils.ts
 * 날씨 데이터 표시에 필요한 포매터 및 스타일 헬퍼 모음
 */

const KST_OPTIONS: Intl.DateTimeFormatOptions = { timeZone: "Asia/Seoul" };

/**
 * Unix timestamp → "HH:MM" 형식 (KST 기준)
 * 예: 1708000000 → "07:30"
 */
export function formatTime(unixTs: number): string {
  return new Date(unixTs * 1000).toLocaleTimeString("ko-KR", {
    ...KST_OPTIONS,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/**
 * Unix timestamp → 요일/날짜 문자열 (KST 기준)
 * 오늘/내일은 한국어로, 이후는 "화 2/20" 형식으로 반환
 */
export function formatDate(unixTs: number): string {
  const target = new Date(unixTs * 1000);
  const now = new Date();

  const toKSTDateString = (d: Date) =>
    d.toLocaleDateString("ko-KR", KST_OPTIONS);

  const targetStr = toKSTDateString(target);
  const todayStr = toKSTDateString(now);
  const tomorrowStr = toKSTDateString(
    new Date(now.getTime() + 24 * 60 * 60 * 1000)
  );

  if (targetStr === todayStr) return "오늘";
  if (targetStr === tomorrowStr) return "내일";

  return target.toLocaleDateString("ko-KR", {
    ...KST_OPTIONS,
    weekday: "short",
    month: "numeric",
    day: "numeric",
  });
}

/**
 * OpenWeatherMap 아이콘 코드 → 아이콘 이미지 URL (@2x 고해상도)
 * 예: "01d" → "https://openweathermap.org/img/wn/01d@2x.png"
 */
export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

/**
 * 날씨 상태 ID → Tailwind CSS 배경 그라데이션 클래스
 * OpenWeatherMap 날씨 코드 분류 기준:
 * - 2xx: 뇌우, 3xx: 이슬비, 5xx: 비, 6xx: 눈, 7xx: 안개/연무, 800: 맑음, 8xx: 구름
 */
export function getWeatherGradient(conditionId: number): string {
  if (conditionId >= 200 && conditionId < 300)
    return "from-gray-700 via-purple-900 to-gray-900"; // 뇌우
  if (conditionId >= 300 && conditionId < 400)
    return "from-teal-500 via-cyan-600 to-blue-700"; // 이슬비
  if (conditionId >= 500 && conditionId < 600)
    return "from-blue-600 via-blue-700 to-slate-800"; // 비
  if (conditionId >= 600 && conditionId < 700)
    return "from-blue-100 via-indigo-200 to-purple-300"; // 눈
  if (conditionId >= 700 && conditionId < 800)
    return "from-gray-400 via-gray-500 to-gray-600"; // 안개/연무
  if (conditionId === 800)
    return "from-sky-400 via-blue-500 to-blue-600"; // 맑음
  if (conditionId > 800)
    return "from-slate-400 via-slate-500 to-slate-600"; // 구름
  return "from-sky-400 via-blue-500 to-blue-600";
}

/**
 * 날씨 그라데이션 위에서 가독성 있는 텍스트 색상을 반환한다.
 * 눈(6xx) 계열은 배경이 밝으므로 어두운 텍스트 사용
 */
export function getWeatherTextColor(conditionId: number): string {
  if (conditionId >= 600 && conditionId < 700) return "text-slate-800";
  return "text-white";
}

/** m/s → "X.X m/s" */
export function formatWindSpeed(speed: number): string {
  return `${speed.toFixed(1)} m/s`;
}

/** 미터 단위 가시거리 → km 또는 m 문자열 */
export function formatVisibility(meters: number): string {
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km`;
  return `${meters} m`;
}
