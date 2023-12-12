import { createSupabaseServerClient } from "@/lib/supabase-server-client";
import Chart from "./_components/chart";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import PageRefresh from "./_components/page-refresh";

export default async function Dashboard() {
  const supabase = createSupabaseServerClient();

  let { data: sensorData } = await supabase
    .from("sensor_data")
    .select("*")
    .gte("created_at", new Date(Date.now() - 1000 * 60 * 5).toISOString());

  let { data: imageData } = await supabase
    .from("images")
    .select("data")
    .order("created_at", { ascending: false })
    .limit(1);

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
    <div className="flex flex-col gap-5 justify-stretch">
      <PageRefresh />
      <div className="flex gap-5 justify-stretch">
        <Card className="p-5 flex-1">
          <Chart data={humidity} />
        </Card>
        <Card className="p-5 flex-1">
          <Chart data={temperature} />
        </Card>
      </div>
      <Card className="p-10 justify-center flex relative">
        {imageData?.[0]?.data ? (
          <Image
            width={960}
            height={720}
            className="rounded-md"
            alt="The thing to be seen"
            src={`data:image/png;base64,${imageData?.[0]?.data}`}
          />
        ) : (
          <span className="flex justify-center p-20 text-3xl text-gray-100/10">
            No Image Data Available
          </span>
        )}
      </Card>
    </div>
  );
}
