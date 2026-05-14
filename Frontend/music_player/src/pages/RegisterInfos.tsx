import { useState, useEffect, type CSSProperties } from "react";
import { useTheme, useThemeUpdate } from "../context/ThemeProvider";
import Genre from "../components/ui/Genre";
import { useNavigate } from "react-router-dom";

import Piano from "../assets/piano.png";
import ElectricGuitar from "../assets/electricguitar.png";
import Microphone from "../assets/microphone.png";
import HipHop from "../assets/HipHop.png";
import Mic from "../assets/mic.png";
import Saxophone from "../assets/saxophone.png";
import Synthesizer from "../assets/Synthesizer.png";
import Maracas from "../assets/maracas.png";
import Oud from "../assets/Oud.png";
import Kpop from "../assets/kpop.png";
import Lofi from "../assets/lofi.png";
import DiscoBall from "../assets/discoball.png";

interface GenreItem {
  label: string;
  image: string;
}

type Direction = "forward" | "backward";
type PageIndex = 0 | 1 | 2;

const GENRES: GenreItem[] = [
  { label: "Classical", image: Piano },
  { label: "Rock", image: ElectricGuitar },
  { label: "Pop", image: Microphone },
  { label: "Hip-Hop", image: HipHop },
  { label: "Rap", image: Mic },
  { label: "Jazz", image: Saxophone },
  { label: "Electronic", image: Synthesizer },
  { label: "Latin", image: Maracas },
  { label: "Arabic", image: Oud },
  { label: "K-Pop", image: Kpop },
  { label: "Lo-Fi", image: Lofi },
  { label: "Funk", image: DiscoBall },
];

const Infos: React.FC = () => {
  const darkTheme = useTheme();
  const toggleDarkTheme = useThemeUpdate();
  const navigateRouter = useNavigate();

  const [username, setUsername] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<PageIndex>(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<Direction>("forward");
  const [visible, setVisible] = useState(true);
  const [errors, setErrors] = useState<{
    username?: string;
    birthDate?: string;
    genres?: string;
  }>({});
  const [shakeField, setShakeField] = useState<string | null>(null);

  const triggerShake = (field: string) => {
    setShakeField(field);
    setTimeout(() => setShakeField(null), 500);
  };

  const validatePage = (page: PageIndex): boolean => {
    if (page === 0) {
      const val = username.trim();
      if (!val) {
        setErrors({ username: "Username is required" });
        triggerShake("username");
        return false;
      }
      if (val.length < 3) {
        setErrors({ username: "At least 3 characters required" });
        triggerShake("username");
        return false;
      }
      if (!/^[a-zA-Z0-9_]+$/.test(val)) {
        setErrors({ username: "Only letters, numbers, and underscores" });
        triggerShake("username");
        return false;
      }
      setErrors({});
      return true;
    }

    if (page === 1) {
      if (!birthDate) {
        setErrors({ birthDate: "Please enter your date of birth" });
        triggerShake("birthDate");
        return false;
      }
      const age =
        (Date.now() - new Date(birthDate).getTime()) /
        (1000 * 60 * 60 * 24 * 365.25);
      if (age < 8) {
        setErrors({ birthDate: "You must be at least 8 years old" });
        triggerShake("birthDate");
        return false;
      }
      if (age > 120) {
        setErrors({ birthDate: "Please enter a valid date" });
        triggerShake("birthDate");
        return false;
      }
      setErrors({});
      return true;
    }

    if (page === 2) {
      if (selected.length < 2) {
        setErrors({ genres: "Please select at least 2 genres" });
        triggerShake("genres");
        return false;
      }
      setErrors({});
      return true;
    }

    return true;
  };

  const navigate = (targetPage: number) => {
    if (animating) return;
    if (targetPage > currentPage && !validatePage(currentPage)) return;

    setDirection(targetPage > currentPage ? "forward" : "backward");
    setAnimating(true);
    setVisible(false);

    setTimeout(() => {
      setCurrentPage(targetPage as PageIndex);
      setVisible(true);
      setTimeout(() => setAnimating(false), 350);
    }, 300);
  };

  const slideStyle: CSSProperties = {
    transition: "opacity 300ms ease, transform 300ms ease",
    opacity: visible ? 1 : 0,
    transform: visible
      ? "translateX(0)"
      : direction === "forward"
        ? "translateX(-40px)"
        : "translateX(40px)",
  };

  const inputBase = `w-full rounded-xl px-5 py-4 text-base font-[Outfit] outline-none
    transition-all duration-200 border
    ${darkTheme ? "bg-[#111] text-white" : "bg-[#f9f9f9] text-black"}`;

  const inputClass = (field: "username" | "birthDate") =>
    `${inputBase} ${
      errors[field]
        ? "border-red-500"
        : darkTheme
          ? "border-[#2d2d2d] focus:border-purple-500"
          : "border-gray-200 focus:border-purple-400"
    } ${shakeField === field ? "shake" : ""}`;

  const progressWidth = ((currentPage + 1) / 3) * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

        .scrollbar-purple::-webkit-scrollbar { width: 4px; }
        .scrollbar-purple::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-purple::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 4px; }

        .shake { animation: shake 0.4s ease; }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-6px); }
          40%      { transform: translateX(6px); }
          60%      { transform: translateX(-4px); }
          80%      { transform: translateX(4px); }
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: ${darkTheme ? "invert(1) opacity(0.4)" : "opacity(0.5)"};
          cursor: pointer;
        }
      `}</style>

      {/* Theme toggle */}
      <button
        onClick={toggleDarkTheme}
        className={`absolute right-4 top-4 z-10 px-4 py-2 rounded-full text-sm font-medium border
          ${
            darkTheme
              ? "bg-[#111] text-white border-purple-700 hover:border-purple-400"
              : "bg-white text-black border-purple-300 hover:border-purple-600"
          }
          transition-all`}
      >
        {darkTheme ? "☀️ Light" : "🌙 Dark"}
      </button>

      <div
        className={`${darkTheme ? "bg-[#0a0a0a] text-white" : "bg-white text-black"}
          min-h-screen flex flex-col justify-center items-center relative overflow-hidden font-[Outfit]`}
      >
        {/* Ambient glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-120px",
            right: "-120px",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Progress bar */}
        <div
          className={`absolute top-0 left-0 w-full h-[2px] ${darkTheme ? "bg-[#1a1a1a]" : "bg-gray-100"}`}
        >
          <div
            className="h-full bg-purple-600 transition-all duration-500"
            style={{ width: `${progressWidth}%` }}
          />
        </div>

        {/* Card container */}
        <div
          style={slideStyle}
          className={`w-full max-w-md px-8 py-10 rounded-2xl border
            ${
              darkTheme
                ? "bg-[#111] border-[#1f1f1f]"
                : "bg-white border-gray-100 shadow-sm"
            }
            flex flex-col gap-6 mx-4`}
        >
          {/* Step label */}
          <p className="text-xs tracking-widest font-semibold text-purple-500 uppercase">
            Step {currentPage + 1} of 3
          </p>

          {/* PAGE 0 — Username */}
          {currentPage === 0 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold leading-tight">
                  What's your <span className="text-purple-500">name?</span>
                </h1>
                <p
                  className={`text-sm ${darkTheme ? "text-gray-400" : "text-gray-500"}`}
                >
                  We'll use this to personalise your experience
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className={`text-xs font-medium tracking-wide ${darkTheme ? "text-gray-400" : "text-gray-500"}`}
                >
                  USERNAME
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrors({});
                  }}
                  className={inputClass("username")}
                  placeholder="e.g. john_doe"
                />
                {errors.username && (
                  <span className="text-red-500 text-xs flex items-center gap-1 mt-0.5">
                    ⚠ {errors.username}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* PAGE 1 — Birth Date */}
          {currentPage === 1 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold leading-tight">
                  Welcome, <span className="text-purple-500">{username}!</span>
                </h1>
                <p
                  className={`text-sm ${darkTheme ? "text-gray-400" : "text-gray-500"}`}
                >
                  Your birthday stays private — we use it for personalisation
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className={`text-xs font-medium tracking-wide ${darkTheme ? "text-gray-400" : "text-gray-500"}`}
                >
                  DATE OF BIRTH
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => {
                    setBirthDate(e.target.value);
                    setErrors({});
                  }}
                  className={inputClass("birthDate")}
                />
                {errors.birthDate && (
                  <span className="text-red-500 text-xs flex items-center gap-1 mt-0.5">
                    ⚠ {errors.birthDate}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* PAGE 2 — Genres */}
          {currentPage === 2 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold leading-tight">
                  Your <span className="text-purple-500">music taste</span>
                </h1>
                <p
                  className={`text-sm ${darkTheme ? "text-gray-400" : "text-gray-500"}`}
                >
                  Pick at least 2 genres you love
                </p>
              </div>

              {/* Selection count */}
              <p className="text-sm">
                <span className="text-purple-400 font-semibold">
                  {selected.length}
                </span>
                <span className={darkTheme ? "text-gray-500" : "text-gray-400"}>
                  {" "}
                  selected
                </span>
              </p>

              <div
                className={`grid grid-cols-3 md:grid-cols-4 gap-3 max-h-56 overflow-y-auto pr-1 scrollbar-purple
                  ${shakeField === "genres" ? "shake" : ""}`}
              >
                {GENRES.map((genre) => (
                  <Genre
                    key={genre.label}
                    image={genre.image}
                    Label={genre.label}
                    isSelected={selected.includes(genre.label)}
                    onToggle={() => {
                      setSelected((prev) =>
                        prev.includes(genre.label)
                          ? prev.filter((g) => g !== genre.label)
                          : [...prev, genre.label],
                      );
                      setErrors({});
                    }}
                  />
                ))}
              </div>

              {errors.genres && (
                <span className="text-red-500 text-xs flex items-center gap-1">
                  ⚠ {errors.genres}
                </span>
              )}
            </div>
          )}

          {/* Page indicator dots */}
          <div className="flex items-center justify-center gap-2 py-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                onClick={() => i < currentPage && navigate(i)}
                className={`h-2 rounded-full transition-all duration-300
                  ${
                    i === currentPage
                      ? "w-6 bg-purple-500"
                      : i < currentPage
                        ? "w-2 bg-red-500 cursor-pointer"
                        : "w-2 bg-gray-600"
                  }`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center">
            {currentPage > 0 ? (
              <button
                onClick={() => navigate(currentPage - 1)}
                className="px-6 py-2.5 rounded-full border border-purple-600 text-purple-500 text-sm font-semibold
                  hover:bg-purple-600 hover:text-white transition-all"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            {currentPage < 2 ? (
              <button
                onClick={() => navigate(currentPage + 1)}
                className="px-8 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-all"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={() => {
                  if (validatePage(2))
                    navigateRouter("/verify", { replace: true });
                }}
                className="px-8 py-2.5 rounded-full text-white text-sm font-semibold transition-all"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #dc2626)",
                }}
              >
                Finish ✓
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Infos;
