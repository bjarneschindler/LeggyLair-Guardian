export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen m-auto w-screen flex flex-col justify-center items-center">
      {children}
    </div>
  );
}
