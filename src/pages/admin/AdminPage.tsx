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
		<>
			<div className=" flex-col md:flex">
				<div className="flex-1 space-y-4 p-8 pt-6">
					<div className="flex items-center justify-between space-y-2">
						<h2 className="text-3xl font-bold tracking-tight">
							Dashboard
						</h2>
					</div>
					<Tabs defaultValue="careers" className="space-y-4">
						<TabsList>
							<TabsTrigger value="careers">Careers</TabsTrigger>
							<TabsTrigger value="portfolio">
								Portfolio
							</TabsTrigger>
							<TabsTrigger value="faq">FAQ</TabsTrigger>
							<TabsTrigger value="testimonials">
								Testimonials
							</TabsTrigger>
							<TabsTrigger value="blog">Blog</TabsTrigger>
						</TabsList>
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
					</Tabs>
				</div>
			</div>
		</>
	);
}
