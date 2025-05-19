"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next/client";

import Profile from "@/components/Profile";

const Dashboard = () => {
  const [load, setLoad] = useState<boolean>(true);
  const text = "Loading...";
  const router = useRouter();

  useEffect(() => {
    const tokenCookie = getCookie("refreshToken");
    if (!tokenCookie) {
      router.push("/");
    } else {
      setLoad(false);
    }
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center relative">
      {!load ? (
        <Profile />
      ) : (
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
      )}
    </div>
  );
};

export default Dashboard;
