import type { Job } from '../types/careers';

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    type: 'Full-time',
    location: 'Remote',
    description: 'We are looking for an experienced Full Stack Developer to join our team...',
    requirements: [
      '5+ years of experience with React and Node.js',
      'Strong understanding of TypeScript',
      'Experience with cloud platforms (AWS/GCP)',
    ],
    postedAt: '2 days ago',
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    type: 'Full-time',
    location: 'Hybrid',
    description: 'Join our design team to create beautiful and intuitive user experiences...',
    requirements: [
      '3+ years of UX/UI design experience',
      'Proficiency in Figma and design systems',
      'Strong portfolio demonstrating user-centered design',
    ],
    postedAt: '1 week ago',
  },
];