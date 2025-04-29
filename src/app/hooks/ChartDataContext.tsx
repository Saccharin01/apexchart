"use client";

import { createContext, useContext, useState, ReactNode, ReactElement } from "react";

// 1. 타입 정의
interface ChartDataContextType {
  chartData: number[];
  categories: string[];
  setChartData: (data: number[]) => void;
  setCategories: (categories: string[]) => void;
}

// 2. Context 생성
const ChartDataContext = createContext<ChartDataContextType | undefined>(undefined);

// 3. Provider 정의
export function ChartDataProvider({ children }: { children: ReactNode }): ReactElement {
  const [chartData, setChartData] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  return (
    <ChartDataContext.Provider value={{ chartData, setChartData, categories, setCategories }}>
      {children}
    </ChartDataContext.Provider>
  );
}

// 4. 커스텀 훅 정의
export function useChartData(): ChartDataContextType {
  const context = useContext(ChartDataContext);
  if (!context) {
    throw new Error("useChartData must be used within a ChartDataProvider");
  }
  return context;
}