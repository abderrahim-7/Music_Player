import { useState } from "react";
import { LuColumns2 } from "react-icons/lu";

const SideBar = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className={`h-screen w-2/9 bg-gray-800 border border-neutral-600 rounded-r-2xl ${expanded ? "" : "w-16"} transition-all duration-300 flex flex-col`}
    >
      <div
        className={`h-10 w-full border-b border-neutral-600 rounded-tr-2xl flex items-center justify-end px-3 ${expanded ? "" : "justify-center px-0"}`}
      >
        <button onClick={() => setExpanded(!expanded)}>
          <LuColumns2 size={24} color="#525252" />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
