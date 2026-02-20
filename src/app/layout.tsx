import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "날씨 앱 — 지역별 실시간 날씨",
  description:
    "지역을 선택하면 현재 날씨, 시간별 예보, 주간 예보를 한눈에 확인할 수 있는 날씨 웹앱입니다.",
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} font-sans antialiased bg-slate-100 min-h-screen`}>
        <NuqsAdapter>
          {children}
        </NuqsAdapter>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
