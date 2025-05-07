import hourSelectorInterface from "./hourSelectorInterface";

export default function HourSelector({
  selectedHour,
  onChange,
}: hourSelectorInterface) {
  return (
    <label className="text-sm">
      기준 시간:
      <select
        className="text-black px-2 py-1 rounded"
        value={selectedHour}
        onChange={(e) => onChange(e.target.value)}
      >
        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
          <option key={hour} value={hour.toString().padStart(2, "0")}>
            {hour}시
          </option>
        ))}
      </select>
    </label>
  );
}
