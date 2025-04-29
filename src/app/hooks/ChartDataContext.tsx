"use client"

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { SensorResponseDTO } from "@/shared/interface/Data.interface";

interface ChartDataContextType {
  sensorData: SensorResponseDTO | null;
  setSensorData: (data: SensorResponseDTO) => void;
}

const ChartDataContext = createContext<ChartDataContextType | undefined>(undefined);

export const ChartDataProvider = ({ children }: { children: ReactNode }) => {
  const [sensorData, setSensorData] = useState<SensorResponseDTO | null>(null);

  return (
    <ChartDataContext.Provider value={{ sensorData, setSensorData }}>
      {children}
    </ChartDataContext.Provider>
  );
};

export const useChartData = () => {
  const context = useContext(ChartDataContext);
  if (!context) {
    throw new Error("useChartData must be used within a ChartDataProvider");
  }
  return context;
};