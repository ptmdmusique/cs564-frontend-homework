"use client";

import { LoadingBar } from "@/components/LoadingBar";
import { useThroneData } from "@/contexts/throne-data-context";
import {
  ArcElement,
  ChartData,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";
import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import "./houses-page.scss";
import Head from "next/head";

ChartJS.register(ArcElement, Tooltip, Legend);

export const HousesPage = () => {
  const { data, isFetching } = useThroneData();
  const displayData = useMemo<ChartDataType>(() => {
    if (!data) {
      return { datasets: [] };
    }

    const houses = data.reduce<Record<string, number>>((acc, curData) => {
      const family = curData.family.toLowerCase().includes("house")
        ? curData.family
        : "Unknown";
      acc[family] ? acc[family]++ : (acc[family] = 1);
      return acc;
    }, {});

    return {
      labels: Object.keys(houses),
      datasets: [
        {
          label: "Members",
          data: Object.values(houses),
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    };
  }, [data]);

  return (
    <main className="houses-page">
      <Head>
        <title>My page title</title>
      </Head>

      <div className="content-container">
        <h1>House Information</h1>

        {isFetching ? (
          <LoadingBar />
        ) : (
          <div className="chart-container">
            <Doughnut
              aria-label="House Information"
              data={displayData}
              options={{
                color: `rgb(${getComputedStyle(document.body).getPropertyValue(
                  "--text-base",
                )})`,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { font: { size: 14 } },
                    title: { display: true, padding: 8 },
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
};

type ChartDataType = ChartData<"doughnut">;

const backgroundColors = [
  "rgba(54, 162, 235, 0.8)",
  "rgba(255, 206, 86, 0.8)",
  "rgba(255, 99, 132, 0.8)",
  "rgba(75, 192, 192, 0.8)",
  "rgba(153, 102, 255, 0.8)",
  "rgba(255, 159, 64, 0.8)",
  "rgba(199, 199, 199, 0.8)",
  "rgba(83, 102, 255, 0.8)",
  "rgba(40, 159, 64, 0.8)",
  "rgba(210, 199, 199, 0.8)",
  "rgba(78, 52, 199, 0.8)",
] as const;

const borderColors = [
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(255, 99, 132, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
  "rgba(159, 159, 159, 1)",
  "rgba(83, 102, 255, 1)",
  "rgba(40, 159, 64, 1)",
  "rgba(210, 199, 199, 1)",
  "rgba(78, 52, 199, 1)",
] as const;
