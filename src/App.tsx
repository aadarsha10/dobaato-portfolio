import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { supabase } from "./SupabaseClient";
import Home from "./pages/Home";
import Careers from "./pages/careers";
import Blog from "./pages/blog";
import ScrollToTop from "./components/ui/ScrollToTop";
import Admin from "./pages/admin";
import Login from "./pages/Login/";
// import SignUp from "./components/SignUp";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const PublicRoute = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );

    useEffect(() => {
      const checkSession = async () => {
        const { data: sessionData } = await supabase.auth.getSession();
        setIsAuthenticated(!!sessionData.session); // True if session exists
      };

      checkSession();
    }, []);

    if (isAuthenticated === null) {
      return <div>Loading...</div>;
    }

    // If authenticated, redirect to /admin
    if (isAuthenticated) {
      return <Navigate to="/admin" />;
    }

    // If not authenticated, render the children (e.g., the Login component)
    return <>{children}</>;
  };

  const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    useEffect(() => {
      const checkSession = async () => {
        const { data: sessionData } = await supabase.auth.getSession();
        setIsAuthenticated(!!sessionData.session);
      };

      checkSession();
    }, []);

    if (isAuthenticated === null) {
      return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <div className="bg-dark-300 text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          //! Use this only if you want to create a new admin user
          {/* <Route path="/signup" element={<SignUp />} />  */}
        </Routes>
        <ScrollToTop />
      </div>
    </BrowserRouter>
  );
}
