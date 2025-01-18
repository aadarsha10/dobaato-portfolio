import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Careers from "./pages/careers";
import Blog from "./pages/blog";
import ScrollToTop from "./components/ui/ScrollToTop";
import Admin from "./pages/admin";

export default function App() {
	return (
		<BrowserRouter>
			<div className="bg-dark-300 text-white">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/careers" element={<Careers />} />
					<Route path="/blog" element={<Blog />} />
					<Route path="/admin" element={<Admin />} />
				</Routes>
				<ScrollToTop />
			</div>
		</BrowserRouter>
	);
}
