import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import type { Project } from "../../types";
import { v4 as uuid } from "uuid";
import { supabase } from "../../SupabaseClient";
import { toast } from "react-hot-toast";
import { ImageUpload } from "../../components/ui/image-upload";
import { cleanupOrphanedPortfolioImages } from "../../utils/setupSupabase";

export default function PortfolioManager() {
  const [portfolioItems, setPortfolioItems] = useState<Project[]>([]);
  const [newItem, setNewItem] = useState<Omit<Project, "id">>({
    title: "",
    description: "",
    image: "",
    category: "web",
    demoUrl: "",
  });
  // Holds the id of the portfolio item being edited (if any)
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch portfolio items from Supabase on component mount.
  useEffect(() => {
    const fetchPortfolioItems = async () => {
      const { data, error } = await supabase.from("Portfolio").select("*");
      if (error) {
        toast.error("Error fetching portfolio items: " + error.message);
      } else {
        setPortfolioItems(data || []);
      }
    };

    // Fetch portfolio items and clean up orphaned images
    fetchPortfolioItems();

    // Cleanup orphaned images when component mounts (and when user has admin access)
    cleanupOrphanedPortfolioImages().catch((err) =>
      console.error("Error cleaning up orphaned images:", err)
    );
  }, []);

  // Handle image upload completion
  const handleImageUploaded = (url: string) => {
    setNewItem({ ...newItem, image: url });
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

        const { error } = await supabase
          .from("Portfolio")
          .update(updatedItem)
          .eq("id", editingItemId);
        if (error) {
          toast.error("Error updating portfolio item: " + error.message);
          return;
        }
        setPortfolioItems((prev) =>
          prev.map((item) => (item.id === editingItemId ? updatedItem : item))
        );
        toast.success("Portfolio item updated successfully!");
        // Reset edit mode and clear form.
        setEditingItemId(null);
        setNewItem({
          title: "",
          description: "",
          image: "",
          category: "web",
          demoUrl: "",
        });
      } else {
        // Create a new item.
        const item: Project = {
          ...newItem,
          id: uuid(),
        };

        const { error } = await supabase.from("Portfolio").insert([item]);
        if (error) {
          toast.error("Error adding portfolio item: " + error.message);
          return;
        }
        setPortfolioItems((prev) => [...prev, item]);
        toast.success(`${item.title} has been added to the portfolio.`);
        // Reset form.
        setNewItem({
          title: "",
          description: "",
          image: "",
          category: "web",
          demoUrl: "",
        });
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
          const { error: deleteStorageError } = await supabase.storage
            .from("images")
            .remove([pathMatch[1]]);

          if (deleteStorageError) {
            console.error("Error deleting image file:", deleteStorageError);
          }
        }
      }

      // Delete the database record
      const { error } = await supabase.from("Portfolio").delete().eq("id", id);

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
      demoUrl: item.demoUrl,
    });
  };

  // Cancel editing mode.
  const handleCancelEditing = () => {
    setEditingItemId(null);
    setNewItem({
      title: "",
      description: "",
      image: "",
      category: "web",
      demoUrl: "",
    });
  };

  return (
    <div className="space-y-8 p-4">
      <h2 className="text-2xl font-bold">Manage Portfolio</h2>

      {/* Portfolio Item Form (Add / Edit) */}
      <div className="bg-white p-6 shadow rounded grid gap-4">
        <h3 className="text-xl font-semibold">
          {editingItemId ? "Edit Portfolio Item" : "Add New Portfolio Item"}
        </h3>
        <Input
          placeholder="Project Title"
          value={newItem.title}
          className="text-black"
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
        />
        <Textarea
          placeholder="Project Description"
          value={newItem.description}
          className="text-black"
          onChange={(e) =>
            setNewItem({ ...newItem, description: e.target.value })
          }
        />

        {/* Image Upload Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
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
          className="text-black"
          onChange={(e) =>
            setNewItem({
              ...newItem,
              category: e.target.value as "web" | "mobile" | "analytics",
            })
          }
        />
        <Input
          placeholder="Demo URL (optional)"
          value={newItem.demoUrl || ""}
          className="text-black"
          onChange={(e) => setNewItem({ ...newItem, demoUrl: e.target.value })}
        />
        <div className="flex gap-2">
          <Button
            className="bg-primary-300"
            onClick={handleAddOrUpdateItem}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : editingItemId
              ? "Update Item"
              : "Add Item"}
          </Button>
          {editingItemId && (
            <Button
              variant="secondary"
              className="border rounded-lg"
              onClick={handleCancelEditing}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* Portfolio Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 p-4 rounded shadow-sm"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-2 line-clamp-3">
              {item.description}
            </p>
            <div className="mt-2">
              <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                {item.category}
              </span>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                className="bg-primary-300"
                onClick={() => handleEditItem(item)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                className="bg-red-300"
                onClick={() => handleDeleteItem(item.id)}
                disabled={loading}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
