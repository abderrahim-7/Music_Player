"use client";

import { useState, CSSProperties } from "react";
import { useTheme, useThemeUpdate } from "@/context/ThemeProvider";
import Genre from "@/components/Genre";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GenreItem {
  label: string;
  image: string;
}

type Direction = "forward" | "backward";
type PageIndex = 0 | 1 | 2;
type FormErrors = Partial<Record<PageIndex, string | null>>;

// ─── Component ────────────────────────────────────────────────────────────────

const Infos: React.FC = () => {
  const Genres: GenreItem[] = [
    { label: "Classical", image: "/piano.png" },
    { label: "Rock", image: "/electricguitar.png" },
    { label: "Pop", image: "/microphone.png" },
    { label: "Hip-Hop", image: "/HipHop.png" },
    { label: "Rap", image: "/mic.png" },
    { label: "Jazz", image: "/saxophone.png" },
    { label: "Electronic", image: "/Synthesizer.png" },
    { label: "Latin", image: "/maracas.png" },
    { label: "Arabic", image: "/Oud.png" },
    { label: "K-Pop", image: "/kpop.png" },
    { label: "Lo-Fi", image: "/lofi.png" },
    { label: "Funk", image: "/discoball.png" },
  ];

  const darkTheme = useTheme();
  const toggleDarkTheme = useThemeUpdate();

  const [username, setUsername] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [selected, setSelected] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState<PageIndex>(0);
  const [animating, setAnimating] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("forward");
  const [visible, setVisible] = useState<boolean>(true);

  const [errors, setErrors] = useState<FormErrors>({});

  // ─── Validators ─────────────────────────────────────────────────────────────

  const validateUsername = (): string | null => {
    const trimmed = username.trim();
    if (!trimmed) return "Username is required.";
    if (trimmed.length < 2) return "Username must be at least 2 characters.";
    if (trimmed.length > 30) return "Username must be at most 30 characters.";
    if (!/^[a-zA-Z0-9_ ]+$/.test(trimmed))
      return "Username can only contain letters, numbers, spaces, or underscores.";
    return null;
  };

  const validateBirthDate = (): string | null => {
    if (!birthDate) return "Date of birth is required.";
    const dob = new Date(birthDate);
    const today = new Date();
    if (isNaN(dob.getTime())) return "Please enter a valid date.";
    if (dob > today) return "Date of birth cannot be in the future.";
    const age: number = today.getFullYear() - dob.getFullYear();
    const m: number = today.getMonth() - dob.getMonth();
    const realAge: number =
      m < 0 || (m === 0 && today.getDate() < dob.getDate()) ? age - 1 : age;
    if (realAge < 6) return "You must be at least 6 years old.";
    if (realAge > 120) return "Please enter a valid date of birth.";
    return null;
  };

  const validateGenres = (): string | null => {
    if (selected.length < 2) return "Please select at least 2 genres.";
    return null;
  };

  // ─── Navigation ─────────────────────────────────────────────────────────────

  const navigate = (targetPage: number): void => {
    if (animating) return;

    if (targetPage > currentPage) {
      let error: string | null = null;
      if (currentPage === 0) error = validateUsername();
      if (currentPage === 1) error = validateBirthDate();
      if (currentPage === 2) error = validateGenres();

      if (error) {
        setErrors((prev) => ({ ...prev, [currentPage]: error }));
        return;
      }
    }

    setErrors({});
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
        ? "translateX(40px)"
        : "translateX(-40px)",
  };

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      <style>
        {`
          .scrollbar-black::-webkit-scrollbar {
            width: 8px;
          }
          .scrollbar-black::-webkit-scrollbar-track {
            background: transparent;
          }
          .scrollbar-black::-webkit-scrollbar-thumb {
            background: black;
            border-radius: 4px;
          }
          .scrollbar-black::-webkit-scrollbar-thumb:hover {
            background: #333;
          }

          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-6px); }
            40% { transform: translateX(6px); }
            60% { transform: translateX(-4px); }
            80% { transform: translateX(4px); }
          }
          .shake {
            animation: shake 0.4s ease;
          }
        `}
      </style>

      <button
        className={`absolute right-3 top-3 z-10 px-4 py-2 rounded-full ${
          !darkTheme ? "bg-gray-100" : "bg-gray-900"
        } ${
          !darkTheme ? "text-gray-800" : "text-gray-200"
        } shadow-lg hover:shadow-xl transition-shadow font-medium border ${
          !darkTheme ? "border-gray-300" : "border-gray-700"
        }`}
        onClick={toggleDarkTheme}
      >
        {darkTheme ? "☀️ Light" : "🌙 Dark"}
      </button>

      <div
        className={`${
          darkTheme ? "bg-black" : "bg-white"
        } min-h-screen flex justify-center items-center overflow-hidden`}
      >
        {/* Page 0 — Username */}
        {currentPage === 0 && (
          <div
            style={slideStyle}
            className="flex flex-col items-center justify-center h-screen gap-20 text-center w-full"
          >
            <h1 className="text-6xl font-bold text-[#0F6292]">
              What's Your Name
            </h1>
            <div className="flex flex-col items-center gap-2 w-80">
              <div className="relative w-full">
                <label
                  className={`absolute -top-3 left-4 ${
                    darkTheme ? "bg-black" : "bg-white"
                  } px-2 text-sm text-neutral-400`}
                >
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(e.target.value);
                    setErrors((prev) => ({ ...prev, 0: null }));
                  }}
                  className={`${darkTheme ? "bg-black" : "bg-white"} 
                  ${darkTheme ? "text-white" : "text-black"} 
                  border rounded-lg px-4 py-4 w-full text-xl font-[Outfit]
                  placeholder-neutral-500 focus:outline-none transition
                  ${
                    errors[0]
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#FFED00] focus:border-[#16FF00]"
                  }`}
                  placeholder="e.g. john_doe"
                  required
                />
              </div>
              {errors[0] && (
                <p className="shake text-red-500 text-sm font-[Outfit] self-start pl-1">
                  ⚠ {errors[0]}
                </p>
              )}
            </div>

            <button
              onClick={() => navigate(1)}
              className="absolute right-5 bottom-5 px-10 py-2 rounded-full bg-[#16FF00] text-black text-lg shadow-lg hover:shadow-xl transition-shadow font-medium font-[Outfit]"
            >
              Next
            </button>
          </div>
        )}

        {/* Page 1 — Birth Date */}
        {currentPage === 1 && (
          <div
            style={slideStyle}
            className="flex flex-col items-center justify-center h-screen gap-20 text-center w-full"
          >
            <h1 className="text-6xl font-bold text-[#0F6292]">
              {"Welcome " + username + " !"}
            </h1>
            <div className="flex flex-col items-center gap-2 w-80">
              <div className="relative w-full">
                <label
                  className={`absolute -top-3 left-4 ${
                    darkTheme ? "bg-black" : "bg-white"
                  } px-2 text-sm text-neutral-400`}
                >
                  Date of birth
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setBirthDate(e.target.value);
                    setErrors((prev) => ({ ...prev, 1: null }));
                  }}
                  className={`${darkTheme ? "bg-black" : "bg-white"} 
                  ${darkTheme ? "text-white" : "text-black"} 
                  border rounded-lg px-4 py-4 w-full text-xl font-[Outfit] transition
                  placeholder-neutral-500 focus:outline-none
                  ${
                    errors[1]
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#FFED00] focus:border-[#16FF00]"
                  }`}
                />
              </div>
              {errors[1] && (
                <p className="shake text-red-500 text-sm font-[Outfit] self-start pl-1">
                  ⚠ {errors[1]}
                </p>
              )}
            </div>

            <button
              onClick={() => navigate(2)}
              className="absolute font-[Outfit] right-5 bottom-5 px-10 py-2 rounded-full bg-[#16FF00] text-black text-lg shadow-lg hover:shadow-xl transition-shadow font-medium"
            >
              Next
            </button>
            <button
              onClick={() => navigate(0)}
              className="absolute font-[Outfit] left-5 bottom-5 px-10 py-2 rounded-full bg-[#16FF00] text-black text-lg shadow-lg hover:shadow-xl transition-shadow font-medium"
            >
              Previous
            </button>
          </div>
        )}

        {/* Page 2 — Genres */}
        {currentPage === 2 && (
          <div
            style={slideStyle}
            className="flex flex-col items-center h-screen py-10 text-center overflow-hidden w-full"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#0F6292] mb-2 px-4">
              What do you like to listen
            </h1>

            <div className="flex items-center gap-2 mb-6 h-6">
              {errors[2] ? (
                <p className="shake text-red-500 text-sm font-[Outfit]">
                  ⚠ {errors[2]}
                </p>
              ) : (
                <p
                  className={`text-sm font-[Outfit] ${
                    darkTheme ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  {selected.length === 0
                    ? "Pick at least 2 genres you enjoy"
                    : selected.length === 1
                      ? "1 selected — pick at least one more"
                      : `${selected.length} selected ✓`}
                </p>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-4 w-2/3 max-w-5xl pb-24 scrollbar-black">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Genres.map((genre: GenreItem) => (
                  <div
                    key={genre.label}
                    onClick={() => {
                      setErrors((prev) => ({ ...prev, 2: null }));
                      setSelected((prev) =>
                        prev.includes(genre.label)
                          ? prev.filter((g: string) => g !== genre.label)
                          : [...prev, genre.label],
                      );
                    }}
                  >
                    <Genre image={genre.image} Label={genre.label} />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate(3)}
              className="absolute font-[Outfit] right-5 bottom-5 px-10 py-2 rounded-full bg-[#16FF00] text-black text-lg shadow-lg hover:shadow-xl transition-shadow font-medium"
            >
              Next
            </button>
            <button
              onClick={() => navigate(1)}
              className="absolute font-[Outfit] left-5 bottom-5 px-10 py-2 rounded-full bg-[#16FF00] text-black text-lg shadow-lg hover:shadow-xl transition-shadow font-medium"
            >
              Previous
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Infos;
