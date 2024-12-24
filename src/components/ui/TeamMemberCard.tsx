import { Linkedin, Twitter } from 'lucide-react';
import { TeamMember } from '../../types';

export default function TeamMemberCard({ name, role, image, linkedin, twitter }: TeamMember) {
  return (
    <div className="group relative rounded-lg overflow-hidden bg-dark-100">
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-dark-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
          <p className="text-[#0A45EC] mb-4">{role}</p>
          <div className="flex gap-4">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#0A45EC]"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {twitter && (
              <a
                href={twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#0A45EC]"
              >
                <Twitter className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}