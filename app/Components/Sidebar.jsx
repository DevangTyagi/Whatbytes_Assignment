import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-lg hidden md:block">
      <nav className="mt-8">
        <ul>
        <li className="py-4 px-6 font-semibold text-gray-700 rounded-full hover:bg-gray-200 hover:text-blue-700 cursor-pointer transition-all duration-200">
      Dashboard
    </li>
    <li className="py-4 px-6 font-semibold text-gray-700 rounded-full hover:bg-gray-200 hover:text-blue-700 cursor-pointer transition-all duration-200">
      Skill Test
    </li>
    <li className="py-4 px-6 font-semibold text-gray-700 rounded-full hover:bg-gray-200 hover:text-blue-700 cursor-pointer transition-all duration-200">
      Internship
    </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;