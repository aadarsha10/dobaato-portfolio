import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { supabase } from "../../SupabaseClient";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import type { BlogPost } from "../../types/blog";

export default function BlogManager() {
	const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	// This form state is used for both creating and updating a blog post.
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
	// Holds the id of the post being edited (if any).
	const [editingPostId, setEditingPostId] = useState<string | null>(null);

	// Fetch existing blog posts on mount
	useEffect(() => {
		const fetchPosts = async () => {
			const { data, error } = await supabase.from("BlogPost").select("*");
			if (error) {
				toast.error("Error fetching blog posts");
				return;
			}
			setBlogPosts(data || []);
		};
		fetchPosts();
	}, []);

	const handleAddOrUpdatePost = async () => {
		if (
			!newPost.title ||
			!newPost.slug ||
			!newPost.excerpt ||
			!newPost.content ||
			!newPost.coverImage ||
			!newPost.author.name
		) {
			toast.error("Please fill in all fields before submitting.");
			return;
		}

		setLoading(true);
		// Calculate readTime based on content length (words per 100)
		const readTime = Math.ceil(newPost.content.split(" ").length / 100);

		if (editingPostId) {
			// Update existing post.
			const updatedPost: BlogPost = {
				...newPost,
				readTime,
				id: editingPostId,
				date:
					blogPosts.find((post) => post.id === editingPostId)?.date ||
					new Date().toISOString().split("T")[0],
			};

			const { error } = await supabase
				.from("BlogPost")
				.update(updatedPost)
				.eq("id", editingPostId);
			if (error) {
				toast.error("Error updating post: " + error.message);
				setLoading(false);
				return;
			}
			setBlogPosts(
				blogPosts.map((post) =>
					post.id === editingPostId ? updatedPost : post
				)
			);
			toast.success("Blog post updated successfully!");
			// Reset edit mode and clear the form.
			setEditingPostId(null);
			setNewPost({
				title: "",
				slug: "",
				excerpt: "",
				content: "",
				coverImage: "",
				readTime: 0,
				author: { name: "", avatar: "" },
			});
		} else {
			// Adding a new post.
			const post: BlogPost = {
				...newPost,
				readTime,
				id: uuid(),
				date: new Date().toISOString().split("T")[0],
			};

			const { error } = await supabase.from("BlogPost").insert([post]);
			if (error) {
				toast.error("Error adding post: " + error.message);
				setLoading(false);
				return;
			}
			setBlogPosts([...blogPosts, post]);
			toast.success(`${post.title} has been added successfully!`);
			setNewPost({
				title: "",
				slug: "",
				excerpt: "",
				content: "",
				coverImage: "",
				readTime: 0,
				author: { name: "", avatar: "" },
			});
		}
		setLoading(false);
	};

	const handleDeletePost = async (id: string) => {
		setLoading(true);
		const { error } = await supabase.from("BlogPost").delete().eq("id", id);
		if (error) {
			toast.error("Error deleting post: " + error.message);
			setLoading(false);
			return;
		}
		setBlogPosts(blogPosts.filter((post) => post.id !== id));
		toast.success("Blog post deleted successfully!");
		setLoading(false);
		// If the deleted post was in edit mode, clear the form.
		if (id === editingPostId) {
			setEditingPostId(null);
			setNewPost({
				title: "",
				slug: "",
				excerpt: "",
				content: "",
				coverImage: "",
				readTime: 0,
				author: { name: "", avatar: "" },
			});
		}
	};

	// Populate the form fields with the selected post's data for editing.
	const handleEditClick = (post: BlogPost) => {
		setEditingPostId(post.id);
		setNewPost({
			title: post.title,
			slug: post.slug,
			excerpt: post.excerpt,
			content: post.content,
			coverImage: post.coverImage,
			readTime: post.readTime,
			author: {
				name: post.author.name,
				avatar: post.author.avatar,
			},
		});
	};

	// Cancel editing mode and reset the form.
	const handleCancelEditing = () => {
		setEditingPostId(null);
		setNewPost({
			title: "",
			slug: "",
			excerpt: "",
			content: "",
			coverImage: "",
			readTime: 0,
			author: { name: "", avatar: "" },
		});
	};

	return (
		<div className="space-y-8 p-4">
			<h2 className="text-2xl font-bold">Manage Blog Posts</h2>

			{/* Blog Post Form (Add / Edit) */}
			<div className="bg-white p-6 shadow rounded grid gap-4">
				<h3 className="text-xl font-semibold">
					{editingPostId ? "Edit Blog Post" : "Add New Blog Post"}
				</h3>
				<Input
					placeholder="Post Title"
					value={newPost.title}
					className="text-black"
					onChange={(e) =>
						setNewPost({ ...newPost, title: e.target.value })
					}
				/>
				<Input
					placeholder="Post Slug"
					value={newPost.slug}
					className="text-black"
					onChange={(e) =>
						setNewPost({ ...newPost, slug: e.target.value })
					}
				/>
				<Textarea
					placeholder="Post Excerpt"
					value={newPost.excerpt}
					className="text-black"
					onChange={(e) =>
						setNewPost({ ...newPost, excerpt: e.target.value })
					}
				/>
				<Textarea
					placeholder="Post Content"
					value={newPost.content}
					className="text-black"
					onChange={(e) =>
						setNewPost({ ...newPost, content: e.target.value })
					}
				/>
				<Input
					placeholder="Cover Image URL"
					value={newPost.coverImage}
					className="text-black"
					onChange={(e) =>
						setNewPost({ ...newPost, coverImage: e.target.value })
					}
				/>
				<Input
					placeholder="Author Name"
					value={newPost.author.name}
					className="text-black"
					onChange={(e) =>
						setNewPost({
							...newPost,
							author: { ...newPost.author, name: e.target.value },
						})
					}
				/>
				<Input
					placeholder="Author Avatar URL"
					value={newPost.author.avatar}
					className="text-black"
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
				<div className="flex gap-2">
					<Button
						onClick={handleAddOrUpdatePost}
						className="bg-primary-300"
					>
						{loading
							? "Loading..."
							: editingPostId
							? "Update Blog Post"
							: "Add Blog Post"}
					</Button>
					{editingPostId && (
						<Button
							onClick={handleCancelEditing}
							className="border rounded-lg"
						>
							Cancel
						</Button>
					)}
				</div>
			</div>

			{/* Blog Posts Listing */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4">
				{blogPosts.map((post) => (
					<div
						key={post.id}
						className="bg-gray-50 border border-gray-200 p-4 rounded shadow-sm"
					>
						<h3 className="text-lg font-bold mb-2">{post.title}</h3>
						<p className="mb-2">{post.excerpt}</p>
						<div className="flex gap-2">
							<Button
								onClick={() => handleEditClick(post)}
								className="bg-primary-300"
							>
								Edit
							</Button>
							<Button
								onClick={() => handleDeletePost(post.id)}
								className="bg-red-300"
								variant="destructive"
							>
								<svg
									width="15"
									height="15"
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
										fill="currentColor"
										fillRule="evenodd"
										clipRule="evenodd"
									></path>
								</svg>
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
