import { Quote } from 'lucide-react';
import { Testimonial } from '../../types';

export default function TestimonialCard({ text, author, position, company }: Testimonial) {
  return (
    <div className="text-center">
      <Quote className="h-12 w-12 text-[#0A45EC] mx-auto mb-6" />
      <blockquote className="text-xl text-gray-300 mb-8">{text}</blockquote>
      <div>
        <cite className="not-italic">
          <span className="block text-white font-semibold text-lg">{author}</span>
          <span className="text-[#0A45EC]">
            {position} at {company}
          </span>
        </cite>
      </div>
    </div>
  );
}