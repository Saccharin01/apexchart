"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useChartData } from "@/app/hooks/ChartDataContext";
import dayjs from "dayjs";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ChartComponent() {
  const { chartData, categories } = useChartData();

  // 데이터가 없거나 카테고리가 없는 경우
  if (!chartData.length || !categories.length) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p className="text-gray-600 text-lg">데이터가 존재하지 않습니다</p>
      </div>
    );
  }

  const formattedCategories = categories.map(time => dayjs(time).format("HH:mm"));
  const slicedData = chartData;
  const slicedCategories = formattedCategories;

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
      categories: slicedCategories,
      tickAmount: Math.min(slicedCategories.length, 30),
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
        series={[{ name: "습도", data: slicedData }]}
        type="line"
        height={400}
      />
    </div>
  );
}