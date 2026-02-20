// ============================================================
// OpenWeatherMap Raw API Response Types
// 외부 API 응답 원본 구조 — 절대 직접 UI에 사용하지 않는다.
// ============================================================

export interface OWMWeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface OWMMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface OWMWind {
  speed: number;
  deg: number;
  gust?: number;
}

/** GET /data/2.5/weather 응답 타입 */
export interface OWMCurrentWeatherResponse {
  coord: { lon: number; lat: number };
  weather: OWMWeatherCondition[];
  main: OWMMain;
  wind: OWMWind;
  clouds: { all: number };
  visibility: number;
  dt: number;
  sys: { country: string; sunrise: number; sunset: number };
  name: string;
}

/** GET /data/2.5/forecast 응답 내 list 항목 타입 */
export interface OWMForecastItem {
  dt: number;
  main: OWMMain;
  weather: OWMWeatherCondition[];
  wind: OWMWind;
  /** 강수 확률 (0~1) */
  pop: number;
  dt_txt: string;
}

/** GET /data/2.5/forecast 응답 타입 */
export interface OWMForecastResponse {
  list: OWMForecastItem[];
  city: {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
}

// ============================================================
// App-level Types
// API 응답을 가공한 앱 내부 전용 타입
// ============================================================

/** 날씨 상태 아이콘 및 설명 */
export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  /** OpenWeatherMap 아이콘 코드 (e.g. "01d", "09n") */
  icon: string;
}

/** 현재 날씨 */
export interface CurrentWeather {
  cityName: string;
  country: string;
  /** 현재 기온 (°C) */
  temp: number;
  /** 체감 기온 (°C) */
  feelsLike: number;
  /** 오늘 최저 기온 (°C) */
  tempMin: number;
  /** 오늘 최고 기온 (°C) */
  tempMax: number;
  /** 습도 (%) */
  humidity: number;
  /** 풍속 (m/s) */
  windSpeed: number;
  /** 기압 (hPa) */
  pressure: number;
  /** 가시거리 (m) */
  visibility: number;
  condition: WeatherCondition;
  /** 일출 Unix timestamp */
  sunrise: number;
  /** 일몰 Unix timestamp */
  sunset: number;
  /** 데이터 기준 시각 Unix timestamp */
  dt: number;
}

/** 시간별 예보 항목 (3시간 단위) */
export interface HourlyForecastItem {
  /** Unix timestamp */
  dt: number;
  /** 기온 (°C) */
  temp: number;
  condition: WeatherCondition;
  /** 강수 확률 (0~100%) */
  precipitationProbability: number;
  /** 습도 (%) */
  humidity: number;
  /** 풍속 (m/s) */
  windSpeed: number;
}

/** 일별 예보 항목 */
export interface DailyForecastItem {
  /** Unix timestamp (해당 날짜 정오 기준) */
  dt: number;
  /** 일 최저 기온 (°C) */
  tempMin: number;
  /** 일 최고 기온 (°C) */
  tempMax: number;
  condition: WeatherCondition;
  /** 강수 확률 최댓값 (0~100%) */
  precipitationProbability: number;
  /** 평균 습도 (%) */
  humidity: number;
}

/** 페이지에서 사용하는 통합 날씨 데이터 */
export interface WeatherData {
  current: CurrentWeather;
  /** 향후 24시간 (최대 8개, 3시간 간격) */
  hourly: HourlyForecastItem[];
  /** 향후 7일 일별 예보 */
  daily: DailyForecastItem[];
}

/** 선택 가능한 도시 */
export interface City {
  /** 고유 식별자 (API 쿼리용 영문명) */
  id: string;
  /** 화면 표시용 한국어 이름 */
  nameKo: string;
  /** OpenWeatherMap API 검색용 영문명 */
  nameEn: string;
}
