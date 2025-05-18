"use client";
import { useState, useRef, ChangeEvent, MouseEvent, FormEvent } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import axiosInstance from "@/utils/axios";

interface FormDataPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: string;
  company: string;
  avatar: File | null;
}

const SignUp = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<FormDataPayload>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    company: "",
    avatar: null,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormValues((prev) => ({ ...prev, avatar: file }));
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formValues.avatar)
      return toast.error("Please upload an avatar image!");

    if (formValues.password !== formValues.confirmPassword)
      return toast.error("Passwords do not match!");

    const payload = new globalThis.FormData();
    payload.append("name", formValues.name);
    payload.append("email", formValues.email);
    payload.append("password", formValues.password);
    payload.append("dob", formValues.dob);
    payload.append("company", formValues.company);
    payload.append("avatar", formValues.avatar);

    try {
      const response = await axiosInstance.post("/users", payload);
      router.push("/login");
      toast.success(response.data.msg);
      setFormValues({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        dob: "",
        company: "",
        avatar: null,
      });
      setPreview(null);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center relative">
      <form
        onSubmit={handleSubmit}
        className="w-[600px] h-auto bg-[#ffffff40] flex flex-col items-center relative"
      >
        <h1 className="text-[36px] font-bold text-white my-[15px]">SignUp</h1>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <img
          src={preview || "/user.png"}
          alt="Avatar"
          onClick={handleClick}
          className="w-[80px] h-[80px] rounded-full object-cover cursor-pointer border-2 border-white p-[2px] mb-[20px]"
        />
        <div className="w-full px-[30px] flex justify-between py-[6px]">
          <input
            type="text"
            className="border border-white outline-none text-[16px] p-[6px] w-[48%]"
            placeholder="Name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            className="border border-white outline-none text-[16px] p-[6px] w-[48%]"
            placeholder="Email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full px-[30px] flex justify-between py-[6px]">
          <input
            type="password"
            className="border border-white outline-none text-[16px] p-[6px] w-[48%]"
            placeholder="Password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            className="border border-white outline-none text-[16px] p-[6px] w-[48%]"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full px-[30px] flex justify-between py-[6px]">
          <input
            type="date"
            className="border border-white outline-none text-[16px] p-[6px] w-[48%]"
            name="dob"
            value={formValues.dob}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="border border-white outline-none text-[16px] p-[6px] w-[48%]"
            placeholder="Company"
            name="company"
            value={formValues.company}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="text-white border-2 px-[30px] py-[8px] text-[18px] border-white cursor-pointer my-[20px] hover:bg-white hover:text-[#1cd8d2] transition-all"
          type="submit"
        >
          Submit
        </button>
      </form>
      <p className="absolute bottom-[20px] right-[30px] text-[14px] uppercase">
        ALREADY HAVE AN ACCOUNT?{" "}
        <Link href="/login" className="underline">
          LOGIN
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
