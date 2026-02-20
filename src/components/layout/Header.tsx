import { Cloud } from "lucide-react";

import { LocationSelect } from "@/components/weather/LocationSelect";

/**
 * 앱 상단 헤더.
 * 로고/앱명(서버 렌더링)과 지역 선택 Combobox(클라이언트 컴포넌트)를 포함한다.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
        {/* 로고 */}
        <div className="flex items-center gap-2">
          <Cloud className="h-6 w-6 text-sky-500" />
          <span className="text-lg font-bold text-slate-800 tracking-tight">
            날씨 앱
          </span>
        </div>

        {/* 도시 선택 */}
        <LocationSelect />
      </div>
    </header>
  );
}
