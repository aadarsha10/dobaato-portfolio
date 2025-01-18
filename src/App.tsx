import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ReactNode } from "react";
import Home from "./pages/Home";
import Careers from "./pages/careers";
import Blog from "./pages/blog";
import ScrollToTop from "./components/ui/ScrollToTop";
import Admin from "./pages/admin";
import Login from "./pages/Login/";

export default function App() {
	const ProtectedRoute = ({ children }: { children: ReactNode }) => {
		const isAuthenticated = localStorage.getItem("isAuthenticated");
		return isAuthenticated === "true" ? children : <Navigate to="/login" />;
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
					<Route path="/login" element={<Login />} />
				</Routes>
				<ScrollToTop />
			</div>
		</BrowserRouter>
	);
}
