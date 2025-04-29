"use client";

import { useEffect, useState } from "react";
import { SensorUnitIds,SensorResponseDTO } from "@/shared/interface/Data.interface";
import fetchData from "../FetchData/fetchData";
import SensorIdButton from "./sensorIdButton/sensroIdButton";
import { useChartData } from "@/app/hooks/ChartDataContext";


export default function SideMenu() {

  const { setSensorData } = useChartData();


  const [chipIds, setChipIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchUnitIds = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_REQUEST_BASE_URL!;
        const response = await fetchData<SensorUnitIds>(baseURL, "/sensor");
        setChipIds(response.chipIds);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUnitIds();
  }, []);

  const handleButtonClick = async (chipId: string) => {
    try {
      const baseURL = process.env.NEXT_PUBLIC_REQUEST_BASE_URL!;
      const response = await fetchData<SensorResponseDTO>(
        baseURL,
        `/sensor/data?chipId=${chipId}`
      );
        setSensorData(response);
      console.log(response)
    } catch (e) {
      console.error("차트 데이터 요청 실패:", e);
    }
  };

  return (
    <aside className="bg-gray-800 text-white p-4 w-64 h-screen">
      <h2 className="text-xl font-bold mb-4">Sensor Units</h2>
      <div className="flex flex-col gap-2">
        {chipIds.map((chipId) => (
          <SensorIdButton
            key={chipId}
            chipId={chipId}
            onClick={handleButtonClick}
          />
        ))}
      </div>
    </aside>
  );
}