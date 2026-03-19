import {Briefcase, Clock, MapPin} from "lucide-react";
import type {Job} from "../../types/careers";
import {formatJobDescription} from "../../utils/formatters";

interface JobCardProps {
  job: Job;
}

export function JobCard({job}: JobCardProps) {
  return (
    <div className="bg-blue-100 dark:bg-[#1E293B]  rounded-lg p-6 hover:dark:bg-dark-200 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white font-domine">
            {job.title}
          </h3>
          <div className="flex gap-4 mt-2 text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              {job.type}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {job.postedAt}
            </span>
          </div>
        </div>
        <a
          href={`mailto: careers@dobaato.com?subject=${encodeURIComponent(
            job.title,
          )}`}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Apply Now
        </a>
      </div>
      <div className="mt-4 space-y-3 text-gray-600 dark:text-gray-400">
        {formatJobDescription(job.description).map((paragraph) => (
          <div key={paragraph.id}>
            {paragraph.lines.map((line, lineIdx) => (
              <div key={lineIdx}>{line}</div>
            ))}
          </div>
        ))}
      </div>
      {job.requirements && job.requirements.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-600">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 font-domine">
            Key Requirements ({job.requirements.length}):
          </h4>
          <ul className="space-y-2">
            {job.requirements.map((req, idx) => (
              <li
                key={idx}
                className="flex gap-2 text-sm text-gray-600 dark:text-gray-400"
              >
                <span className="text-primary-500 flex-shrink-0">✓</span>
                {req}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
