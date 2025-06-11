import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Share2, BookmarkPlus, Eye } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/sections/Footer';
import { BlogPost } from '../../types/blog';
import { supabase } from '../../SupabaseClient';
import toast from 'react-hot-toast';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString; // Return original if parsing fails
    }
  };

  // Helper function to truncate text to specific word count
  const truncateToWords = (text: string, maxWords: number) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) {
      return text;
    }
    return words.slice(0, maxWords).join(' ') + '...';
  };

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!slug) return;
      
      try {
        // Fetch the blog post by slug from Supabase
        const { data, error } = await supabase
          .from('BlogPost')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error || !data) {
          toast.error('Blog post not found');
          setLoading(false);
          return;
        }

        setPost(data);

        // Fetch related posts (excluding current post)
        const { data: related } = await supabase
          .from('BlogPost')
          .select('*')
          .neq('slug', slug)
          .limit(3);

        setRelatedPosts(related || []);
      } catch (error) {
        toast.error('Error loading blog post');
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  // Update document title when post loads
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Dobaato Blog`;
    }
    return () => {
      document.title = 'Dobaato - Digital Solutions';
    };
  }, [post]);

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-24 min-h-screen bg-[#F5F6FA] dark:bg-inherit">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="pt-24 min-h-screen bg-[#F5F6FA] dark:bg-inherit">
          <div className="container mx-auto px-6 max-w-4xl text-center py-16">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Blog Post Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The blog post you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-[#F5F6FA] dark:bg-inherit">
        <article className="container mx-auto px-4 sm:px-6 max-w-4xl">{/* Improved responsive padding */}
          {/* Back to Blog */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-6 font-domine leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 font-manrope leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Share2 className="h-4 w-4" />
                Share Article
              </button>
             
            </div>
          </motion.header>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="text-gray-700 dark:text-gray-300 font-manrope leading-relaxed text-lg space-y-6">
                {post.content.split(/\n\s*\n/).filter(paragraph => paragraph.trim()).map((paragraph, index) => (
                  <p key={index} className="first:mt-0 text-justify">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>



            {/* Reading Progress */}
            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Reading Progress</span>
                <span>Estimated {post.readTime} minutes</span>
              </div>
            </div>
          </motion.div>

          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-gray-200 to-white dark:from-blue-900 dark:to-neutral-900 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-slate-500"
          >
            <div className="flex items-start gap-6">
              <img
                src={post.author.avatar || '/default-avatar.png'}
                alt={post.author.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/default-avatar.png';
                }}
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 font-domine">
                  {post.author.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-manrope">
                  {/* Dynamic author bio based on the author or default bio */}
                  {post.author.name ? 
                    `${post.author.name} is a passionate writer and technology enthusiast. They share insights on the latest trends in development, innovation, and digital transformation.` :
                    'Content writer and technology enthusiast. Passionate about sharing insights on the latest trends in web development and digital innovation.'
                  }
                </p>
              </div>
            </div>
          </motion.div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 font-domine">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 auto-rows-fr">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <article className="bg-gradient-to-br from-gray-200 to-white dark:from-blue-900 dark:to-neutral-900 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-500 hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] h-full flex flex-col">
                      <div className="p-2">
                        <img
                          src={relatedPost.coverImage}
                          alt={relatedPost.title}
                          className="w-full h-48 rounded-lg object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800';
                          }}
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(relatedPost.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {relatedPost.readTime} min read
                          </span>
                        </div>
                        
                        {/* Title with fixed word limit */}
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white font-domine mb-2 group-hover:text-blue-500 transition-colors leading-tight min-h-[3.5rem]">
                          {truncateToWords(relatedPost.title, 8)}
                        </h3>
                        
                        {/* Description with fixed word limit */}
                        <div className="flex-1 mb-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-manrope leading-relaxed min-h-[4rem]">
                            {truncateToWords(relatedPost.excerpt, 20)}
                          </p>
                        </div>
                        
                        <div className="mt-auto">
                          <span className="text-blue-500 hover:underline font-medium">
                            Read More
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-center text-white mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-domine">
              Stay Updated with Our Latest Insights
            </h2>
            <p className="text-blue-100 mb-6 font-manrope max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss out on the latest trends, 
              tips, and insights from the world of technology and development.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Eye className="h-4 w-4" />
              Explore More Articles
            </Link>
          </motion.div>
        </article>
      <Footer />

      </main>
    </>
  );
}
