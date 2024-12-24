export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
export type LocationType = 'On-site' | 'Remote' | 'Hybrid';

export interface Job {
  id: string;
  title: string;
  type: JobType;
  location: LocationType;
  description: string;
  requirements: string[];
  postedAt: string;
}