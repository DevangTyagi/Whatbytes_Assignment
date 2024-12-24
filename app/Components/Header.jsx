import Image from "next/image";
const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 md:p-6 bg-white shadow-md">
      <h1 className="text-3xl font-bold">WhatBytes</h1>
      <div className="flex rounded-lg items-center p-2 bg-white border shadow-md ">
        <Image
          src="/assets/image.jpg"
          alt="Profile Picture"
          width={30}
          height={30}
          className="rounded-full"
        />

        <span className="text-sm md:text-sm font-medium ml-2 md:ml-4">
          Devang Tyagi
        </span>
      </div>
    </div>
  );
};

export default Header;
