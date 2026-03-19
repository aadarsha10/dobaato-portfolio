import Navbar from "../../components/Navbar";
import Footer from "../../components/sections/Footer";
import JobList from "./JobList";

export default function Careers() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-[#F6F8FF] dark:bg-[#0A1326]">
        <div className="relative overflow-hidden border-b border-slate-200/70 bg-white/80 dark:border-slate-700/60 dark:bg-[#0E1A35]/70">
          <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-sky-300/40 blur-3xl dark:bg-sky-500/20" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-300/40 blur-3xl dark:bg-cyan-500/20" />
          <div className="container relative mx-auto px-6 py-14 md:py-20">
            <div className="max-w-3xl space-y-4">
              <p className="inline-flex rounded-full border border-sky-300/70 bg-sky-100/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200">
                Build The Future With Us
              </p>
              <h1 className="text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-5xl font-domine">
                Careers At Dobaato
              </h1>
              <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300 md:text-base">
                Explore impactful roles, discover teams that match your
                strengths, and apply through a smoother, detail-first hiring
                experience.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8 md:py-12">
          <JobList />
        </div>
      </main>
      <Footer />
    </>
  );
}
