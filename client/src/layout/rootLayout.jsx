import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

export default function RootLayout() {
  return (
    <div className="bg-[url('/bgImage.svg')] bg-contain">
      <Toaster />
      <Outlet />
    </div>
  );
}
