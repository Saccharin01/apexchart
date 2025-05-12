"use client";

import { useEffect, useState } from "react";
import { SensorUnitIds,SensorResponseDTO } from "@/shared/interface/Data.interface";
import fetchData from "../FetchData/fetchData";
import SensorIdButton from "./sensorIdButton/sensroIdButton";
import { useChartData } from "@/app/hooks/ChartDataContext";
import SearchOptions from "./searchOptions/searchOptions";

export default function SideMenu() {
  const { setSensorData } = useChartData();
  const [chipIds, setChipIds] = useState<string[]>([]);
  const [scrollIndex, setScrollIndex] = useState(0);
  const maxVisible = 3;

  const visibleChipIds = chipIds.slice(scrollIndex, scrollIndex + maxVisible);
  const canScrollUp = scrollIndex > 0;
  const canScrollDown = scrollIndex + maxVisible < chipIds.length;
  const [selectedChipId, setSelectedChipId] = useState<string>("");

  useEffect(() => {
    const fetchUnitIds = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_REQUEST_BASE_URL as string;
        const response = await fetchData<SensorUnitIds>(baseURL, "/sensor/units");
        setChipIds(response.chipIds);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUnitIds();
  }, []);

  const handleButtonClick = async (chipId: string) => {
    try {
      setSelectedChipId(chipId);
      const baseURL = process.env.NEXT_PUBLIC_REQUEST_BASE_URL!;
      const response = await fetchData<SensorResponseDTO>(
        baseURL,
        `/sensor/units/basic?chipId=${chipId}`
      );
      setSensorData(response);
    } catch (e) {
      console.error("차트 데이터 요청 실패:", e);
    }
  };

  return (
    <aside className="bg-gray-800 text-white p-4 w-64 h-screen flex flex-col gap-4">
      {/* 상단: 센서 유닛 버튼 영역 */}
      <div className="h-1/2 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-2">Sensor Units</h2>
          <div className="flex flex-col gap-2">
            {visibleChipIds.map((chipId) => (
              <SensorIdButton
                key={chipId}
                chipId={chipId}
                selected={chipId === selectedChipId}
                onSelect={handleButtonClick}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={() =>
              setScrollIndex((prev) => Math.max(prev - maxVisible, 0))
            }
            disabled={!canScrollUp}
            className={`px-2 py-1 rounded ${
              canScrollUp
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-600 opacity-50 cursor-not-allowed"
            }`}
          >
            ◀
          </button>
          <button
            onClick={() =>
              setScrollIndex((prev) =>
                Math.min(prev + maxVisible, chipIds.length - maxVisible)
              )
            }
            disabled={!canScrollDown}
            className={`px-2 py-1 rounded ${
              canScrollDown
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-600 opacity-50 cursor-not-allowed"
            }`}
          >
            ▶
          </button>
        </div>
      </div>

      {/* 하단: 검색 옵션 영역 */}
      <div className="h-1/2 flex flex-col justify-start">
        <h2 className="text-lg font-semibold mb-2">Search Options</h2>
        {selectedChipId.trim() !== "" && (
          <SearchOptions chipId={selectedChipId} />
        )}
      </div>
    </aside>
  );
}
