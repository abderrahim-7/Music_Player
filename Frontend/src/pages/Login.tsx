import musicPlayerLogo from "../assets/logo.svg";
import googleLogo from "../assets/googleLogo.svg";
import { useTheme, useThemeUpdate } from "../context/ThemeProvider";
import { Link } from "react-router-dom";

const Login = () => {
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
        className={`${darkTheme ? "bg-black" : "bg-white"} min-h-screen flex items-center justify-center text-white`}
      >
        <div
          className={`w-[380px] ${darkTheme ? "bg-[#0B0B0B]" : "bg-[#f7f7f7]"} rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center`}
        >
          {/* Logo */}
          <img src={musicPlayerLogo} alt="logo" className="h-14 mb-6" />

          {/* Title */}
          <h1 className="font-[Outfit] text-2xl text-[#0F6292] mb-8">
            Sign in to your account
          </h1>

          {/* Form */}
          <form className="w-full flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className={`${darkTheme ? "bg-black" : "bg-white"} border border-neutral-700 rounded-lg px-4 py-3 
                       placeholder-neutral-500 focus:outline-none
                       focus:border-[#16FF00] transition`}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className={`${darkTheme ? "bg-black" : "bg-white"} border border-neutral-700 rounded-lg px-4 py-3 
                       placeholder-neutral-500 focus:outline-none
                       focus:border-[#16FF00] transition`}
              required
            />

            {/* Primary button */}
            <button
              type="submit"
              onSubmit={() => {}}
              className="mt-2 bg-[#0F6292] py-3 rounded-lg font-medium
                       hover:bg-[#0d537b] transition cursor-pointer font-[Outfit]"
            >
              Login
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-3">
              <div className="h-px bg-neutral-700 flex-1" />
              <span className="text-neutral-500 text-sm">or</span>
              <div className="h-px bg-neutral-700 flex-1" />
            </div>

            {/* Google button */}
            <button
              type="button"
              className={`flex items-center justify-center gap-3 py-3 rounded-lg
                       border border-neutral-700 ${darkTheme ? "hover:border-[#FFED00]" : "hover:border-[#ffbb00]"}
                       transition font-[Outfit]`}
            >
              <img src={googleLogo} alt="google" className="h-5" />
              <span
                className={`text-sm ${darkTheme ? "text-white" : "text-black"} cursor-pointer`}
              >
                Sign in with Google
              </span>
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-sm text-neutral-400">
            Don’t have an account?{" "}
            <Link to={"/register"}>
              <span
                className={`${darkTheme ? "text-[#FFED00]" : "text-[#ffbb00]"} hover:text-[#16FF00] cursor-pointer transition`}
              >
                Sign Up
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
