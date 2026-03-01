import { useTheme, useThemeUpdate } from "@/context/ThemeProvider";
import React from "react";

const Player = () => {
  const darkTheme = useTheme();
  const toggleDarkTheme = useThemeUpdate();

  return (
    <>
      <button
        className={`absolute right-3 top-3 px-4 py-2 rounded-full ${!darkTheme ? "bg-gray-100" : "bg-gray-900"} ${!darkTheme ? "text-gray-800" : "text-gray-200"} shadow-lg hover:shadow-xl transition-shadow font-medium border ${!darkTheme ? "border-gray-300" : "border-gray-700"}`}
        onClick={toggleDarkTheme}
      >
        {darkTheme ? "☀️ Light" : "🌙 Dark"}
      </button>
      <div
        className={`w-full h-25 ${darkTheme ? "bg-[#0d537b]" : "bg-gray-200"} absolute bottom-0 left-0 flex items-center justify-center text-white font-medium`}
      >
        Player
      </div>
    </>
  );
};

export default Player;
