import { createSupabaseServerClient } from "@/lib/supabase-server-client";
import Chart from "./_components/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import PageRefresh from "./_components/page-refresh";

export default async function Dashboard() {
  const supabase = createSupabaseServerClient();

  let { data: sensorData } = await supabase
    .from("sensor_data")
    .select("*")
    .limit(30);

  const { data: imageData } = await supabase
    .from("images")
    .select("data")
    .order("created_at", { ascending: false })
    .limit(1);

  const { count: totalSensorDataSets } = await supabase
    .from("sensor_data")
    .select("id", { count: "exact" });

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

  let { data: stats } = await supabase
    .rpc("get_sensor_data_stats")
    .select("avg_temperature, avg_humidity, peak_temperature, peak_humidity")
    .single();

  return (
    <div className="flex flex-col gap-5 justify-stretch">
      <PageRefresh />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-stretch">
        <Card className="p-5 flex-1">
          <Chart data={humidity} />
        </Card>
        <Card className="p-5 flex-1">
          <Chart data={temperature} />
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 md:gap-5">
        <div className="flex flex-col gap-5 items-stretch justify-stretch">
          <div className="flex gap-5">
            <Card className="md:p-0 w-full">
              <CardHeader>
                <CardTitle>Sensor Data Points</CardTitle>
                <CardDescription>All Time</CardDescription>
              </CardHeader>
              <CardContent className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-500">
                {totalSensorDataSets}
              </CardContent>
            </Card>
            <Card className="md:p-0 w-full">
              <CardHeader>
                <CardTitle>Sensor Data Points</CardTitle>
                <CardDescription>Last 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-500">
                {totalSensorDataSets}
              </CardContent>
            </Card>
          </div>

          <Card className="md:p-0">
            <CardHeader>
              <CardTitle>Average Temperature</CardTitle>
              <CardDescription>In the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500">
              {stats?.avg_temperature.toFixed(2)} °C
            </CardContent>{" "}
          </Card>
          <Card className="md:p-0">
            <CardHeader>
              <CardTitle>Temperature Peak</CardTitle>
              <CardDescription>In the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500">
              {stats?.peak_temperature.toFixed(2)} °C
            </CardContent>
          </Card>
          <Card className="md:p-0">
            <CardHeader>
              <CardTitle>Average Humidity</CardTitle>
              <CardDescription>In the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {stats?.avg_humidity.toFixed(2)} %
            </CardContent>
          </Card>
          <Card className="md:p-0">
            <CardHeader>
              <CardTitle>Humidity Peak</CardTitle>
              <CardDescription>In the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {stats?.peak_humidity.toFixed(2)} %
            </CardContent>
          </Card>
        </div>
        <Card className="p-2 w-fit justify-center flex relative col-span-2">
          {imageData?.[0]?.data ? (
            <Image
              width={960}
              height={720}
              className="rounded-xl"
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
    </div>
  );
}
