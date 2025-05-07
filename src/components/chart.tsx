"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useChartData } from "@/app/hooks/ChartDataContext";
import dayjs from "dayjs";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ChartComponent() {
  const { sensorData } = useChartData(); // 컨텍스트에서 전체 DTO 불러오기

  if (!sensorData || !sensorData.data.length) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p className="text-gray-600 text-lg">데이터가 존재하지 않습니다</p>
      </div>
    );
  }

  // 전송된 데이터 오름차순 정렬
  const sortedData = [...sensorData.data].sort((a, b) =>
    new Date(a.sensedTime).getTime() - new Date(b.sensedTime).getTime()
  );

  const chartData = sortedData.map((item) => item.sensedData);
  const categories = sortedData.map((item) =>
    dayjs(item.sensedTime).format("HH:mm")
  );

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      zoom: {
        enabled: true,
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
        options={options}
        series={[{ name: "습도", data: chartData }]}
        type="line"
        height={400}
      />
    </div>
  );
}