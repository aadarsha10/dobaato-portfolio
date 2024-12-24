import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../../types';

export default function ProjectCard({ title, description, image, demoUrl, githubUrl }: Project) {
  return (
    <div className="group relative rounded-lg overflow-hidden bg-dark-100">
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex gap-4">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#0A45EC] hover:text-primary-400"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Demo</span>
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#0A45EC] hover:text-primary-400"
            >
              <Github className="h-4 w-4" />
              <span>Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}