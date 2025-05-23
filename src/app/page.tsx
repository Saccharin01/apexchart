"use client";

import SideMenu from "@/components/sideMenu/sideMenu";
import ChartComponent from "../components/chart";
import { useChartData } from "@/app/hooks/ChartDataContext";
import type { SensorResponseDTO, AggregatedDataDTO } from "@/shared/interface/Data.interface";
import { ChartData } from "@/shared/static.types";


function isSensorResponseDTO(data: ChartData | null): data is SensorResponseDTO {
  return data !== null && !Array.isArray(data) && "name" in data;
}

export default function Home() {
  const { sensorData } = useChartData();

  return (
    <div className="flex min-h-screen">
      <SideMenu />
      <main className="flex-1 ml-0 md:p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-2">
          {isSensorResponseDTO(sensorData) ? sensorData.name : "Hello World!"}
        </h1>

        {isSensorResponseDTO(sensorData) && sensorData.location && (
          <p className="text-gray-500 mb-6">📍 {sensorData.location}</p>
        )}

        <div className="w-full h-96 bg-gray-100 rounded-lg shadow p-4">
          <ChartComponent />
        </div>
      </main>
    </div>
  );
}