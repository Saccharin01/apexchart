import React from "react";
import unitSelectorInterface from "./unitSelectorInterface";


export default function UnitSelector({ type, setType, resetDate }: unitSelectorInterface) {

  return (
    <div className="text-sm flex flex-col gap-2">
      <span className="font-semibold">검색 단위:</span>
      <div className="flex gap-2">
        {(["year", "month", "day", "hour"] as const).map((unit) => (
          <button
            key={unit}
            onClick={() => {
              setType(unit);
              resetDate(); }}
            className={`px-2 py-1 rounded ${
              type === unit ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {{
              year: "연간",
              month: "월간",
              day: "일간",
              hour: "시간",
            }[unit]}
          </button>
        ))}
      </div>
    </div>
  );
}