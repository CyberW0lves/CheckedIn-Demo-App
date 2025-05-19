import { cookies } from "next/headers";

import Profile from "@/components/Profile";

const verifyIfUserAuthenticated = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken");
};

const Dashboard = async () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center relative">
      <Profile />
    </div>
  );
};

export default Dashboard;
