import {Search, SlidersHorizontal} from "lucide-react";
import {useEffect, useState} from "react";
import {supabase} from "../../SupabaseClient";
import type {Job, JobType, LocationType} from "../../types/careers";
import {JobCard} from "./JobCard";
import {JobFilters} from "./JobFilters";

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const {data, error} = await supabase.from("Job").select("*");

      if (error) {
        console.error("Error fetching jobs:", error);
        return;
      }

      setJobs(data);
    };

    fetchJobs();
  }, []);
  const [filters, setFilters] = useState({
    type: [] as JobType[],
    location: [] as LocationType[],
  });

  const activeFiltersCount = filters.type.length + filters.location.length;

  const filteredJobs = jobs.filter((job) => {
    if (filters.type.length && !filters.type.includes(job.type)) return false;
    if (filters.location.length && !filters.location.includes(job.location))
      return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesQuery =
        job.title.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q) ||
        job.requirements.some((requirement) =>
          requirement.toLowerCase().includes(q),
        );
      if (!matchesQuery) return false;
    }
    return true;
  });

  const clearFilters = () => {
    setFilters({type: [], location: []});
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/70 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white font-domine">
              Open Positions
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {filteredJobs.length} roles available across product, engineering,
              and design teams.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowMobileFilters((prev) => !prev)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-400 hover:text-sky-700 dark:border-slate-600 dark:text-slate-200 dark:hover:border-sky-500 dark:hover:text-sky-300 xl:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-700 dark:bg-sky-500/20 dark:text-sky-200">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        <div className="relative mt-4">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by role, skill, or keyword"
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-sky-500 dark:focus:ring-sky-500/20"
          />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[18rem_minmax(0,1fr)]">
        <div className={`${showMobileFilters ? "block" : "hidden"} xl:block`}>
          <div className="xl:sticky xl:top-28">
            <JobFilters
              filters={filters}
              setFilters={setFilters}
              onClearFilters={clearFilters}
              activeFiltersCount={activeFiltersCount}
            />
          </div>
        </div>

        <section className="space-y-5">
          {filteredJobs.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center dark:border-slate-600 dark:bg-slate-900/70">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 font-domine">
                No roles match your filters yet
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Clear current filters or adjust your search to discover more
                opportunities.
              </p>
              <button
                type="button"
                onClick={() => {
                  clearFilters();
                  setSearchQuery("");
                }}
                className="mt-4 inline-flex rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
              >
                Reset Filters
              </button>
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
