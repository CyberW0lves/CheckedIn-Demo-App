"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import axiosInstance from "@/utils/axios";

const Profile = ({ userInfo }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete("/users/me");
      router.push("/");
      setLoading(false);
      toast.success(response.data.msg);
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      router.push("/");
      toast.success(response.data.msg);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <>
      <div className="flex w-full absolute top-0 left-0 h-[80px] justify-between items-center px-[10%]">
        <div className="flex items-center">
          <img
            src="/check-box.png"
            alt="checkbox"
            className="w-[30px] h-[30px]"
          />
          <p className="text-[30px] font-bold text-white ml-2">Checked In</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-white border-2 px-[30px] py-[8px] text-[16px] border-white cursor-pointer hover:bg-white hover:text-[#1cd8d2] transition-all"
        >
          Logout
        </button>
      </div>
      <div>
        <div className="w-[600px] h-auto bg-[#ffffff40] flex flex-col items-center relative">
          <h1 className="text-[36px] font-bold text-white my-[15px]">
            Profile
          </h1>
          <img
            src={userInfo.avatar}
            alt="Avatar"
            className="w-[80px] h-[80px] rounded-full object-cover cursor-pointer border-2 border-white p-[2px] mb-[20px]"
          />
          <div className="w-full px-[30px] flex justify-between py-[6px]">
            <input
              type="text"
              className="border border-white outline-none text-[16px] p-[6px] w-[48%]"
              placeholder="Name"
              name="name"
              defaultValue={userInfo.name}
              required
              disabled
            />
            <input
              type="email"
              className="border border-white outline-none text-[16px] p-[6px] w-[48%]"
              placeholder="Email"
              name="email"
              defaultValue={userInfo.email}
              required
              disabled
            />
          </div>
          <div className="w-full px-[30px] flex justify-between py-[6px] mb-[30px]">
            <input
              type="date"
              className="border border-white outline-none text-[16px] p-[6px] w-[48%]"
              name="dob"
              defaultValue={userInfo.dob}
              required
              disabled
            />
            <input
              type="text"
              className="border border-white outline-none text-[16px] p-[6px] w-[48%]"
              placeholder="Company"
              name="company"
              defaultValue={userInfo.company}
              required
              disabled
            />
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="btn my-[20px] text-red-500! border-red-500! w-[600px]! hover:bg-red-500! hover:text-[#1cd8d2]!"
        >
          {loading ? <span className="loader"></span> : "Delete Account"}
        </button>
      </div>
    </>
  );
};

export default Profile;
