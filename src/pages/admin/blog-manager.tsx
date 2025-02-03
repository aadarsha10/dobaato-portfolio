import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { supabase } from "../../SupabaseClient";
import { v4 as uuid } from "uuid";
import { BlogPost } from "../../types/blog";
import toast from "react-hot-toast";

export default function BlogManager() {
	const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
	const [newPost, setNewPost] = useState<Omit<BlogPost, "id" | "date">>({
		title: "",
		slug: "",
		excerpt: "",
		content: "",
		coverImage: "",
		readTime: 0,
		author: {
			name: "",
			avatar: "",
		},
	});

	const handleAddPost = async () => {
		if (
			!newPost.title ||
			!newPost.slug ||
			!newPost.excerpt ||
			!newPost.content ||
			!newPost.coverImage ||
			!newPost.author.name
		) {
			toast.error("Please fill in all fields before adding a post.");
			return;
		}

		const post: BlogPost = {
			...newPost,
			id: uuid(),
			date: new Date().toISOString().split("T")[0],
			readTime: Math.ceil(newPost.content.split(" ").length / 100), // Assuming 100 words per minute reading speed
		};

		const { error } = await supabase.from("BlogPost").insert([post]);

		if (error) {
			toast.error("Error adding post: " + error.message);
			return;
		}

		setBlogPosts([...blogPosts, post]);
		setNewPost({
			title: "",
			slug: "",
			excerpt: "",
			content: "",
			coverImage: "",
			readTime: 0,
			author: {
				name: "",
				avatar: "",
			},
		});
		toast.success(`${post.title} has been added successfully!`);
	};

	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">Manage Blog Posts</h2>
			<div className="grid gap-4">
				<Input
					placeholder="Post Title"
					value={newPost.title}
					className="text-black"
					onChange={(e) =>
						setNewPost({ ...newPost, title: e.target.value })
					}
				/>
				<Input
					className="text-black"
					placeholder="Post Slug"
					value={newPost.slug}
					onChange={(e) =>
						setNewPost({ ...newPost, slug: e.target.value })
					}
				/>
				<Textarea
					className="text-black"
					placeholder="Post Excerpt"
					value={newPost.excerpt}
					onChange={(e) =>
						setNewPost({ ...newPost, excerpt: e.target.value })
					}
				/>
				<Textarea
					className="text-black"
					placeholder="Post Content"
					value={newPost.content}
					onChange={(e) =>
						setNewPost({ ...newPost, content: e.target.value })
					}
				/>
				<Input
					className="text-black"
					placeholder="Cover Image URL"
					value={newPost.coverImage}
					onChange={(e) =>
						setNewPost({ ...newPost, coverImage: e.target.value })
					}
				/>
				<Input
					className="text-black"
					placeholder="Author Name"
					value={newPost.author.name}
					onChange={(e) =>
						setNewPost({
							...newPost,
							author: { ...newPost.author, name: e.target.value },
						})
					}
				/>
				<Input
					className="text-black"
					placeholder="Author Avatar URL"
					value={newPost.author.avatar}
					onChange={(e) =>
						setNewPost({
							...newPost,
							author: {
								...newPost.author,
								avatar: e.target.value,
							},
						})
					}
				/>
				<Button onClick={handleAddPost}>Add Blog Post</Button>
			</div>
		</div>
	);
}
