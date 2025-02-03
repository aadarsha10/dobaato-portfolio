import Footer from "../../components/sections/Footer";
import AdminPage from "./AdminPage";

export default function Admin() {
	return (
		<>
			<main className=" min-h-screen bg-[#F5F6FA] dark:bg-[#10172A]">
				<div className="container mx-5 text-gray-800 dark:text-white">
					<AdminPage />
				</div>
			</main>
			<Footer />
		</>
	);
}
