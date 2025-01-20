import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../components/ui/tabs";

import CareersManager from "./careers-manager";
import PortfolioManager from "./portfolio-manager";
import FAQManager from "./faq-manager";
import TestimonialsManager from "./testimonials-manager";
import BlogManager from "./blog-manager";

export default function AdminPage() {
	return (
		<Tabs
			defaultValue="careers"
			className="flex flex-col md:flex-row h-screen "
		>
			{/* Sidebar */}
			<div className="md:w-1/5 text-gray-800 dark:text-white p-4 flex flex-col  border-r border-slate-300 justify-start">
				<h2 className="text-3xl font-bold mt-6 tracking-tight">
					Dashboard
				</h2>

				<TabsList className="flex flex-col items-start gap-2  mt-32">
					<TabsTrigger
						value="careers"
						className="text-xl transition-colors duration-200 hover:bg-gray-200 data-[state=active]:bg-gray-300"
					>
						Careers
					</TabsTrigger>
					<TabsTrigger
						value="portfolio"
						className="text-xl transition-colors duration-200 hover:bg-gray-200 data-[state=active]:bg-gray-300"
					>
						Portfolio
					</TabsTrigger>
					<TabsTrigger
						value="faq"
						className="text-xl transition-colors duration-200 hover:bg-gray-200 data-[state=active]:bg-gray-300"
					>
						FAQ
					</TabsTrigger>
					<TabsTrigger
						value="testimonials"
						className="text-xl transition-colors duration-200 hover:bg-gray-200 data-[state=active]:bg-gray-300"
					>
						Testimonials
					</TabsTrigger>
					<TabsTrigger
						value="blog"
						className="text-xl transition-colors duration-200 hover:bg-gray-200 data-[state=active]:bg-gray-300"
					>
						Blog
					</TabsTrigger>
				</TabsList>
			</div>

			{/* Main Content */}
			<div className="md:w-4/5 p-8 mt-14 ">
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
