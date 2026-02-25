"use client";

import { useState } from "react";

interface Props {
  image: string;
  Label: String;
}

const Genre = ({ image, Label }: Props) => {
  const [selected, setSelected] = useState(false);
  return (
    <div
      onClick={() => setSelected((prev) => !prev)}
      className="
    relative cursor-pointer
    w-32 h-32
    bg-[#212121] rounded-2xl
    shadow-[-6px_6px_0_rgba(0,0,0,0.6)]
    text-white
    flex-shrink-0
    hover:scale-105
    transition-all duration-300
  "
    >
      <img
        src={image}
        alt=""
        className="absolute left-0 bottom-0 w-9/10 rounded-2xl"
      />
      <span className="font-[Outfit] absolute right-1 text-lg">{Label}</span>
      <div
        className={`flex justify-center items-center absolute bottom-1 right-2 z-10 rounded-full border border-neutral-400 h-1/7 w-1/7 transition-all duration-300 ${selected ? "bg-[#16FF00] text-white" : "bg-black"}`}
      >
        {selected ? <img src="/checkmark.svg" alt="" className="h-4/5" /> : ""}
      </div>
    </div>
  );
};

export default Genre;
