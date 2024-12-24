"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setMounted(true);
    const storedUserName = (typeof window !== "undefined" && localStorage.getItem("userName") )|| "Devang Tyagi";
    setUserName(storedUserName);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-between p-4 md:p-6 bg-white shadow-md">
      <h1 className="text-3xl font-bold">WhatBytes</h1>
      <div className="flex rounded-lg items-center p-2 bg-white border shadow-md">
        <Image
          src="/assets/image.jpg"
          alt="Profile Picture"
          width={30}
          height={30}
          className="rounded-full"
        />
        <span className="text-sm md:text-sm font-medium ml-2 md:ml-4">
          {userName}
        </span>
      </div>
    </div>
  );
};

export default Header;
