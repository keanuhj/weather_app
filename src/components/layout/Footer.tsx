/**
 * 앱 하단 푸터 — 데이터 출처 표기
 */
export function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-200 py-6 text-center">
      <p className="text-xs text-slate-400">
        날씨 데이터 제공:{" "}
        <a
          href="https://openweathermap.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-sky-500 transition-colors"
        >
          OpenWeatherMap
        </a>
      </p>
    </footer>
  );
}
