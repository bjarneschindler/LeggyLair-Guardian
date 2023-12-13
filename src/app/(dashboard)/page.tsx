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
    .order("created_at", { ascending: false })
    .limit(30);

  const { data: imageData } = await supabase
    .from("images")
    .select("data, created_at")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  const { count: totalSensorDataSets } = await supabase
    .from("sensor_data")
    .select("id", { count: "exact" });

  if (!sensorData) sensorData = [];
  sensorData.reverse();

  const labels = sensorData.map(({ created_at }) => [
    new Date(created_at).toLocaleTimeString(),
    new Date(created_at).toLocaleDateString(),
  ]);

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
    .select("*")
    .single();

  return (
    <div className="flex flex-col gap-5 justify-stretch">
      <PageRefresh />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-stretch">
        <Card className="p-5 flex-1">
          <Chart data={humidity} />
        </Card>
        <Card className="p-5 flex-1">
          <Chart data={temperature} />
        </Card>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-5 xl:gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Card className="md:p-0 w-full col-span-1 sm:col-span-2">
            <CardHeader>
              <CardTitle>Last Update</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-cyan-800">
              {stats && new Date(stats?.latest_timestamp).toLocaleString()}
            </CardContent>
          </Card>
          <Card className="md:p-0 w-full">
            <CardHeader>
              <CardTitle>Sensor Data Points</CardTitle>
              <CardDescription>All Time</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-cyan-800">
              {totalSensorDataSets}
            </CardContent>
          </Card>
          <Card className="md:p-0 w-full">
            <CardHeader>
              <CardTitle>Sensor Data Points</CardTitle>
              <CardDescription>Last 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-cyan-800">
              {totalSensorDataSets}
            </CardContent>
          </Card>
          <Card className="md:p-0">
            <CardHeader>
              <CardTitle>∅ Temperature</CardTitle>
              <CardDescription>In the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              {stats?.avg_temperature.toFixed(2)} °C
            </CardContent>{" "}
          </Card>
          <Card className="md:p-0">
            <CardHeader>
              <CardTitle>Max Temperature</CardTitle>
              <CardDescription>In the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              {stats?.peak_temperature.toFixed(2)} °C
            </CardContent>
          </Card>
          <Card className="md:p-0">
            <CardHeader>
              <CardTitle>∅ Humidity</CardTitle>
              <CardDescription>In the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
              {stats?.avg_humidity.toFixed(2)} %
            </CardContent>
          </Card>
          <Card className="md:p-0">
            <CardHeader>
              <CardTitle>Max Humidity</CardTitle>
              <CardDescription>In the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
              {stats?.peak_humidity.toFixed(2)} %
            </CardContent>
          </Card>
        </div>
        <Card className="w-fit flex flex-col relative col-span-3 xl:col-span-2">
          <CardHeader>
            <CardTitle>Image Feed</CardTitle>
            <CardDescription>
              Last image captured:{" "}
              {imageData && new Date(imageData.created_at).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {imageData?.data ? (
              <Image
                width={1280}
                height={720}
                className="rounded-xl"
                alt="The thing to be seen"
                src={`data:image/png;base64,${imageData.data}`}
              />
            ) : (
              <span className="flex justify-center p-20 text-3xl text-gray-100/10">
                No Image Data Available
              </span>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
