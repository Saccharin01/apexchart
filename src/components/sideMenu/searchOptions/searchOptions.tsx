"use client";

import { useState, useEffect } from "react";
import { useChartData } from "@/app/hooks/ChartDataContext";
import fetchData from "@/components/FetchData/fetchData";
import {
  SensorResponseDTO,
  AggregatedDataDTO,
} from "@/shared/interface/Data.interface";
import SearchOptionsProps from "./SearchOptionsProps";
import { Direction, Type } from "@/shared/static.types";
import UnitSelector from "./UnitSelector/unitSelector";
import HourSelector from "./HourSelector/hourSelector";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

export default function SearchOptions({ chipId }: SearchOptionsProps) {
  const { setSensorData } = useChartData();

  const [type, setType] = useState<Type>("year");
  const [year, setYear] = useState("2025");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState(""); // 기준 날짜 (일, 시)
  const [hour, setHour] = useState("00");
  const [weekOptions, setWeekOptions] = useState<string[]>([]);

  // 선택된 월(month) 기준 주차 계산
  useEffect(() => {
    if (type === "week" && month) {
      const start = dayjs(`${month}-01`);
      const end = start.endOf("month");

      const weeks: string[] = [];
      let current = start;

      while (current.isBefore(end) || current.isSame(end, "day")) {
        const startOfWeek = current.startOf("week");

        // ✅ 같은 월의 주차만 포함
        if (startOfWeek.month() === start.month()) {
          const isoDate = startOfWeek.format("YYYY-MM-DD");
          if (!weeks.includes(isoDate)) {
            weeks.push(isoDate);
          }
        }

        current = current.add(1, "week");
      }

      setWeekOptions(weeks);
      setDate(weeks[0]);
    }
  }, [type, month]);

  const buildSelectedDate = (): string => {
    switch (type) {
      case "year":
        return `${year}-01-01 00:00:00`;
      case "month":
        return `${month}-01 00:00:00`;
      case "week":
        return `${date} 00:00:00`;
      case "day":
        return `${date} 00:00:00`;
      case "hour":
        return `${date} ${hour}:00:00`;
      default:
        return "";
    }
  };

  const handleSearch = async () => {
    const selectedDate = buildSelectedDate();
    const baseURL = process.env.NEXT_PUBLIC_REQUEST_BASE_URL!;
    const query = new URLSearchParams({
      chipId,
      type,
      selectedDate,
    });

    try {
      const result = await fetchData<SensorResponseDTO | AggregatedDataDTO[]>(
        baseURL,
        `/sensor/units/aggregate?${query.toString()}`
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
          setMonth("");
        }}
      />

      {type === "year" && (
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
      )}

      {["month", "day", "hour"].includes(type) && (
        <label className="text-sm">
          기준 날짜:
          <input
            name="indexDate"
            type={type === "month" ? "month" : "date"}
            className="text-black px-2 py-1 rounded"
            value={type === "month" ? month : date}
            onChange={(e) =>
              type === "month"
                ? setMonth(e.target.value)
                : setDate(e.target.value)
            }
          />
        </label>
      )}

      {type === "hour" && (
        <HourSelector selectedHour={hour} onChange={setHour} />
      )}

      {type === "week" && (
        <>
          <label className="text-sm">
            기준 월:
            <input
              type="month"
              className="text-black px-2 py-1 rounded"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </label>

          <label className="text-sm">
            주차 선택:
            <select
              name="weekSelect"
              className="text-black px-2 py-1 rounded"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            >
              {weekOptions.map((d, idx) => (
                <option key={d} value={d}>
                  {dayjs(d).format("M월 ")}
                  {idx + 1}주차
                </option>
              ))}
            </select>
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
