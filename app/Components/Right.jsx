import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import Image from "next/image";

const RightSide = ({ correctAnswers }) => {
  const totalQuestions = 15; // Total number of questions

  // Pie chart data
  const pieData = [
    { name: "Correct", value: correctAnswers },
    { name: "Incorrect", value: totalQuestions - correctAnswers },
  ];

  // Pie chart colors
  const COLORS = ["#007bff", "#e5e5e5"]; // Blue for correct, light gray for incorrect

  const syllabusProgress = [
    {
      title: "HTML Tools, Forms, History",
      percentage: 80,
      color: "bg-[#4578e8]",
      lightColor: "bg-[#4578e8]/10",
    },
    {
      title: "Tags & References in HTML",
      percentage: 60,
      color: "bg-[#ff9142]",
      lightColor: "bg-[#ff9142]/10",
    },
    {
      title: "Tables & References in HTML",
      percentage: 24,
      color: "bg-[#ff5a5a]",
      lightColor: "bg-[#ff5a5a]/10",
    },
    {
      title: "Tables & CSS Basics",
      percentage: 96,
      color: "bg-[#2ec971]",
      lightColor: "bg-[#2ec971]/10",
    },
  ];

  return (
    <div className="p-6 max-w-lg mx-auto flex-1">
      {/* Syllabus Progress */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-8">Syllabus Wise Analysis</h2>
        <div className="space-y-8">
          {syllabusProgress.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="text-[#1E1E1E] text-base">{item.title}</div>
              <div className="flex flex-grow">
                <div className="relative h-2 rounded-full w-full mt-2 mr-4">
                  {/* Background bar */}
                  <div
                    className={`absolute inset-0 ${item.lightColor} rounded-full`}
                  />
                  {/* Progress bar */}
                  <div
                    className={`absolute inset-y-0 left-0 ${item.color} rounded-full transition-all duration-300`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div
                  className={`text-right text-base font-bold`}
                  style={{
                    color: item.color.match(/\[(.*?)\]/)?.[1] || "#000",
                  }}
                >
                  {item.percentage}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-bold mb-4">Question Analysis</h4>
        <p className="text-sm text-gray-600 mb-4">
          You scored{" "}
          <span className="font-bold text-blue-600">
            {correctAnswers} questions
          </span>{" "}
          correct out of <span className="font-bold">{totalQuestions}</span>.
          However, it still needs some improvements.
        </p>

        <div className="relative flex justify-center items-center">
          <PieChart width={150} height={150}>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={75}
              startAngle={90}
              endAngle={-270}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>

          <div className="absolute w-10 h-10 flex justify-center items-center">
          <Image
              src="/assets/goal.png"
              alt="Target"
              width={150} 
              height={150}
              objectFit="contain" 
            />
          </div>
        </div>

        <p className="mt-2 text-sm text-center">
          Correct: {correctAnswers}, Incorrect:{" "}
          {totalQuestions - correctAnswers}
        </p>
      </div>
    </div>
  );
};

export default RightSide;

