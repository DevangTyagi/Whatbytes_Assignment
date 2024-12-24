"use client";

import React, { useState } from "react";
import Sidebar from "./Components/Sidebar"; // Import Sidebar component
import Header from "./Components/Header"; // Import Header component
import Content from "./Components/Content"; // Import Content component
import RightSide from "./Components/Right"; // Import RightSide component

const Home = () => {
  const [skillData, setSkillData] = useState({
    rank: 4,
    percentile: 90,
    correctAnswers: 12,
    graphData: [
      { percentile: 0, students: 2 },
      { percentile: 25, students: 8 },
      { percentile: 50, students: 15 },
      { percentile: 72, students: 20 },
      { percentile: 90, students: 4 },
      { percentile: 100, students: 1 },
    ],
  });

  const handleUpdate = (newData) => {
    setSkillData((prevState) => ({
      ...prevState,
      ...newData,
    }));
  };

  return (
    <div className="flex-1">
      <Header />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col md:flex-row">
          <Content skillData={skillData} onUpdate={handleUpdate} />
          <RightSide correctAnswers={skillData.correctAnswers} />
        </div>
      </div>
    </div>
  );
};

export default Home;
