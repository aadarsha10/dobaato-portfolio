import { useState } from 'react';
import { Search, Briefcase, MapPin, Clock } from 'lucide-react';
import { JobFilters } from './JobFilters';
import { JobCard } from './JobCard';
import { jobs } from '../../data/jobs';
import type { JobType, LocationType } from '../../types/careers';

export default function JobList() {
  const [filters, setFilters] = useState({
    type: [] as JobType[],
    location: [] as LocationType[],
  });
  
  const filteredJobs = jobs.filter(job => {
    if (filters.type.length && !filters.type.includes(job.type)) return false;
    if (filters.location.length && !filters.location.includes(job.location)) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <JobFilters filters={filters} setFilters={setFilters} />
        <div className="flex-1">
          <div className="grid gap-6">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}