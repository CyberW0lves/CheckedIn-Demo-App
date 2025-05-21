"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import axiosInstance from "@/utils/axios";

const TwoFactorAuth = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setEmail(new URLSearchParams(window.location.search).get("email"));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/2fa", { email, otp });
      router.push("/dashboard");
      setLoading(false);
      toast.success(response.data.msg);
      setOtp("");
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-screen h-screen flex flex-col items-center justify-center relative"
    >
      <p className="text-[28px] text-white font-bold">
        We’ve sent a 6-digit code to your email
      </p>
      <input
        type="text"
        name="otp"
        className="border-2 border-white outline-none text-[50px] tracking-[20px] font-bold px-[20px] text-center w-[350px] text-white my-[30px]"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      />

      <button className="btn my-[5px]" type="submit">
        {loading ? <span className="loader"></span> : "Verify"}
      </button>
    </form>
  );
};

export default TwoFactorAuth;
