import Navbar from "../../components/Navbar";
import Footer from "../../components/sections/Footer";
import AdminPage from "./AdminPage";

export default function Admin() {
	return (
		<>
			<Navbar />
			<main className="pt-24 min-h-screen bg-[#F5F6FA] dark:bg-[#10172A]">
				<div className="container mx-auto px-6 text-gray-800 dark:text-white">
					<AdminPage />
				</div>
			</main>
			<Footer />
		</>
	);
}
