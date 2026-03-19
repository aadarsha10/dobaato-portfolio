import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {v4 as uuid} from "uuid";
import AdminModal from "../../components/ui/admin/AdminModal";
import AdminSectionHeader from "../../components/ui/admin/AdminSectionHeader";
import {Button} from "../../components/ui/button";
import {Input} from "../../components/ui/input";
import {Textarea} from "../../components/ui/textarea";
import {supabase} from "../../SupabaseClient";
import type {BlogPost} from "../../types/blog";

export default function BlogManager() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      const {data, error} = await supabase.from("BlogPost").select("*");
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

      const {error} = await supabase
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
          post.id === editingPostId ? updatedPost : post,
        ),
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
        author: {name: "", avatar: ""},
      });
      setIsModalOpen(false);
    } else {
      // Adding a new post.
      const post: BlogPost = {
        ...newPost,
        readTime,
        id: uuid(),
        date: new Date().toISOString().split("T")[0],
      };

      const {error} = await supabase.from("BlogPost").insert([post]);
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
        author: {name: "", avatar: ""},
      });
      setIsModalOpen(false);
    }
    setLoading(false);
  };

  const handleDeletePost = async (id: string) => {
    setLoading(true);
    const {error} = await supabase.from("BlogPost").delete().eq("id", id);
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
        author: {name: "", avatar: ""},
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
    setIsModalOpen(true);
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
      author: {name: "", avatar: ""},
    });
    setIsModalOpen(false);
  };

  const handleOpenCreateModal = () => {
    setEditingPostId(null);
    setNewPost({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "",
      readTime: 0,
      author: {name: "", avatar: ""},
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 p-4">
      <AdminSectionHeader
        title="Manage Blog Posts"
        description="Create, edit, and curate articles for your blog section."
        buttonLabel="Add Blog Post"
        onButtonClick={handleOpenCreateModal}
      />

      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="relative flex min-h-[320px] h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="pointer-events-none absolute right-0 top-0 h-14 w-20 bg-gradient-to-bl from-primary-500/20 to-sky-400/10 [clip-path:polygon(100%_0,0_0,100%_100%)]" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {post.title}
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              /{post.slug} - {post.readTime} min read - {post.date}
            </p>
            <p className="mt-3 line-clamp-6 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {post.excerpt}
            </p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Author: {post.author.name}
            </p>
            <div className="mt-auto pt-4 flex gap-2">
              <Button
                className="bg-amber-500 text-white hover:bg-amber-600"
                onClick={() => handleEditClick(post)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                className="bg-rose-600 text-white hover:bg-rose-700"
                onClick={() => handleDeletePost(post.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AdminModal
        open={isModalOpen}
        title={editingPostId ? "Edit Blog Post" : "Add New Blog Post"}
        description="Fill all required fields before saving."
        onClose={handleCancelEditing}
      >
        <div className="grid gap-4">
          <Input
            placeholder="Post Title"
            value={newPost.title}
            onChange={(e) => setNewPost({...newPost, title: e.target.value})}
          />
          <Input
            placeholder="Post Slug"
            value={newPost.slug}
            onChange={(e) => setNewPost({...newPost, slug: e.target.value})}
          />
          <Textarea
            placeholder="Post Excerpt"
            value={newPost.excerpt}
            onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
          />
          <Textarea
            placeholder="Post Content"
            value={newPost.content}
            onChange={(e) => setNewPost({...newPost, content: e.target.value})}
          />
          <Input
            placeholder="Cover Image URL"
            value={newPost.coverImage}
            onChange={(e) =>
              setNewPost({...newPost, coverImage: e.target.value})
            }
          />
          <Input
            placeholder="Author Name"
            value={newPost.author.name}
            onChange={(e) =>
              setNewPost({
                ...newPost,
                author: {
                  ...newPost.author,
                  name: e.target.value,
                },
              })
            }
          />
          <Input
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
          <div className="flex gap-2">
            <Button
              className="bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={handleAddOrUpdatePost}
            >
              {loading
                ? "Loading..."
                : editingPostId
                  ? "Update Blog Post"
                  : "Add Blog Post"}
            </Button>
            <Button
              variant="secondary"
              className="bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
              onClick={handleCancelEditing}
            >
              Cancel
            </Button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
