"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * 페이지 레벨 Error Boundary.
 * 서버 컴포넌트에서 처리되지 않은 오류가 발생했을 때 표시된다.
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[WeatherApp Error]", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <AlertCircle className="h-14 w-14 text-red-400" />
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-slate-800">
          오류가 발생했습니다
        </h2>
        <p className="max-w-sm text-sm text-slate-500">{error.message}</p>
      </div>
      <Button onClick={reset} variant="outline" className="gap-2">
        <RefreshCw className="h-4 w-4" />
        다시 시도
      </Button>
    </main>
  );
}
