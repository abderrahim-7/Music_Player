import LottieReact from "lottie-react";

const Lottie = (LottieReact as any).default ?? LottieReact;
import animationData from "../assets/SendEmail.json";
import { useTheme, useThemeUpdate } from "../context/ThemeProvider";

const VerifyEmail = () => {
  const darkTheme = useTheme();
  const toggleDarkTheme = useThemeUpdate();

  return (
    <>
      <button
        className={`absolute right-3 top-3 px-4 py-2 rounded-full ${
          darkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        } shadow-lg hover:shadow-xl transition`}
        onClick={toggleDarkTheme}
      >
        {darkTheme ? "☀️ Light" : "🌙 Dark"}
      </button>

      <div
        className={`min-h-screen flex flex-col items-center justify-center ${
          darkTheme ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <Lottie animationData={animationData} className="w-72 h-72" loop />

        <h1 className="text-2xl font-semibold mt-4">Check your inbox</h1>
        <p
          className={`text-sm mt-3 text-center max-w-xs ${darkTheme ? "text-gray-400" : "text-gray-500"}`}
        >
          We sent you a confirmation email. Please click the link inside to
          activate your account.
        </p>
      </div>
    </>
  );
};

export default VerifyEmail;
