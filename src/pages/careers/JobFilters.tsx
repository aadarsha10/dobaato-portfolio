import { Dispatch, SetStateAction } from 'react';
import { JobType, LocationType } from '../../types/careers';

interface FiltersState {
  type: JobType[];
  location: LocationType[];
}

interface JobFiltersProps {
  filters: FiltersState;
  setFilters: Dispatch<SetStateAction<FiltersState>>;
}

export function JobFilters({ filters, setFilters }: JobFiltersProps) {
  const jobTypes: JobType[] = ['Full-time', 'Part-time', 'Contract', 'Remote'];
  const locations: LocationType[] = ['On-site', 'Remote', 'Hybrid'];

  const toggleFilter = (category: keyof FiltersState, value: JobType | LocationType) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  return (
    <aside className="w-full md:w-64 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Job Type</h3>
        <div className="space-y-2">
          {jobTypes.map(type => (
            <label key={type} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.type.includes(type)}
                onChange={() => toggleFilter('type', type)}
                className="rounded border-gray-600 text-[#0A45EC] focus:ring-primary-500"
              />
              <span className="text-gray-400">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Location</h3>
        <div className="space-y-2">
          {locations.map(location => (
            <label key={location} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.location.includes(location)}
                onChange={() => toggleFilter('location', location)}
                className="rounded border-gray-600 text-[#0A45EC] focus:ring-primary-500"
              />
              <span className="text-gray-400">{location}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}