"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import axiosInstance from "@/utils/axios";
import Profile from "@/components/Profile";

const Dashboard = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const text = "Loading...";

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axiosInstance.get("/users/me");
        setUserInfo(response.data.data);
        setLoading(false);
      } catch (error) {
        router.push("/");
      }
    };

    getUserInfo();
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center relative">
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0px); }
          30% { transform: translateY(-30px); }
          60% { transform: translateY(10px); }
        }
      `}</style>
          <div>
            {text.split("").map((char, index) => (
              <span
                key={index}
                className="inline-block text-[3rem] text-white"
                style={{
                  animation: "bounce 1s ease-in-out infinite",
                  animationDelay: `${(index + 1) * 0.1}s`,
                  transformOrigin: "bottom",
                  fontFamily: '"Sour Gummy", sans-serif',
                  fontOpticalSizing: "auto",
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <Profile userInfo={userInfo} />
      )}
    </div>
  );
};

export default Dashboard;
