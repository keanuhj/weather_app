import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

/**
 * 도시 변경 등 페이지 전환 시 표시되는 스켈레톤 로딩 UI.
 * Next.js App Router의 loading.tsx 컨벤션을 따른다.
 */
export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 스켈레톤 */}
      <div className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <Skeleton className="h-7 w-24 rounded-md" />
          <Skeleton className="h-9 w-36 rounded-md" />
        </div>
      </div>

      <main className="flex-1 mx-auto w-full max-w-2xl px-4 py-6 space-y-4">
        {/* 현재 날씨 카드 스켈레톤 */}
        <Card className="border-none shadow-xl overflow-hidden">
          <CardContent className="p-6 md:p-8 space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-9 w-32 rounded-md" />
              <Skeleton className="h-7 w-20 rounded-full" />
            </div>
            <div className="flex items-center justify-center gap-4 my-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-20 w-40 rounded-md" />
                <Skeleton className="h-4 w-28 rounded-md" />
              </div>
            </div>
            <Skeleton className="h-4 w-40 mx-auto rounded-md" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-100 rounded-2xl p-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-md" />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 시간별 예보 스켈레톤 */}
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <Skeleton className="h-5 w-36 rounded-md" />
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 overflow-hidden">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-[72px] shrink-0 rounded-xl" />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 주간 예보 스켈레톤 */}
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <Skeleton className="h-5 w-28 rounded-md" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-md" />
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
