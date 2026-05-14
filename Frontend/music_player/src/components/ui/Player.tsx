import { useTheme } from "../../context/ThemeProvider";
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";

const Player = () => {
  const darkTheme = useTheme();

  const bg = darkTheme ? "bg-[#000000]" : "bg-white";
  const accent = "#16FF00";
  const secondary = "#0F6292";
  const yellow = darkTheme ? "#FFED00" : "#E6C200";

  return (
    <div
      className={`w-full h-24 ${bg} border-t border-[#0F6292] fixed bottom-0 left-0 flex items-center px-4 md:px-8`}
    >
      <div className="flex items-center gap-3 w-1/3 min-w-[120px]">
        <img
          src="https://picsum.photos/60"
          className="w-14 h-14 rounded-md object-cover"
          alt="album cover"
        />

        <div className="hidden sm:flex flex-col text-sm">
          <span
            className={`font-semibold ${
              darkTheme ? "text-white" : "text-black"
            }`}
          >
            Song Title
          </span>
          <span className="text-gray-400 text-xs">Artist Name</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-1/3 gap-2">
        <div className="flex items-center gap-6 text-lg">
          <button className="hover:scale-110 transition">
            <FaStepBackward color={secondary} />
          </button>

          <button
            className="w-10 h-10 flex items-center justify-center rounded-full transition hover:scale-110 ml-2"
            style={{ backgroundColor: accent }}
          >
            <FaPlay color="#000" />
          </button>

          <button className="hover:scale-110 transition">
            <FaStepForward color={secondary} />
          </button>
        </div>

        <div className="flex items-center gap-2 w-full max-w-md">
          <span className="text-xs text-gray-400">0:42</span>

          <div className="w-full h-1 bg-gray-600 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: "35%", backgroundColor: yellow }}
            />
          </div>

          <span className="text-xs text-gray-400">3:20</span>
        </div>
      </div>

      <div className="w-1/3 flex justify-end"></div>
    </div>
  );
};

export default Player;
