import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Profile from "@/components/Profile";

const verifyIfUserAuthenticated = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken");
  if (!refreshToken) return redirect("/");
};

const Dashboard = async () => {
  await verifyIfUserAuthenticated();

  return (
    <div className="w-screen h-screen flex items-center justify-center relative">
      <Profile />
    </div>
  );
};

export default Dashboard;
