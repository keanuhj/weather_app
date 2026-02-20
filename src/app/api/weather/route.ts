import { type NextRequest, NextResponse } from "next/server";

import { getCityById } from "@/lib/cities";
import { getWeatherData } from "@/lib/weatherApi";

/**
 * GET /api/weather?city={cityId}
 * 도시 ID를 받아 현재 날씨 + 예보 데이터를 반환한다.
 * 클라이언트 컴포넌트에서 도시 변경 시 사용하는 엔드포인트.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const cityId = searchParams.get("city") ?? "seoul";
  const city = getCityById(cityId);

  try {
    const data = await getWeatherData(city.nameEn);
    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "날씨 데이터를 불러올 수 없습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
