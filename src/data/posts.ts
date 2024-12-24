import type { BlogPost } from '../types/blog';

export const posts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Web Development: What to Expect in 2024',
    slug: 'future-web-development-2024',
    excerpt: 'Explore the upcoming trends and technologies shaping the future of web development...',
    content: '...',
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800',
    date: 'Mar 15, 2024',
    readTime: 5,
    author: {
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    },
  },
  {
    id: '2',
    title: 'Building Scalable Applications with Microservices',
    slug: 'scalable-applications-microservices',
    excerpt: 'Learn how to design and implement scalable applications using microservices architecture...',
    content: '...',
    coverImage: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=80&w=800',
    date: 'Mar 12, 2024',
    readTime: 8,
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    },
  },
];