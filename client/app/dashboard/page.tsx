"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import Profile from "@/components/Profile";

const Dashboard = () => {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = getCookie("refreshToken");
    console.log(token);

    // if (!token) {
    //   router.replace('/');
    // } else {
    //   setChecking(false);
    // }
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center relative">
      <Profile />
    </div>
  );
};

export default Dashboard;
