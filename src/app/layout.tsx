import type { Metadata } from "next";
import "./globals.css";
import { ChartDataProvider } from "./hooks/ChartDataContext";

export const metadata: Metadata = {
  title: "Apex Chart Test Project",
  description: "try to use Apex Chart and bind with backend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ChartDataProvider> 
          {children}
        </ChartDataProvider>
      </body>
    </html>
  );
}
