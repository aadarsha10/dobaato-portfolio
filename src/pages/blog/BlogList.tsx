import { BlogCard } from "./BlogCard";
import { useEffect, useState } from "react";
import { supabase } from "../../SupabaseClient";
import toast from "react-hot-toast";
import { BlogPost } from "../../types/blog";

export default function BlogList() {
	const [posts, setPost] = useState<BlogPost[]>([]);

	useEffect(() => {
		const fetchBlogPosts = async () => {
			const { data, error } = await supabase.from("BlogPost").select("*");
			if (error) {
				toast.error("Error fetching blog posts: " + error.message);
			} else {
				setPost(data);
			}
		};
		fetchBlogPosts();
	}, []);

	return (
		<div className="max-w-7xl mx-auto px-4 py-12">
			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{posts.map((post) => (
					<BlogCard key={post.id} post={post} />
				))}
			</div>
		</div>
	);
}
