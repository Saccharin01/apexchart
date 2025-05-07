"use client";

import SensorIdButtonInterface from "./sensorIdButtonInterface";

export default function SensorIdButton({ chipId, selected, onSelect }: SensorIdButtonInterface) {
  return (
    <button
      onClick={() => onSelect(chipId)}
      className={`w-full p-2 rounded text-center transition ${
        selected ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
      }`}
    >
      {chipId}
    </button>
  );
}