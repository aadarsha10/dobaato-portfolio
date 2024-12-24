import { BlogCard } from './BlogCard';
import { posts } from '../../data/posts';

export default function BlogList() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}