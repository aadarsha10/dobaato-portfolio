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
      className="mt-2 flex w-full flex-col gap-4 md:h-[calc(100vh-3rem)] md:flex-row md:items-stretch"
    >
      {/* Sidebar */}
      <div className="rounded-2xl border border-slate-200 bg-white/85 p-3 text-gray-800 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80 dark:text-white sm:p-4 md:flex md:h-full md:w-60 md:shrink-0 md:flex-col md:justify-between">
        <div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            Dashboard
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Manage all content sections from one place.
          </p>
          <TabsList className="mt-5 flex w-full items-center justify-start gap-2 overflow-x-auto pb-1 md:flex-col md:items-start md:gap-1 md:overflow-visible md:pb-0">
            <TabsTrigger
              value="careers"
              className="flex shrink-0 items-center justify-start gap-3 rounded-lg px-3 text-sm text-start transition-colors duration-200 hover:bg-primary-100 dark:hover:bg-slate-800 md:w-full md:gap-6 md:text-base data-[state=active]:bg-primary-100 data-[state=active]:text-primary-900 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-white"
            >
              <Briefcase className="h-5 w-5 flex-shrink-0" />
              Careers
            </TabsTrigger>
            <TabsTrigger
              value="portfolio"
              className="flex shrink-0 items-center justify-start gap-3 rounded-lg px-3 text-sm transition-colors duration-200 hover:bg-primary-100 dark:hover:bg-slate-800 md:w-full md:gap-6 md:text-base data-[state=active]:bg-primary-100 data-[state=active]:text-primary-900 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-white"
            >
              <FolderOpen className="h-5 w-5 flex-shrink-0" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger
              value="faq"
              className="flex shrink-0 items-center justify-start gap-3 rounded-lg px-3 text-sm text-start transition-colors duration-200 hover:bg-primary-100 dark:hover:bg-slate-800 md:w-full md:gap-6 md:text-base data-[state=active]:bg-primary-100 data-[state=active]:text-primary-900 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-white"
            >
              <HelpCircle className="h-5 w-5 flex-shrink-0" />
              FAQ
            </TabsTrigger>
            <TabsTrigger
              value="testimonials"
              className="flex shrink-0 items-center justify-start gap-3 rounded-lg px-3 text-sm transition-colors duration-200 hover:bg-primary-100 dark:hover:bg-slate-800 md:w-full md:gap-6 md:text-base data-[state=active]:bg-primary-100 data-[state=active]:text-primary-900 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-white"
            >
              <MessageSquare className="h-5 w-5 flex-shrink-0" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger
              value="blog"
              className="flex shrink-0 items-center justify-start gap-3 rounded-lg px-3 text-sm transition-colors duration-200 hover:bg-primary-100 dark:hover:bg-slate-800 md:w-full md:gap-6 md:text-base data-[state=active]:bg-primary-100 data-[state=active]:text-primary-900 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-white"
            >
              <BookOpen className="h-5 w-5 flex-shrink-0" />
              Blog
            </TabsTrigger>
            <TabsTrigger
              value="case-studies"
              className="flex shrink-0 items-center justify-start gap-3 rounded-lg px-3 text-sm transition-colors duration-200 hover:bg-primary-100 dark:hover:bg-slate-800 md:w-full md:gap-6 md:text-base data-[state=active]:bg-primary-100 data-[state=active]:text-primary-900 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-white"
            >
              <Layers className="h-5 w-5 flex-shrink-0" />
              Case Studies
            </TabsTrigger>
          </TabsList>
        </div>
        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-white transition hover:bg-red-600 md:mt-6 md:justify-start"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50/60 p-2 sm:p-3 dark:border-slate-700 dark:bg-slate-900/40 md:h-full md:overflow-y-auto">
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
