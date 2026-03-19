import {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {v4 as uuid} from "uuid";
import AdminModal from "../../components/ui/admin/AdminModal";
import AdminSectionHeader from "../../components/ui/admin/AdminSectionHeader";
import {Button} from "../../components/ui/button";
import {ImageUpload} from "../../components/ui/image-upload";
import {Input} from "../../components/ui/input";
import {Textarea} from "../../components/ui/textarea";
import {supabase} from "../../SupabaseClient";
import type {Project} from "../../types";
import {cleanupOrphanedPortfolioImages} from "../../utils/setupSupabase";

const sortFeaturedFirst = (items: Project[]) =>
  [...items].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  );

export default function PortfolioManager() {
  const [portfolioItems, setPortfolioItems] = useState<Project[]>([]);
  const [newItem, setNewItem] = useState<Omit<Project, "id">>({
    title: "",
    description: "",
    image: "",
    category: "web",
    featured: false,
    demoUrl: "",
  });
  // Holds the id of the portfolio item being edited (if any)
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch portfolio items from Supabase on component mount.
  useEffect(() => {
    const fetchPortfolioItems = async () => {
      const {data, error} = await supabase.from("Portfolio").select("*");
      if (error) {
        toast.error("Error fetching portfolio items: " + error.message);
      } else {
        setPortfolioItems(sortFeaturedFirst(data || []));
      }
    };

    // Fetch portfolio items and clean up orphaned images
    fetchPortfolioItems();

    // Cleanup orphaned images when component mounts (and when user has admin access)
    cleanupOrphanedPortfolioImages().catch((err) =>
      console.error("Error cleaning up orphaned images:", err),
    );
  }, []);

  // Handle image upload completion
  const handleImageUploaded = (url: string) => {
    setNewItem({...newItem, image: url});
  };

  // Adds or updates a portfolio item
  const handleAddOrUpdateItem = async () => {
    if (
      !newItem.title ||
      !newItem.description ||
      !newItem.image ||
      !newItem.category
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      if (editingItemId) {
        // Update existing item.
        const updatedItem: Project = {
          ...newItem,
          id: editingItemId,
        };

        const {error} = await supabase
          .from("Portfolio")
          .update(updatedItem)
          .eq("id", editingItemId);
        if (error) {
          toast.error("Error updating portfolio item: " + error.message);
          return;
        }
        setPortfolioItems((prev) =>
          sortFeaturedFirst(
            prev.map((item) =>
              item.id === editingItemId ? updatedItem : item,
            ),
          ),
        );
        toast.success("Portfolio item updated successfully!");
        // Reset edit mode and clear form.
        setEditingItemId(null);
        setNewItem({
          title: "",
          description: "",
          image: "",
          category: "web",
          featured: false,
          demoUrl: "",
        });
        setIsModalOpen(false);
      } else {
        // Create a new item.
        const item: Project = {
          ...newItem,
          id: uuid(),
        };

        const {error} = await supabase.from("Portfolio").insert([item]);
        if (error) {
          toast.error("Error adding portfolio item: " + error.message);
          return;
        }
        setPortfolioItems((prev) => sortFeaturedFirst([...prev, item]));
        toast.success(`${item.title} has been added to the portfolio.`);
        // Reset form.
        setNewItem({
          title: "",
          description: "",
          image: "",
          category: "web",
          featured: false,
          demoUrl: "",
        });
        setIsModalOpen(false);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast.error("Error saving portfolio item: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Delete a portfolio item.
  const handleDeleteItem = async (id: string) => {
    try {
      setLoading(true);
      const itemToDelete = portfolioItems.find((item) => item.id === id);

      if (itemToDelete && itemToDelete.image) {
        // Extract the file path from the public URL
        const imageUrl = new URL(itemToDelete.image);
        const pathMatch = imageUrl.pathname.match(/\/images\/([^?]+)/);

        if (pathMatch && pathMatch[1]) {
          // Delete the image from storage
          const {error: deleteStorageError} = await supabase.storage
            .from("images")
            .remove([pathMatch[1]]);

          if (deleteStorageError) {
            console.error("Error deleting image file:", deleteStorageError);
          }
        }
      }

      // Delete the database record
      const {error} = await supabase.from("Portfolio").delete().eq("id", id);

      if (error) {
        toast.error("Error deleting portfolio item: " + error.message);
        return;
      }

      setPortfolioItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Portfolio item deleted successfully!");

      // If the deleted item was in edit mode, reset the form.
      if (id === editingItemId) {
        setEditingItemId(null);
        setNewItem({
          title: "",
          description: "",
          image: "",
          category: "web",
          featured: false,
          demoUrl: "",
        });
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast.error("Error during delete operation: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Populate the form with the data for editing.
  const handleEditItem = (item: Project) => {
    setEditingItemId(item.id);
    setNewItem({
      title: item.title,
      description: item.description,
      image: item.image,
      category: item.category,
      featured: item.featured ?? false,
      demoUrl: item.demoUrl,
    });
    setIsModalOpen(true);
  };

  // Cancel editing mode.
  const handleCancelEditing = () => {
    setEditingItemId(null);
    setNewItem({
      title: "",
      description: "",
      image: "",
      category: "web",
      featured: false,
      demoUrl: "",
    });
    setIsModalOpen(false);
  };

  const handleOpenCreateModal = () => {
    setEditingItemId(null);
    setNewItem({
      title: "",
      description: "",
      image: "",
      category: "web",
      featured: false,
      demoUrl: "",
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 p-4">
      <AdminSectionHeader
        title="Manage Portfolio"
        description="Add featured projects with image, category, and optional demo link."
        buttonLabel="Add Project"
        onButtonClick={handleOpenCreateModal}
      />

      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
        {portfolioItems.map((item) => (
          <div
            key={item.id}
            className="relative flex min-h-[360px] h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="pointer-events-none absolute right-0 top-0 h-14 w-20 bg-gradient-to-bl from-primary-500/20 to-sky-400/10 [clip-path:polygon(100%_0,0_0,100%_100%)]" />
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 font-domine">
              {item.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
              {item.description}
            </p>
            <div className="mt-2">
              <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                {item.category}
              </span>
              {item.featured && (
                <span className="ml-2 rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                  Featured
                </span>
              )}
            </div>
            {item.demoUrl && (
              <a
                href={item.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block text-xs text-primary-600 hover:underline dark:text-primary-400"
              >
                {item.demoUrl}
              </a>
            )}
            <div className="mt-auto pt-4 flex gap-2">
              <Button
                className="bg-amber-500 text-white hover:bg-amber-600"
                onClick={() => handleEditItem(item)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                className="bg-rose-600 text-white hover:bg-rose-700"
                onClick={() => handleDeleteItem(item.id)}
                disabled={loading}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AdminModal
        open={isModalOpen}
        title={editingItemId ? "Edit Portfolio Item" : "Add New Portfolio Item"}
        description="Fill required project fields and upload/select an image."
        onClose={handleCancelEditing}
      >
        <div className="grid gap-4">
          <Input
            placeholder="Project Title"
            value={newItem.title}
            onChange={(e) => setNewItem({...newItem, title: e.target.value})}
          />
          <Textarea
            placeholder="Project Description"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({...newItem, description: e.target.value})
            }
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Project Image
            </label>
            <ImageUpload
              onImageUploaded={handleImageUploaded}
              bucketName="images"
              folderPath="portfolio"
              currentImageUrl={newItem.image}
            />
          </div>
          <Input
            placeholder="Category (web, mobile, analytics)"
            value={newItem.category}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                category: e.target.value as "web" | "mobile" | "analytics",
              })
            }
          />
          <label className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={newItem.featured ?? false}
              onChange={(e) =>
                setNewItem({...newItem, featured: e.target.checked})
              }
              className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 dark:border-slate-600"
            />
            Mark as featured project
          </label>
          <Input
            placeholder="Demo URL (optional)"
            value={newItem.demoUrl || ""}
            onChange={(e) => setNewItem({...newItem, demoUrl: e.target.value})}
          />
          <div className="flex gap-2">
            <Button
              className="bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={handleAddOrUpdateItem}
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : editingItemId
                  ? "Update Item"
                  : "Add Item"}
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
