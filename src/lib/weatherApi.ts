/**
 * weatherApi.ts
 *
 * OpenWeatherMap API 호출 및 데이터 가공 유틸리티.
 * 이 파일은 서버 전용(Server Component / API Route)으로만 사용해야 한다.
 * API 키가 포함되므로 절대 'use client' 파일에서 import하지 말 것.
 */

import type {
  CurrentWeather,
  DailyForecastItem,
  HourlyForecastItem,
  OWMCurrentWeatherResponse,
  OWMForecastItem,
  OWMForecastResponse,
  WeatherCondition,
  WeatherData,
} from "@/types/weather";

const BASE_URL = process.env.OPENWEATHER_BASE_URL;
const API_KEY = process.env.OPENWEATHER_API_KEY;

/** API 키 및 BASE_URL 환경변수 검증 */
function validateEnv(): void {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    throw new Error(
      "OPENWEATHER_API_KEY가 .env.local에 설정되지 않았습니다. " +
        "https://openweathermap.org 에서 API 키를 발급받아 설정해 주세요."
    );
  }
  if (!BASE_URL) {
    throw new Error("OPENWEATHER_BASE_URL이 .env.local에 설정되지 않았습니다.");
  }
}

/** OWM weather 배열에서 첫 번째 WeatherCondition을 추출한다. */
function extractCondition(
  weather: OWMCurrentWeatherResponse["weather"]
): WeatherCondition {
  const w = weather[0];
  return {
    id: w.id,
    main: w.main,
    description: w.description,
    icon: w.icon,
  };
}

/**
 * 도시명(영문)으로 현재 날씨를 조회한다.
 * @param cityNameEn - OpenWeatherMap에서 인식하는 영문 도시명 (e.g. "Seoul")
 */
export async function fetchCurrentWeather(
  cityNameEn: string
): Promise<CurrentWeather> {
  validateEnv();

  const url = `${BASE_URL}/weather?q=${encodeURIComponent(cityNameEn)}&appid=${API_KEY}&units=metric&lang=kr`;

  const res = await fetch(url, {
    // 현재 날씨는 10분마다 갱신되므로 600초 캐시
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(
      `현재 날씨 조회 실패 [${res.status}]: ${errorBody}`
    );
  }

  const data: OWMCurrentWeatherResponse = await res.json();

  return {
    cityName: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    tempMin: Math.round(data.main.temp_min),
    tempMax: Math.round(data.main.temp_max),
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    pressure: data.main.pressure,
    visibility: data.visibility,
    condition: extractCondition(data.weather),
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    dt: data.dt,
  };
}

/**
 * 3시간 단위 예보 항목 배열에서 향후 24시간(최대 8개)의 시간별 예보를 반환한다.
 */
function buildHourlyForecast(list: OWMForecastItem[]): HourlyForecastItem[] {
  return list.slice(0, 8).map((item) => ({
    dt: item.dt,
    temp: Math.round(item.main.temp),
    condition: extractCondition(item.weather),
    precipitationProbability: Math.round(item.pop * 100),
    humidity: item.main.humidity,
    windSpeed: item.wind.speed,
  }));
}

/**
 * 3시간 단위 예보 항목 배열을 날짜별로 그룹화하여 일별 예보 배열을 반환한다.
 * - 최저/최고 기온: 해당 날의 min/max
 * - 대표 날씨 상태: 정오(12:00) 시각의 항목, 없으면 첫 번째 항목
 * - 강수 확률: 해당 날의 최댓값
 * - 습도: 해당 날의 평균값
 */
function buildDailyForecast(list: OWMForecastItem[]): DailyForecastItem[] {
  // dt_txt 예시: "2024-02-15 12:00:00" → 날짜 부분 "2024-02-15"
  const grouped = new Map<string, OWMForecastItem[]>();

  for (const item of list) {
    const dateKey = item.dt_txt.split(" ")[0];
    if (!grouped.has(dateKey)) grouped.set(dateKey, []);
    grouped.get(dateKey)!.push(item);
  }

  const daily: DailyForecastItem[] = [];

  for (const [, items] of grouped) {
    if (daily.length >= 7) break;

    const temps = items.map((i) => i.main.temp);
    const tempMin = Math.round(Math.min(...temps));
    const tempMax = Math.round(Math.max(...temps));
    const maxPop = Math.round(Math.max(...items.map((i) => i.pop)) * 100);
    const avgHumidity = Math.round(
      items.reduce((sum, i) => sum + i.main.humidity, 0) / items.length
    );

    // 정오(12:00) 항목을 대표 날씨로 사용, 없으면 첫 번째 항목
    const noonItem =
      items.find((i) => i.dt_txt.includes("12:00:00")) ?? items[0];

    daily.push({
      dt: noonItem.dt,
      tempMin,
      tempMax,
      condition: extractCondition(noonItem.weather),
      precipitationProbability: maxPop,
      humidity: avgHumidity,
    });
  }

  return daily;
}

/**
 * 도시명(영문)으로 5일/3시간 예보를 조회한다.
 * @param cityNameEn - OpenWeatherMap에서 인식하는 영문 도시명
 */
export async function fetchForecast(cityNameEn: string): Promise<{
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
}> {
  validateEnv();

  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(cityNameEn)}&appid=${API_KEY}&units=metric&lang=kr`;

  const res = await fetch(url, {
    // 예보는 3시간마다 갱신되므로 10800초(3시간) 캐시
    next: { revalidate: 10800 },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`예보 조회 실패 [${res.status}]: ${errorBody}`);
  }

  const data: OWMForecastResponse = await res.json();

  return {
    hourly: buildHourlyForecast(data.list),
    daily: buildDailyForecast(data.list),
  };
}

/**
 * 현재 날씨와 예보를 한 번에 조회하여 WeatherData를 반환한다.
 * Server Component의 page.tsx에서 호출하는 진입점 함수.
 *
 * @param cityNameEn - OpenWeatherMap에서 인식하는 영문 도시명 (e.g. "Seoul")
 */
export async function getWeatherData(cityNameEn: string): Promise<WeatherData> {
  const [current, { hourly, daily }] = await Promise.all([
    fetchCurrentWeather(cityNameEn),
    fetchForecast(cityNameEn),
  ]);

  return { current, hourly, daily };
}
