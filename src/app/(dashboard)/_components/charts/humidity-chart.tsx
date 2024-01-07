"use client";

import { ChartData } from "chart.js";
import Chart from "../chart";
import { createSupabaseClientComponentClient } from "@/lib/supabase-client-component-client";
import { useEffect, useMemo, useState } from "react";

const supabase = createSupabaseClientComponentClient();

export default function HumidityChart({
  initialData,
}: {
  initialData: { created_at: string; humidity: number }[];
}) {
  const [sensorData, setSensorData] = useState(initialData);

  const labels = useMemo(() => {
    return sensorData.map(({ created_at }) => [
      new Date(created_at).toLocaleDateString(),
      new Date(created_at).toLocaleTimeString(),
    ]);
  }, [sensorData]);

  useEffect(() => {
    const channel = supabase
      .channel("sensor_data")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          table: "sensor_data",
        },
        () => {}
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const humidityData: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: "Humidity",
        data: sensorData.map(({ humidity }) => humidity),
        borderColor: "hsl(346.8 77.2% 65.8%)",
        backgroundColor: "hsl(346.8 77.2% 65.8%)",
      },
    ],
  };

  return <Chart data={humidityData} />;
}
