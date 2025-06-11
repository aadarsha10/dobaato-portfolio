import { Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../../types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  // Helper function to format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString; // Return original if parsing fails
    }
  };

  // Helper function to count words
  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  // Helper function to truncate text to specific word count
  const truncateToWords = (text: string, maxWords: number) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) {
      return text;
    }
    return words.slice(0, maxWords).join(' ') + '...';
  };

  return (
    <Link to={`/blog/${post.slug}`}>
      <article className="bg-gradient-to-br from-gray-200 to-white dark:from-blue-900 dark:to-neutral-900 text-gray-900 dark:text-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg border border-gray-200 dark:border-slate-500 transition-shadow h-full flex flex-col">
        <div className="p-2">
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-48 rounded-lg object-cover transition-transform group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800';
            }}
          />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime} min read
            </span>
          </div>
          
          {/* Title with word count - fixed to 8 words max */}
          <div className="mb-2">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white font-domine leading-tight min-h-[3.5rem]">
              {truncateToWords(post.title, 8)}
            </h3>
          
          </div>
          
          {/* Description with word count - fixed to 20 words max */}
          <div className="flex-1 mb-4">
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 font-manrope min-h-[4rem]">
              {truncateToWords(post.excerpt, 20)}
            </p>
          </div>
          {/* Read more link */}
          <div className="mt-auto">
            <span className="text-blue-500 hover:underline font-medium">
              Read More
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}