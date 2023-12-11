"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart({ data }: { data: ChartData<"line"> }) {
  return (
    <Line
      options={{
        interaction: {
          mode: "index",
          intersect: false,
        },
        scales: {
          x: {
            grid: {
              color: "hsl(240 5.9% 15%)",
            },
          },
          y: {
            grid: {
              color: "hsl(240 5.9% 15%)",
            },
          },
        },
        elements: {
          line: {
            borderJoinStyle: "round",
          },
        },
        datasets: {
          line: {
            showLine: true,
            tension: 0.25,
          },
        },
        responsive: true,
      }}
      data={data}
    />
  );
}
