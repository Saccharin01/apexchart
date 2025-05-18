"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useChartData } from "@/app/hooks/ChartDataContext";
import dayjs from "dayjs";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function ChartComponent() {
  const { sensorData } = useChartData();

  console.log(sensorData)

  if (!sensorData || (Array.isArray(sensorData) && sensorData.length === 0)) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p className="text-gray-600 text-lg">데이터가 존재하지 않습니다</p>
      </div>
    );
  }

  let chartData: number[] = [];
  let categories: string[] = [];
  let isAggregated = false;

  if (Array.isArray(sensorData)) {
    isAggregated = true;
    chartData = sensorData.map((item) => item.averageValue);
    categories = sensorData.map(
      (item) => `${item.label}` // ✅ count 추가
    );
  } else {
    const sortedData = [...sensorData.data].sort(
      (a, b) =>
        new Date(a.sensedTime).getTime() - new Date(b.sensedTime).getTime()
    );
    chartData = sortedData.map((item) => item.sensedData);
    categories = sortedData.map((item) =>
      dayjs(item.sensedTime).format("HH:mm")
    );
  }

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: isAggregated ? "bar" : "line",
      zoom: {
        enabled: !isAggregated,
        type: "x",
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
        tools: {
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: categories,
      tickAmount: Math.min(categories.length, 30),
      labels: {
        rotate: 0,
      },
    },
    colors: isAggregated ? ["#22c55e"] : undefined, // ✅ 초록색 (Tailwind green-500)
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: { toolbar: { show: false } },
          xaxis: {
            tickAmount: 5,
            labels: { rotate: -45, trim: true },
          },
        },
      },
    ],
  };

  return (
    <div id="chart">
      <ReactApexChart
        key={isAggregated ? "bar" : "line"} // <- 렌더링 타입에 따라 고유 키 변경
        options={options}
        series={[
          { name: isAggregated ? "월별 평균" : "습도", data: chartData },
        ]}
        type={isAggregated ? "bar" : "line"}
        height={400}
      />
    </div>
  );
}
