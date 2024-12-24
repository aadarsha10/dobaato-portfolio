import { Calendar, Clock } from 'lucide-react';
import type { BlogPost } from '../../types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-dark-100 rounded-lg overflow-hidden hover:bg-dark-200 transition-colors">
      <img 
        src={post.coverImage} 
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex gap-4 text-sm text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {post.readTime} min read
          </span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
        <p className="text-gray-400 mb-4">{post.excerpt}</p>
        <a 
          href={`/blog/${post.slug}`}
          className="text-[#0A45EC] hover:text-primary-400 font-medium"
        >
          Read More
        </a>
      </div>
    </article>
  );
}