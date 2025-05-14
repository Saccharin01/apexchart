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

  const [year, setYear] = useState("2020");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("00");
  const [direction, setDirection] = useState<Direction>("before");
  const [count, setCount] = useState(10);

  const buildSelectedDate = () => {
    switch (type) {
      case "year":
        return `${year}`;
      case "month":
      case "day":
      case "hour":
        return date;
      default:
        return "";
    }
  };

  const handleSearch = async () => {
    const selectedDate = buildSelectedDate();

    const query = queryStringBuilder({
      chipId,
      type,
      selectedDate,
      selectedHour: hour,
      direction,
      count,
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
          setDate("");
          setHour("00");
        }}
      />

      {/* 연도 타입일 때는 연도 선택 + 방향 + 개수만 노출 */}
      {type === "year" && (
        <>
          <label className="text-sm">
            연도:
            <select
              name="yearSelect"
              className="text-black px-2 py-1 rounded"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {Array.from({ length: 6 }, (_, i) => 2020 + i).map((y) => (
                <option key={y} value={y.toString()}>
                  {y}
                </option>
              ))}
            </select>
          </label>

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

      {/* 월/일/시간일 경우 날짜 선택 필드 + (hour 선택 필드) + 방향 + 개수 */}
      {["month", "day", "hour"].includes(type) && (
        <>
          <label className="text-sm">
            기준 날짜:
            <input
              name="indexDate"
              type={type === "month" ? "month" : "date"}
              className="text-black px-2 py-1 rounded"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          {type === "hour" && (
            <HourSelector selectedHour={hour} onChange={setHour} />
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
