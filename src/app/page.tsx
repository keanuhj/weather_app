import { AlertCircle } from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CurrentWeatherCard } from "@/components/weather/CurrentWeatherCard";
import { HourlyForecast } from "@/components/weather/HourlyForecast";
import { WeeklyForecast } from "@/components/weather/WeeklyForecast";
import { getCityById } from "@/lib/cities";
import { getWeatherData } from "@/lib/weatherApi";

interface PageProps {
  searchParams: Promise<{ city?: string }>;
}

/**
 * 날씨 앱 메인 페이지 (Server Component).
 * URL 쿼리 파라미터 `city`를 읽어 해당 도시의 날씨 데이터를 서버에서 패칭한다.
 * 기본 도시: 서울 (city=seoul)
 */
export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const cityId = params.city ?? "seoul";
  const city = getCityById(cityId);

  try {
    const weatherData = await getWeatherData(city.nameEn);

    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 mx-auto w-full max-w-2xl px-4 py-6 space-y-4">
          <CurrentWeatherCard data={weatherData.current} />
          <HourlyForecast items={weatherData.hourly} />
          <WeeklyForecast items={weatherData.daily} />
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";

    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 mx-auto w-full max-w-2xl px-4 py-6">
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-10 text-center">
            <AlertCircle className="h-10 w-10 text-red-400" />
            <h2 className="text-lg font-semibold text-red-700">
              날씨 데이터를 불러올 수 없습니다
            </h2>
            <p className="max-w-sm text-sm text-red-500">{message}</p>
            <p className="text-xs text-slate-400">
              .env.local 파일에 OPENWEATHER_API_KEY가 올바르게 설정되어 있는지
              확인해 주세요.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
