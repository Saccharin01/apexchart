"use client";

import { useEffect, useState } from "react";
import SensorUnitIds from "@/shared/interface/Data.interface";
import fetchData from "../FetchData/fetchData";

export default function SideMenu() {
  const [chipIds, setChipIds] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <aside className={`bg-gray-800 text-white p-4 w-64 transition-transform transform ${
      isMenuOpen ? "translate-x-0" : "-translate-x-full"
    } md:translate-x-0 fixed md:relative z-20`}>
      <h2 className="text-xl font-bold mb-4">Sensor Units</h2>
      <div className="flex flex-col gap-2">
        {chipIds.map((chipId) => (
          <button
            key={chipId}
            className="bg-gray-700 hover:bg-gray-600 p-2 rounded text-left"
          >
            {chipId}
          </button>
        ))}
      </div>
    </aside>
  );
}