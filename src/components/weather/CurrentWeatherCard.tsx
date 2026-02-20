import Image from "next/image";
import type { ReactNode } from "react";
import { Droplets, Eye, Gauge, Sunrise, Sunset, Wind } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  formatTime,
  formatVisibility,
  formatWindSpeed,
  getWeatherGradient,
  getWeatherIconUrl,
  getWeatherTextColor,
} from "@/lib/weatherUtils";
import type { CurrentWeather } from "@/types/weather";

interface CurrentWeatherCardProps {
  data: CurrentWeather;
}

/**
 * 현재 날씨 정보를 표시하는 메인 카드.
 * 날씨 상태(conditionId)에 따라 배경 그라데이션이 동적으로 변경된다.
 */
export function CurrentWeatherCard({ data }: CurrentWeatherCardProps) {
  const gradient = getWeatherGradient(data.condition.id);
  const textColor = getWeatherTextColor(data.condition.id);
  const iconUrl = getWeatherIconUrl(data.condition.icon);

  return (
    <Card
      className={cn(
        "bg-gradient-to-br border-none shadow-xl overflow-hidden",
        gradient,
        textColor
      )}
    >
      <CardContent className="p-6 md:p-8">
        {/* 상단: 도시명 + 날씨 상태 */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              {data.cityName}
            </h2>
            <p className={cn("text-sm mt-1 opacity-80")}>{data.country}</p>
          </div>
          <span
            className={cn(
              "text-sm font-medium px-3 py-1 rounded-full capitalize",
              "bg-white/20 backdrop-blur-sm"
            )}
          >
            {data.condition.description}
          </span>
        </div>

        {/* 중앙: 온도 + 아이콘 */}
        <div className="flex items-center justify-center gap-4 my-6">
          <Image
            src={iconUrl}
            alt={data.condition.description}
            width={80}
            height={80}
            priority
          />
          <div>
            <p className="text-8xl font-thin leading-none">{data.temp}°</p>
            <p className={cn("text-sm mt-2 opacity-80")}>
              체감 {data.feelsLike}°C
            </p>
          </div>
        </div>

        {/* 최저/최고 기온 */}
        <div className="text-center mb-6">
          <p className="text-sm opacity-90">
            최저 {data.tempMin}° / 최고 {data.tempMax}°
          </p>
        </div>

        {/* 상세 정보 그리드 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-black/10 backdrop-blur-sm rounded-2xl p-4">
          <DetailItem
            icon={<Droplets className="h-4 w-4" />}
            label="습도"
            value={`${data.humidity}%`}
          />
          <DetailItem
            icon={<Wind className="h-4 w-4" />}
            label="풍속"
            value={formatWindSpeed(data.windSpeed)}
          />
          <DetailItem
            icon={<Eye className="h-4 w-4" />}
            label="가시거리"
            value={formatVisibility(data.visibility)}
          />
          <DetailItem
            icon={<Gauge className="h-4 w-4" />}
            label="기압"
            value={`${data.pressure} hPa`}
          />
          <DetailItem
            icon={<Sunrise className="h-4 w-4" />}
            label="일출"
            value={formatTime(data.sunrise)}
          />
          <DetailItem
            icon={<Sunset className="h-4 w-4" />}
            label="일몰"
            value={formatTime(data.sunset)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface DetailItemProps {
  icon: ReactNode;
  label: string;
  value: string;
}

function DetailItem({ icon, label, value }: DetailItemProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="opacity-70 shrink-0">{icon}</span>
      <div>
        <p className="text-xs opacity-70">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

