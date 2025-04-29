"use client";

import SideMenu from "@/components/sideMenu/sideMenu";
import ChartComponent from "../components/chart";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <SideMenu />
      <main className="flex-1 ml-0 md:p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6">Hello World!</h1>
        <ChartComponent />
      </main>
    </div>
  );
}