"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

const Content = ({ skillData: initialSkillData, onUpdate }) => {
  const [skillData, setSkillData] = useState(() => {
    const savedData = localStorage.getItem("skillTestData");
    return savedData ? JSON.parse(savedData) : initialSkillData;
  });

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    rank: skillData.rank,
    percentile: skillData.percentile,
    correctAnswers: skillData.correctAnswers,
  });

  const [displayData, setDisplayData] = useState({
    rank: skillData.rank,
    percentile: skillData.percentile,
    correctAnswers: skillData.correctAnswers,
  });

  const [errors, setErrors] = useState({
    percentile: "",
    correctAnswers: "",
    rank: "",
  });

  useEffect(() => {
    localStorage.setItem("skillTestData", JSON.stringify(skillData));
  }, [skillData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!errors.percentile && !errors.correctAnswers && !errors.rank) {
      const updatedGraphData = [...skillData.graphData];
      const existingPointIndex = updatedGraphData.findIndex(
        (point) => point.percentile === formData.percentile
      );

      if (existingPointIndex === -1) {
        updatedGraphData.push({
          percentile: formData.percentile,
          students: Math.max(1, Math.floor(Math.random() * 10)),
        });
      }

      updatedGraphData.sort((a, b) => a.percentile - b.percentile);

      const updatedData = {
        ...formData,
        graphData: updatedGraphData,
      };

      setSkillData(updatedData);
      setDisplayData(formData);
      onUpdate(updatedData);
      setShowForm(false);
    }
  };

  const handleChange = (field, value) => {
    let error = "";

    if (field === "percentile") {
      if (value > 100) error = "Percentile cannot be greater than 100.";
      else if (value < 0) error = "Percentile cannot be negative.";
    } else if (field === "correctAnswers") {
      if (value > 15) error = "Correct answers cannot be greater than 15.";
      else if (value < 0) error = "Correct answers cannot be negative.";
    } else if (field === "rank") {
      if (!value) error = "Rank cannot be empty.";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid =
    formData.rank && !errors.percentile && !errors.correctAnswers;

  const studentDataPoint = skillData.graphData.find(
    (point) => point.percentile === skillData.percentile
  );

  return (
    <div className="p-6 max-w-6xl mx-auto flex-1">
      {/* Skill Test Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold">Hyper Text Markup Language</h3>
        <p className="text-sm text-gray-600">
          Questions: 08 | Duration: 15 mins | Submitted on 5 June 2021
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Update
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold">Update scores</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#1a237e] text-white flex items-center justify-center font-medium">
                  1
                </div>
                <div className="flex-1">
                  <label className="block mb-1">Update your Rank</label>
                  <input
                    type="text"
                    value={formData.rank}
                    onChange={(e) =>
                      handleChange("rank", parseInt(e.target.value) || "")
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  {errors.rank && (
                    <p className="text-red-500 text-sm mt-1">{errors.rank}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#1a237e] text-white flex items-center justify-center font-medium">
                  2
                </div>
                <div className="flex-1">
                  <label className="block mb-1">Update your Percentile</label>
                  <input
                    type="text"
                    value={formData.percentile}
                    onChange={(e) => {
                      const value = e.target.value.replace(/^0+/, "");
                      handleChange(
                        "percentile",
                        value ? parseInt(value, 10) : 0
                      );
                    }}
                    min="0"
                    max="100"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.percentile
                        ? "border-red-500 focus:ring-red-500"
                        : "focus:ring-blue-500"
                    }`}
                  />
                  {errors.percentile && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.percentile}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#1a237e] text-white flex items-center justify-center font-medium">
                  3
                </div>
                <div className="flex-1">
                  <label className="block mb-1">
                    Update your Current Score (out of 15)
                  </label>
                  <input
                    type="number"
                    value={formData.correctAnswers}
                    onChange={(e) =>
                      handleChange(
                        "correctAnswers",
                        parseInt(e.target.value, 10)
                      )
                    }
                    min="0"
                    max="15"
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                      errors.correctAnswers
                        ? "border-red-500 focus:ring-red-500"
                        : "focus:ring-blue-500"
                    }`}
                  />
                  {errors.correctAnswers && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.correctAnswers}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="px-6 py-2 bg-[#1a237e] text-white rounded-md flex items-center gap-2"
                >
                  Save <span className="ml-1">→</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats Display */}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 mt-6 bg-white p-6 rounded-lg shadow-md">
        <div className="w-full md:w-auto flex items-center mb-4 md:mb-0">
          <div className="flex justify-center w-16">
            <div className="w-8 h-8 rounded-full bg-[#1a237e] text-white flex items-center justify-center font-medium">
              1
            </div>
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-bold">Your Rank</h4>
            <p className="text-gray-600">{displayData.rank}</p>
          </div>
        </div>

        <div className="w-full md:w-auto flex items-center mb-4 md:mb-0 md:ml-14">
          <div className="flex justify-center w-16">
            <div className="w-8 h-8 rounded-full bg-[#1a237e] text-white flex items-center justify-center font-medium">
              2
            </div>
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-bold">Percentile</h4>
            <p className="text-gray-600">{displayData.percentile}%</p>
          </div>
        </div>

        <div className="w-full md:w-auto flex items-center md:ml-14">
          <div className="flex justify-center w-16">
            <div className="w-8 h-8 rounded-full bg-[#1a237e] text-white flex items-center justify-center font-medium">
              3
            </div>
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-bold">Correct Answers</h4>
            <p className="text-gray-600">{displayData.correctAnswers} / 15</p>
          </div>
        </div>
      </div>

      {/* Graph */}

      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-bold">Comparison Graph</h4>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={skillData.graphData}>
            <XAxis dataKey="percentile" />
            <YAxis type="number" domain={[0, "dataMax"]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="students"
              stroke="#8884d8"
              strokeWidth={2}
            />

            {studentDataPoint && (
              <ReferenceDot
                x={studentDataPoint.percentile}
                y={studentDataPoint.students}
                r={8}
                fill="#1a237e"
                stroke="#000"
                strokeWidth={0}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
        <p className="mt-4 text-sm">
          You scored {skillData.percentile}% percentile, which is{" "}
          {skillData.percentile < 72 ? "lower" : "higher"} than the average
          percentile of 72% among all the engineers who took this assessment.
        </p>
      </div>
    </div>
  );
};

export default Content;
