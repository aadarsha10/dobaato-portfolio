import {Briefcase, MapPin, Sparkles, X} from "lucide-react";
import {Dispatch, SetStateAction} from "react";
import {JobType, LocationType} from "../../types/careers";

interface FiltersState {
  type: JobType[];
  location: LocationType[];
}

interface JobFiltersProps {
  filters: FiltersState;
  setFilters: Dispatch<SetStateAction<FiltersState>>;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

export function JobFilters({
  filters,
  setFilters,
  onClearFilters,
  activeFiltersCount,
}: JobFiltersProps) {
  const jobTypes: JobType[] = ["Full-time", "Part-time", "Contract", "Remote"];
  const locations: LocationType[] = ["On-site", "Remote", "Hybrid"];

  const toggleFilter = (
    category: keyof FiltersState,
    value: JobType | LocationType,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  return (
    <aside className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/70 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">
            Smart Filters
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white font-domine">
            Refine Roles
          </h3>
        </div>
        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-600 dark:text-slate-200 dark:hover:text-white"
          >
            <X className="h-3 w-3" />
            Clear {activeFiltersCount}
          </button>
        )}
      </div>

      <div>
        <h4 className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
          <Briefcase className="h-4 w-4" />
          Job Type
        </h4>
        <div className="flex flex-wrap gap-2">
          {jobTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => toggleFilter("type", type)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                filters.type.includes(type)
                  ? "border-sky-500 bg-sky-500 text-white"
                  : "border-slate-300 text-slate-600 hover:border-sky-400 hover:text-sky-700 dark:border-slate-600 dark:text-slate-300 dark:hover:border-sky-500 dark:hover:text-sky-300"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
          <MapPin className="h-4 w-4" />
          Location
        </h4>
        <div className="flex flex-wrap gap-2">
          {locations.map((location) => (
            <button
              key={location}
              type="button"
              onClick={() => toggleFilter("location", location)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                filters.location.includes(location)
                  ? "border-sky-500 bg-sky-500 text-white"
                  : "border-slate-300 text-slate-600 hover:border-sky-400 hover:text-sky-700 dark:border-slate-600 dark:text-slate-300 dark:hover:border-sky-500 dark:hover:text-sky-300"
              }`}
            >
              {location}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-500/30 dark:bg-sky-500/10">
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 dark:text-sky-200">
          <Sparkles className="h-4 w-4" />
          Pro Tip
        </p>
        <p className="mt-2 text-xs leading-relaxed text-sky-700/80 dark:text-sky-100/80">
          Combine job type and location filters to quickly spot the roles that
          fit your preferred work style.
        </p>
      </div>
    </aside>
  );
}
