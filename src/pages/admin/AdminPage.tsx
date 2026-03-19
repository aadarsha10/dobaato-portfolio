import {
  BookOpen,
  Briefcase,
  FolderOpen,
  HelpCircle,
  Layers,
  LogOut,
  MessageSquare,
} from "lucide-react";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {supabase} from "../../SupabaseClient";
import BlogManager from "./blog-manager";
import CareersManager from "./careers-manager";
import CaseStudiesManager from "./case-studies-manager";
import FAQManager from "./faq-manager";
import PortfolioManager from "./portfolio-manager";
import TestimonialsManager from "./testimonials-manager";

export default function AdminPage() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const {error} = await supabase.auth.signOut();
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
      className="flex w-full flex-col gap-4 md:h-[calc(100vh-3rem)] md:flex-row md:items-stretch mt-2"
    >
      {/* Sidebar */}
      <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 text-gray-800 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80 dark:text-white md:flex md:h-full md:w-60 md:shrink-0 md:flex-col md:justify-between">
        <div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Manage all content sections from one place.
          </p>
          <TabsList className="mt-5 flex w-full flex-col items-start justify-start gap-1">
            <TabsTrigger
              value="careers"
              className="w-full rounded-lg text-start text-base transition-colors duration-200 hover:bg-primary-100 dark:hover:bg-slate-800 data-[state=active]:bg-primary-100 data-[state=active]:text-primary-900 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-white flex items-center justify-start gap-6 px-3"
            >
              <Briefcase className="h-5 w-5 flex-shrink-0" />
              Careers
            </TabsTrigger>
            <TabsTrigger
              value="portfolio"
              className="w-full rounded-lg text-base transition-colors duration-200 hover:bg-primary-100 dark:hover:bg-slate-800 data-[state=active]:bg-primary-100 data-[state=active]:text-primary-900 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-white flex items-center justify-start gap-6 px-3"
            >
              <FolderOpen className="h-5 w-5 flex-shrink-0" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger
              value="faq"
              className="w-full rounded-lg text-start text-base transition-colors duration-200 hover:bg-primary-100 dark:hover:bg-slate-800 data-[state=active]:bg-primary-100 data-[state=active]:text-primary-900 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-white flex items-center justify-start gap-6 px-3"
            >
              <HelpCircle className="h-5 w-5 flex-shrink-0" />
              FAQ
            </TabsTrigger>
            <TabsTrigger
              value="testimonials"
              className="w-full rounded-lg text-base transition-colors duration-200 hover:bg-primary-100 dark:hover:bg-slate-800 data-[state=active]:bg-primary-100 data-[state=active]:text-primary-900 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-white flex items-center justify-start gap-6 px-3"
            >
              <MessageSquare className="h-5 w-5 flex-shrink-0" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger
              value="blog"
              className="w-full rounded-lg text-base transition-colors duration-200 hover:bg-primary-100 dark:hover:bg-slate-800 data-[state=active]:bg-primary-100 data-[state=active]:text-primary-900 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-white flex items-center justify-start gap-6 px-3"
            >
              <BookOpen className="h-5 w-5 flex-shrink-0" />
              Blog
            </TabsTrigger>
            <TabsTrigger
              value="case-studies"
              className="w-full rounded-lg text-base transition-colors duration-200 hover:bg-primary-100 dark:hover:bg-slate-800 data-[state=active]:bg-primary-100 data-[state=active]:text-primary-900 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-white flex items-center justify-start gap-6 px-3"
            >
              <Layers className="h-5 w-5 flex-shrink-0" />
              Case Studies
            </TabsTrigger>
          </TabsList>
        </div>
        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="mt-6 w-full rounded-lg bg-red-500 py-2 text-white transition hover:bg-red-600 flex items-center justify-start gap-2 px-3"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50/60 p-2 dark:border-slate-700 dark:bg-slate-900/40 md:h-full md:overflow-y-auto">
        <TabsContent value="careers" className="mt-0 w-full space-y-4">
          <CareersManager />
        </TabsContent>
        <TabsContent value="portfolio" className="mt-0 w-full space-y-4">
          <PortfolioManager />
        </TabsContent>
        <TabsContent value="faq" className="mt-0 w-full space-y-4">
          <FAQManager />
        </TabsContent>
        <TabsContent value="testimonials" className="mt-0 w-full space-y-4">
          <TestimonialsManager />
        </TabsContent>
        <TabsContent value="blog" className="mt-0 w-full space-y-4">
          <BlogManager />
        </TabsContent>
        <TabsContent value="case-studies" className="mt-0 w-full space-y-4">
          <CaseStudiesManager />
        </TabsContent>
      </div>
    </Tabs>
  );
}
