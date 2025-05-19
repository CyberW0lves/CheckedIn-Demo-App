import Profile from "@/components/Profile";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const tokenCookie = getCookie("refreshToken");
  if (!tokenCookie) redirect("/");

  return (
    <div className="w-screen h-screen flex items-center justify-center relative">
      <Profile />
    </div>
  );
};

export default Dashboard;
