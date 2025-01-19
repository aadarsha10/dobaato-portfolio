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
			className="flex flex-col md:flex-row h-screen"
		>
			{/* Sidebar */}
			<div className="md:w-1/4 text-gray-800 dark:text-white border p-4 flex flex-col justify-start">
				<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

				<TabsList className="flex flex-col mt-40">
					<TabsTrigger value="careers" className="text-xl">
						Careers
					</TabsTrigger>
					<TabsTrigger value="portfolio" className="text-xl">
						Portfolio
					</TabsTrigger>
					<TabsTrigger value="faq" className="text-xl">
						FAQ
					</TabsTrigger>
					<TabsTrigger value="testimonials" className="text-xl">
						Testimonials
					</TabsTrigger>
					<TabsTrigger value="blog" className="text-xl">
						Blog
					</TabsTrigger>
				</TabsList>
			</div>

			{/* Main Content */}
			<div className="md:w-3/4 p-8">
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
