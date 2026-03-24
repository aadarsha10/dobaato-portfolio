import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {Spinner} from "../../components/ui/spinner";
import {supabase} from "../../SupabaseClient";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return localStorage.getItem("theme") === "dark";
  });
  const navigate = useNavigate();

  useEffect(() => {
    const syncTheme = () => {
      const fromDom = document.documentElement.classList.contains("dark");
      const fromStorage = localStorage.getItem("theme") === "dark";
      setIsDark(fromDom || fromStorage);
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    window.addEventListener("storage", syncTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!username || !password) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    const {error} = await supabase.auth.signInWithPassword({
      email: username,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    } else {
      toast.success("Login successful!");
      navigate("/admin");
    }
  };

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden bg-transparent flex items-center justify-center transition-colors duration-300 `}
    >
      {/* Main content */}
      <div className="relative z-10 w-full max-w-md px-4">
        {/* Card container with backdrop blur */}
        <div
          className={`backdrop-blur-xl border rounded-2xl p-8 shadow-2xl transition-all duration-300 ${
            isDark ? "bg-dark-300/40 border-sky-500/20" : "bg-white"
          }`}
        >
          {/* Header */}
          <div className="mb-8">
            <h1
              className={`text-4xl font-bold bg-clip-text text-transparent mb-2 bg-gradient-to-r ${
                isDark
                  ? "from-sky-400 via-primary-500 to-sky-400"
                  : "from-primary-600 via-blue-600 to-primary-600"
              }`}
            >
              Admin Access
            </h1>
            <p
              className={`text-sm font-light ${
                isDark ? "text-gray-400" : "text-black"
              }`}
            >
              Sign in to manage your portfolio
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label
                className={`block text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder="admin@example.com"
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none placeholder-opacity-60 ${
                  isDark
                    ? `${
                        focusedField === "email"
                          ? "bg-dark-200/80 border-primary-500 shadow-lg shadow-primary-500/20 text-white placeholder-gray-500"
                          : "bg-dark-200/50 border-gray-600/30 hover:border-gray-600/50 text-white placeholder-gray-500"
                      }`
                    : `${
                        focusedField === "email"
                          ? "bg-white border-primary-500 shadow-lg shadow-primary-400/30 text-gray-900 placeholder-gray-600"
                          : "bg-blue-50/50 border-blue-200/60 hover:border-blue-300 text-gray-900 placeholder-gray-600"
                      }`
                }`}
                required
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                className={`block text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none placeholder-opacity-60 ${
                  isDark
                    ? `${
                        focusedField === "password"
                          ? "bg-dark-200/80 border-primary-500 shadow-lg shadow-primary-500/20 text-white placeholder-gray-500"
                          : "bg-dark-200/50 border-gray-600/30 hover:border-gray-600/50 text-white placeholder-gray-500"
                      }`
                    : `${
                        focusedField === "password"
                          ? "bg-white border-primary-500 shadow-lg shadow-primary-400/30 text-gray-900 placeholder-gray-600"
                          : "bg-blue-50/50 border-blue-200/60 hover:border-blue-300 text-gray-900 placeholder-gray-600"
                      }`
                }`}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-8 font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${
                isDark
                  ? "bg-gradient-to-r from-primary-500 to-sky-500 hover:from-primary-600 hover:to-sky-600 text-white shadow-lg shadow-primary-500/30"
                  : "bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white shadow-lg shadow-primary-500/25"
              }`}
            >
              {loading ? (
                <>
                  <Spinner />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Footer text */}
          <div
            className={`mt-6 text-center text-xs ${
              isDark ? "text-gray-500" : "text-gray-700"
            }`}
          >
            <p>Protected admin area</p>
          </div>
        </div>

        {/* Decorative elements */}
        <div
          className={`absolute top-0 left-0 w-32 h-32 rounded-full blur-2xl -z-10 ${
            isDark
              ? "bg-gradient-to-br from-primary-500/10 to-transparent"
              : "bg-gradient-to-br from-primary-300/20 to-transparent"
          }`}
        ></div>
        <div
          className={`absolute bottom-0 right-0 w-32 h-32 rounded-full blur-2xl -z-10 ${
            isDark
              ? "bg-gradient-to-tl from-sky-500/10 to-transparent"
              : "bg-gradient-to-tl from-blue-300/20 to-transparent"
          }`}
        ></div>
      </div>
    </div>
  );
}
