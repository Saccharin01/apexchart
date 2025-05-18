"use client";

import React, { useMemo } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekday from "dayjs/plugin/weekday";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(isoWeek);
dayjs.extend(weekday);
dayjs.extend(advancedFormat);

interface WeekSelectorProps {
  year: number;
  month: number; // 1부터 시작 (예: 5월이면 5)
  selectedWeekDate: string;
  onChange: (value: string) => void;
}

export default function WeekSelector({
  year,
  month,
  selectedWeekDate,
  onChange,
}: WeekSelectorProps) {
  const options = useMemo(() => {
    const firstDay = dayjs(`${year}-${month.toString().padStart(2, "0")}-01`);
    const lastDay = firstDay.endOf("month");

    const weeks: { label: string; value: string }[] = [];
    let cursor = firstDay.startOf("week"); // 일요일 기준 시작
    let index = 1;

    while (cursor.isBefore(lastDay)) {
      const monday = cursor.isoWeekday(1); // 월요일
      const label = `${month}월 ${index}주차`;
      const value = monday.format("YYYY-MM-DD");
      weeks.push({ label, value });
      cursor = cursor.add(1, "week");
      index++;
    }

    return weeks;
  }, [year, month]);

  return (
    <label className="text-sm">
      주차 선택:
      <select
        name="weekSelect"
        className="text-black px-2 py-1 rounded"
        value={selectedWeekDate}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((week) => (
          <option key={week.value} value={week.value}>
            {week.label}
          </option>
        ))}
      </select>
    </label>
  );
}