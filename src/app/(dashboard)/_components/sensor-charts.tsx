"use client";

import { Card } from "@/components/ui/card";
import Chart from "./chart";
import { useEffect, useMemo, useState } from "react";
import { createSupabaseClientComponentClient } from "@/lib/supabase-client-component-client";

type SensorData = {
  created_at: string;
  humidity: number;
  temperature: number;
};

const temperatureDataSetBaseOptions = {
  label: "Temperature",
  borderColor: "hsl(221.2 83.2% 53.3%)",
  backgroundColor: "hsl(221.2 83.2% 53.3%)",
};

const humidityDataSetBaseOptions = {
  label: "Humidity",
  borderColor: "hsl(346.8 77.2% 65.8%)",
  backgroundColor: "hsl(346.8 77.2% 65.8%)",
};

const supabase = createSupabaseClientComponentClient();

export default function SensorCharts({
  initialSensorData,
}: {
  initialSensorData: SensorData[];
}) {
  const [sensorData, setSensorData] = useState(initialSensorData);

  useEffect(() => {
    const channel = supabase
      .channel("sensor_data")
      .on<SensorData>(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "sensor_data",
        },
        (payload) => {
          setSensorData((prev) => {
            if (prev.length >= 30) sensorData.shift();
            return [...prev, payload.new];
          });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [sensorData]);

  const labels = useMemo(
    () =>
      sensorData.map(({ created_at }) => [
        new Date(created_at).toLocaleTimeString(),
        new Date(created_at).toLocaleDateString(),
      ]),
    [sensorData]
  );

  const temperature = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          data: sensorData.map(({ temperature }) => temperature),
          ...temperatureDataSetBaseOptions,
        },
      ],
    };
  }, [sensorData, labels]);

  const humidity = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          data: sensorData.map(({ humidity }) => humidity),
          ...humidityDataSetBaseOptions,
        },
      ],
    };
  }, [sensorData, labels]);

  return (
    <>
      <Card className="p-5 flex-1">
        <Chart data={temperature} />
      </Card>
      <Card className="p-5 flex-1">
        <Chart data={humidity} />
      </Card>
    </>
  );
}
