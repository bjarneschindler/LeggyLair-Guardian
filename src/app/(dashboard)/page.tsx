import { createSupabaseServerClient } from "@/lib/supabase-server-client";
import Chart from "./_components/chart";
import { Card } from "@/components/ui/card";

export default async function Dashboard() {
  const supabase = createSupabaseServerClient();

  let { data: sensorData } = await supabase
    .from("sensor_data")
    .select("*")
    .gte("created_at", new Date(Date.now() - 1000 * 60 * 5).toISOString());

  if (!sensorData) sensorData = [];

  const labels = sensorData.map(({ created_at }) =>
    new Date(created_at).toLocaleTimeString()
  );

  const humidity = {
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

  const temperature = {
    labels,
    datasets: [
      {
        label: "Temperature",
        data: sensorData.map(({ temperature }) => temperature),
        borderColor: "hsl(221.2 83.2% 53.3%)",
        backgroundColor: "hsl(221.2 83.2% 53.3%)",
      },
    ],
  };

  return (
    <div className="flex gap-5 justify-stretch">
      <Card className="p-5 flex-1">
        <Chart data={humidity} />
      </Card>
      <Card className="p-5 flex-1">
        <Chart data={temperature} />
      </Card>
    </div>
  );
}
