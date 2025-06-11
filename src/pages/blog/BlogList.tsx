import { BlogCard } from "./BlogCard";
import { useEffect, useState } from "react";
import { supabase } from "../../SupabaseClient";
import toast from "react-hot-toast";
import { BlogPost } from "../../types/blog";

export default function BlogList() {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBlogPosts = async () => {
			try {
				const { data, error } = await supabase.from("BlogPost").select("*").order('date', { ascending: false });
				if (error) {
					toast.error("Error fetching blog posts: " + error.message);
				} else {
					setPosts(data || []);
				}
			} catch (error) {
				toast.error("Error fetching blog posts");
				console.error('Error:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchBlogPosts();
	}, []);

	if (loading) {
		return (
			<div className="max-w-7xl mx-auto px-4 py-12">
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{[...Array(6)].map((_, i) => (
						<div key={i} className="animate-pulse">
							<div className="bg-gray-300 dark:bg-gray-700 h-48 rounded-lg mb-4"></div>
							<div className="space-y-2">
								<div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
								<div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
								<div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
								<div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	if (posts.length === 0) {
		return (
			<div className="max-w-7xl mx-auto px-4 py-12 text-center">
				<div className="text-gray-500 dark:text-gray-400">
					<h3 className="text-xl font-semibold mb-2">No blog posts yet</h3>
					<p>Check back later for new content!</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 py-12">
			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
				{posts.map((post) => (
					<BlogCard key={post.id} post={post} />
				))}
			</div>
		</div>
	);
}
