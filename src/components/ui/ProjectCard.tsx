import { ExternalLink, Github } from "lucide-react";
import { Project } from "../../types";

export default function ProjectCard({
  title,
  description,
  image,
  demoUrl,
  githubUrl,
}: Project) {
  return (
    <div className="group relative rounded-lg overflow-hidden bg-gray-200 dark:bg-[#1E293B] ">
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        <div className="flex gap-4">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-500 dark:text-[#0A45EC] hover:text-primary-400"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
