import Image from "next/image";
import { Droplets } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTime, getWeatherIconUrl } from "@/lib/weatherUtils";
import type { HourlyForecastItem } from "@/types/weather";

interface HourlyForecastProps {
  items: HourlyForecastItem[];
}

/**
 * 향후 24시간(3시간 간격, 최대 8개) 시간별 예보를 가로 스크롤로 표시한다.
 */
export function HourlyForecast({ items }: HourlyForecastProps) {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-700">
          시간별 예보 (24시간)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {items.map((item) => (
            <HourlyItem key={item.dt} item={item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function HourlyItem({ item }: { item: HourlyForecastItem }) {
  return (
    <div className="flex flex-col items-center gap-1 min-w-[72px] rounded-xl bg-slate-50 hover:bg-sky-50 transition-colors p-3">
      {/* 시간 */}
      <p className="text-xs font-medium text-slate-500">
        {formatTime(item.dt)}
      </p>

      {/* 날씨 아이콘 */}
      <Image
        src={getWeatherIconUrl(item.condition.icon)}
        alt={item.condition.description}
        width={40}
        height={40}
      />

      {/* 기온 */}
      <p className="text-sm font-bold text-slate-800">{item.temp}°</p>

      {/* 강수 확률 */}
      {item.precipitationProbability > 0 && (
        <span className="flex items-center gap-0.5 text-xs text-sky-500">
          <Droplets className="h-3 w-3" />
          {item.precipitationProbability}%
        </span>
      )}
    </div>
  );
}
