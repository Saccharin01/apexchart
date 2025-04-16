import React from "react";
import dynamic from "next/dynamic";
import { useEffect,useState } from "react";
import fetchData from "./FetchData/fetchData";
import { ProductDTO } from "@/shared/interface/Data.interface";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {ssr: false});



export default function Chart() {
  const [testSeries, setTestSeries] = useState<ApexAxisChartSeries>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const baseURL = process.env.NEXT_PUBLIC_REQUEST_BASE_URL;

  useEffect(() => {
    if (!baseURL) return;

    const loadData = async () => {
      try {
        const data: ProductDTO[] = await fetchData(baseURL, "/product/all");

        const names = data.map(item => item.name); // x축에 표시될 이름들
        const stock = data.map(item => item.stock);   // y축 값 (판매량, 예시)

        setCategories(names);
        setTestSeries([
          {
            name: "재고",
            data: stock,
          },
        ]);

      } catch (error) {
        console.error("데이터 패칭 실패:", error instanceof Error ? error.message : error);
        throw error;
      }
    };

    loadData();
  }, [baseURL]);

  const options: ApexCharts.ApexOptions = {
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: categories,
      tickAmount: categories.length,
      labels: {
        rotate: 0,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          xaxis: {
            tickAmount: 4,
            labels: {
              rotate: -45,
              trim: true,
            },
          },
        },
      },
    ],
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={testSeries}
        type="line"
        height={500}
      />
    </div>
  );
}