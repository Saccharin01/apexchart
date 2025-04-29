"use client";

import sensorIdButtonInterface from "./sensorIdButtonInterface";

export default function SensorIdButton ({ chipId, onClick }: sensorIdButtonInterface) {
  return (
    <button
      onClick={() => onClick(chipId)}
      className="bg-gray-700 hover:bg-gray-600 p-2 rounded text-left"
    >
      {chipId}
    </button>
  );
}