"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import axiosInstance from "@/utils/axios";

interface FormDataPayload {
  email: string;
  password: string;
}

const Login = () => {
  const [formValues, setFormValues] = useState<FormDataPayload>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth", formValues);
      router.push(`/login/2fa?email=${formValues.email}`);
      toast.success(response.data.msg);
      setFormValues({
        email: "",
        password: "",
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center relative">
      <form
        onSubmit={handleSubmit}
        className="w-[500px] h-auto bg-[#ffffff40] flex flex-col items-center relative"
      >
        <h1 className="text-[36px] font-bold text-white my-[15px]">LogIn</h1>
        <input
          type="email"
          className="border border-white outline-none text-[16px] p-[6px] w-[60%] my-[6px]"
          placeholder="Email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className="border border-white outline-none text-[16px] p-[6px] w-[60%] my-[6px]"
          placeholder="Password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          required
        />
        <button
          className="text-white border-2 px-[30px] py-[8px] text-[18px] border-white cursor-pointer my-[20px] hover:bg-white hover:text-[#1cd8d2] transition-all"
          type="submit"
        >
          Submit
        </button>
      </form>
      <p className="absolute bottom-[20px] right-[30px] text-[14px] uppercase">
        NOT A MEMBER?{" "}
        <Link href="/signup" className="underline">
          SIGN UP
        </Link>
      </p>
    </div>
  );
};

export default Login;
