import type { City } from "@/types/weather";

/**
 * OpenWeatherMap API에서 조회 가능한 주요 한국 도시 목록.
 * nameEn 은 API 쿼리 파라미터(q=)에 그대로 사용된다.
 */
export const CITIES: City[] = [
  { id: "seoul", nameKo: "서울", nameEn: "Seoul" },
  { id: "busan", nameKo: "부산", nameEn: "Busan" },
  { id: "incheon", nameKo: "인천", nameEn: "Incheon" },
  { id: "daegu", nameKo: "대구", nameEn: "Daegu" },
  { id: "daejeon", nameKo: "대전", nameEn: "Daejeon" },
  { id: "gwangju", nameKo: "광주", nameEn: "Gwangju" },
  { id: "ulsan", nameKo: "울산", nameEn: "Ulsan" },
  { id: "suwon", nameKo: "수원", nameEn: "Suwon" },
  { id: "changwon", nameKo: "창원", nameEn: "Changwon" },
  { id: "jeonju", nameKo: "전주", nameEn: "Jeonju" },
  { id: "cheongju", nameKo: "청주", nameEn: "Cheongju" },
  { id: "cheonan", nameKo: "천안", nameEn: "Cheonan" },
  { id: "pohang", nameKo: "포항", nameEn: "Pohang" },
  { id: "jeju", nameKo: "제주", nameEn: "Jeju City" },
  { id: "gangneung", nameKo: "강릉", nameEn: "Gangneung" },
];

/** 도시 id로 City 객체를 반환한다. 없으면 서울을 기본값으로 반환한다. */
export function getCityById(id: string): City {
  return CITIES.find((city) => city.id === id) ?? CITIES[0];
}
