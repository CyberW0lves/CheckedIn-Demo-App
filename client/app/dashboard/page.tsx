import Profile from "@/components/Profile";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const cookieStore = cookies();
  const tokenCookie = (await cookieStore).get("refreshToken")?.value;
  if (!tokenCookie) redirect("/");

  return (
    <div className="w-screen h-screen flex items-center justify-center relative">
      <Profile />
    </div>
  );
};

export default Dashboard;
