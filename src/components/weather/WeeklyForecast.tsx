import Image from "next/image";
import { Droplets } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, getWeatherIconUrl } from "@/lib/weatherUtils";
import type { DailyForecastItem } from "@/types/weather";

interface WeeklyForecastProps {
  items: DailyForecastItem[];
}

/**
 * 향후 7일 일별 예보를 리스트 형태로 표시한다.
 */
export function WeeklyForecast({ items }: WeeklyForecastProps) {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-700">
          주간 예보 (7일)
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <ul className="divide-y divide-slate-100">
          {items.map((item) => (
            <DailyItem key={item.dt} item={item} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function DailyItem({ item }: { item: DailyForecastItem }) {
  return (
    <li className="flex items-center gap-3 py-3 hover:bg-slate-50 transition-colors rounded-lg px-2 -mx-2">
      {/* 날짜 */}
      <span className="w-12 text-sm font-semibold text-slate-700 shrink-0">
        {formatDate(item.dt)}
      </span>

      {/* 날씨 아이콘 */}
      <Image
        src={getWeatherIconUrl(item.condition.icon)}
        alt={item.condition.description}
        width={36}
        height={36}
        className="shrink-0"
      />

      {/* 날씨 설명 */}
      <span className="flex-1 text-sm text-slate-500 truncate capitalize">
        {item.condition.description}
      </span>

      {/* 강수 확률 */}
      {item.precipitationProbability > 0 && (
        <span className="flex items-center gap-0.5 text-xs text-sky-500 shrink-0">
          <Droplets className="h-3 w-3" />
          {item.precipitationProbability}%
        </span>
      )}

      {/* 최저/최고 기온 */}
      <div className="flex items-center gap-1 text-sm shrink-0">
        <span className="text-blue-400 font-medium">{item.tempMin}°</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-800 font-bold">{item.tempMax}°</span>
      </div>
    </li>
  );
}
