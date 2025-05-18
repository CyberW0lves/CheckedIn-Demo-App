import Link from "next/link";

const Home = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col relative">
      <div className="flex items-center">
        <img
          src="/check-box.png"
          alt="checkbox"
          className="w-[60px] h-[60px]"
        />
        <p className="text-[60px] font-bold text-white ml-5">Checked In</p>
      </div>
      <p className="text-[13.5px] text-white mt-[-15px] mr-[-90px] uppercase">
        Welcome to network of professionals
      </p>
      <Link href="/signup">
        <button className="text-white border-2 px-[30px] py-[8px] text-[20px] border-white cursor-pointer mt-[30px] hover:bg-white hover:text-[#1cd8d2] transition-all">
          Join Now
        </button>
      </Link>
      <p className="absolute bottom-[20px] right-[30px] text-[14px] uppercase">
        ALREADY HAVE AN ACCOUNT?{" "}
        <Link href="/login" className="underline">
          LOGIN
        </Link>
      </p>
    </div>
  );
};

export default Home;
