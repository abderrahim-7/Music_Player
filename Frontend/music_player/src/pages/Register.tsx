import { Link, useNavigate } from "react-router-dom";
import { useTheme, useThemeUpdate } from "../context/ThemeProvider";
import Logo from "../assets/favicon.ico";
import GoogleIcon from "../assets/googleLogo.svg";
import { useState } from "react";
import { supabase } from "../api/supabase.ts";

const Register = () => {
  const darkTheme = useTheme();
  const toggleDarkTheme = useThemeUpdate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      navigate("/register/infos");
    }

    setLoading(false);
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const inputClass = `border rounded-lg px-4 py-3 bg-transparent
    ${
      darkTheme
        ? "border-white/20 text-white placeholder-white/40"
        : "border-black/20 text-black placeholder-black/40"
    }
    focus:outline-none focus:border-purple-500 transition`;

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
        className={`min-h-screen flex items-center justify-center ${
          darkTheme ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div
          className={`w-[380px] rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center ${
            darkTheme ? "bg-zinc-950" : "bg-zinc-50"
          }`}
        >
          <img src={Logo} alt="logo" className="h-14 mb-6" />
          <h1 className="text-2xl font-semibold mb-8">Create an account</h1>

          <form
            onSubmit={handleRegister}
            className="w-full flex flex-col gap-4"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClass}
              required
            />

            {error && (
              <p className="text-red-500 text-sm text-center">⚠ {error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-red-600 py-3 rounded-lg font-medium text-white
              hover:bg-red-700 transition cursor-pointer border-b-4 border-red-800
              disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Register"}
            </button>

            <div className="flex items-center gap-3 my-3">
              <div
                className={`h-px flex-1 ${darkTheme ? "bg-white/20" : "bg-black/20"}`}
              />
              <span className="text-sm opacity-60">or</span>
              <div
                className={`h-px flex-1 ${darkTheme ? "bg-white/20" : "bg-black/20"}`}
              />
            </div>

            <button
              type="button"
              onClick={handleGoogle}
              className={`flex items-center justify-center gap-3 py-3 rounded-lg border transition
              ${
                darkTheme
                  ? "border-white/20 hover:border-purple-500"
                  : "border-black/20 hover:border-purple-500"
              }`}
            >
              <img src={GoogleIcon} alt="google" className="h-5" />
              <span className="text-sm">Sign up with Google</span>
            </button>
          </form>

          <p className="mt-6 text-sm opacity-70">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-purple-500 hover:text-red-500 transition cursor-pointer">
                Sign In
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
