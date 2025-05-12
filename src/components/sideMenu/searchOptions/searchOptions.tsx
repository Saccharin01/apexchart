"use client";

import { useState } from "react";
import { useChartData } from "@/app/hooks/ChartDataContext";
import fetchData from "@/components/FetchData/fetchData";
import { SensorResponseDTO } from "@/shared/interface/Data.interface";
import SearchOptionsProps from "./SearchOptionsProps";
import { queryStringBuilder } from "@/components/queryStringBuilder/queryStringBuilder";
import { Direction, Type } from "@/shared/static.types";
import UnitSelector from "./UnitSelector/unitSelector";
import HourSelector from "./HourSelector/hourSelector";

export default function SearchOptions({ chipId }: SearchOptionsProps) {
  const { setSensorData } = useChartData();

  const [type, setType] = useState<Type>("year");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("00");
  const [direction, setDirection] = useState<Direction>("before");
  const [count, setCount] = useState(10);

  const handleSearch = async () => {
    const query = queryStringBuilder({
      chipId,
      type,
      selectedDate: selectedDate,
      selectedHour: selectedHour,
      direction: direction,
      count: count,
    });

    try {
      const baseURL = process.env.NEXT_PUBLIC_REQUEST_BASE_URL!;
      const result = await fetchData<SensorResponseDTO>(
        baseURL,
        `/sensor/units/search?${query}`
      );
      setSensorData(result);
    } catch (e) {
      console.error("검색 실패:", e);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <UnitSelector
        type={type}
        setType={setType}
        resetDate={() => {
          setSelectedDate("");
          setSelectedHour("00");
        }}
      />

      {type === "year" && (
        <label className="text-sm">
          연도:
          <select
            name="yearSelect"
            className="text-black px-2 py-1 rounded"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            {Array.from({ length: 6 }, (_, i) => 2020 + i).map((y) => (
              <option key={y} value={y.toString()}>
                {y}
              </option>
            ))}
          </select>
        </label>
      )}

      {["month", "day", "hour"].includes(type) && (
        <>
          <label className="text-sm">
            기준 날짜:
            <input
              name="indexDate"
              type={type === "month" ? "month" : "date"}
              className="text-black px-2 py-1 rounded"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </label>

          {type === "hour" && (
            <HourSelector
              selectedHour={selectedHour}
              onChange={setSelectedHour}
            />
          )}

          <label className="text-sm">
            방향:
            <select
              name="ascDesc"
              className="text-black px-2 py-1 rounded"
              value={direction}
              onChange={(e) => setDirection(e.target.value as Direction)}
            >
              <option value="before">이전</option>
              <option value="after">이후</option>
            </select>
          </label>

          <label className="text-sm">
            데이터 개수:
            <input
              name="limit"
              type="number"
              min={1}
              max={100}
              className="text-black px-2 py-1 rounded"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            />
          </label>
        </>
      )}

      <button
        onClick={handleSearch}
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1 rounded"
      >
        검색
      </button>
    </div>
  );
}
