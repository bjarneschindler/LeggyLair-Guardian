import Image from "next/image";

export default async function Dashboard() {
  return (
    <div className="">
      <Image src="/logo.jpeg" alt="Logo" width={148} height={148} />
    </div>
  );
}
