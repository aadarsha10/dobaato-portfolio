import { useNavigate } from "react-router-dom";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../components/ui/tabs";
import { supabase } from "../../SupabaseClient";
import CareersManager from "./careers-manager";
import PortfolioManager from "./portfolio-manager";
import FAQManager from "./faq-manager";
import TestimonialsManager from "./testimonials-manager";
import BlogManager from "./blog-manager";
import toast from "react-hot-toast";

export default function AdminPage() {
	const navigate = useNavigate();

	const handleSignOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			toast.error("Sign out failed. Try again.");
		} else {
			toast.success("Signed out successfully!");
			navigate("/login");
		}
	};

	return (
		<Tabs
			defaultValue="careers"
			className="flex flex-col md:flex-row h-screen"
		>
			{/* Sidebar */}
			<div className="md:w-1/6 text-gray-800 dark:text-white p-2 flex gap-4 flex-col border-r border-slate-300 justify-between h-full">
				<div>
					<h2 className="text-3xl font-bold mt-6 tracking-tight">
						Dashboard
					</h2>
					<TabsList className="flex flex-col justify-start gap-1 items-start text mt-5">
						<TabsTrigger
							value="careers"
							className="text-base text-start w-full transition-colors rounded-lg duration-200 hover:bg-primary-200 data-[state=active]:bg-primary-100"
						>
							Careers
						</TabsTrigger>
						<TabsTrigger
							value="portfolio"
							className="text-base w-full  transition-colors rounded-lg duration-200 hover:bg-primary-200 data-[state=active]:bg-primary-100"
						>
							Portfolio
						</TabsTrigger>
						<TabsTrigger
							value="faq"
							className="text-bas text-start w-full  transition-colors rounded-lg  duration-200 hover:bg-primary-200 data-[state=active]:bg-primary-100"
						>
							FAQ
						</TabsTrigger>
						<TabsTrigger
							value="testimonials"
							className="text-base w-full  transition-colors rounded-lg  duration-200 hover:bg-primary-200 data-[state=active]:bg-primary-100"
						>
							Testimonials
						</TabsTrigger>
						<TabsTrigger
							value="blog"
							className="text-base w-full transition-colors rounded-lg  duration-200 hover:bg-primary-200 data-[state=active]:bg-primary-100"
						>
							Blog
						</TabsTrigger>
					</TabsList>
				</div>
				{/* Sign Out Button */}
				<button
					onClick={handleSignOut}
					className="w-full bg-red-400 text-white py-2 rounded hover:bg-red-600 mt-6"
				>
					Sign Out
				</button>
			</div>

			{/* Main Content */}
			<div className="md:w-4/5 p-2 overflow-scroll">
				<TabsContent value="careers" className="space-y-4">
					<CareersManager />
				</TabsContent>
				<TabsContent value="portfolio" className="space-y-4">
					<PortfolioManager />
				</TabsContent>
				<TabsContent value="faq" className="space-y-4">
					<FAQManager />
				</TabsContent>
				<TabsContent value="testimonials" className="space-y-4">
					<TestimonialsManager />
				</TabsContent>
				<TabsContent value="blog" className="space-y-4">
					<BlogManager />
				</TabsContent>
			</div>
		</Tabs>
	);
}
