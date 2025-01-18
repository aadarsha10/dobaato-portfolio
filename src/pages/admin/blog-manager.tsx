import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useToast } from "../../components/ui/use-toast";

interface BlogPost {
	id: number;
	title: string;
	content: string;
	author: string;
	date: string;
}

const initialBlogPosts: BlogPost[] = [
	{
		id: 1,
		title: "First Blog Post",
		content: "This is the content of the first blog post...",
		author: "John Doe",
		date: "2023-06-01",
	},
	{
		id: 2,
		title: "Second Blog Post",
		content: "This is the content of the second blog post...",
		author: "Jane Smith",
		date: "2023-06-15",
	},
];

export default function BlogManager() {
	const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
	const [newPost, setNewPost] = useState<Omit<BlogPost, "id" | "date">>({
		title: "",
		content: "",
		author: "",
	});
	const { toast } = useToast();

	const handleAddPost = () => {
		const post = {
			...newPost,
			id: Date.now(),
			date: new Date().toISOString().split("T")[0],
		};
		setBlogPosts([...blogPosts, post]);
		setNewPost({ title: "", content: "", author: "" });
		toast({
			title: "Blog Post Added",
			description: `${post.title} has been added to the blog.`,
		});
	};

	const handleDeletePost = (id: number) => {
		setBlogPosts(blogPosts.filter((post) => post.id !== id));
		toast({
			title: "Blog Post Deleted",
			description: "The post has been removed from the blog.",
			variant: "destructive",
		});
	};

	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">Manage Blog Posts</h2>
			<div className="grid gap-4">
				<Input
					placeholder="Post Title"
					value={newPost.title}
					onChange={(e) =>
						setNewPost({ ...newPost, title: e.target.value })
					}
				/>
				<Textarea
					placeholder="Post Content"
					value={newPost.content}
					onChange={(e) =>
						setNewPost({ ...newPost, content: e.target.value })
					}
				/>
				<Input
					placeholder="Author"
					value={newPost.author}
					onChange={(e) =>
						setNewPost({ ...newPost, author: e.target.value })
					}
				/>
				<Button onClick={handleAddPost}>Add Blog Post</Button>
			</div>
			<div className="space-y-4">
				{blogPosts.map((post) => (
					<div key={post.id} className="border p-4 rounded-lg">
						<h3 className="text-xl font-semibold">{post.title}</h3>
						<p className="text-sm text-gray-500">
							By {post.author} on {post.date}
						</p>
						<p className="mt-2">
							{post.content.substring(0, 150)}...
						</p>
						<Button
							variant="destructive"
							className="mt-2"
							onClick={() => handleDeletePost(post.id)}
						>
							Delete
						</Button>
					</div>
				))}
			</div>
		</div>
	);
}
