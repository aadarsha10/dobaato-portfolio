import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import type { Project } from "../../types";
import { v4 as uuid } from "uuid";
import { supabase } from "../../SupabaseClient";
import { toast } from "react-hot-toast";

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

	// Fetch portfolio items from Supabase on component mount.
	useEffect(() => {
		const fetchPortfolioItems = async () => {
			const { data, error } = await supabase
				.from("Portfolio")
				.select("*");
			if (error) {
				toast.error("Error fetching portfolio items: " + error.message);
			} else {
				setPortfolioItems(data || []);
			}
		};
		fetchPortfolioItems();
	}, []);

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
				prev.map((item) =>
					item.id === editingItemId ? updatedItem : item
				)
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
	};

	// Delete a portfolio item.
	const handleDeleteItem = async (id: string) => {
		const { error } = await supabase
			.from("Portfolio")
			.delete()
			.eq("id", id);
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
					{editingItemId
						? "Edit Portfolio Item"
						: "Add New Portfolio Item"}
				</h3>
				<Input
					placeholder="Project Title"
					value={newItem.title}
					className="text-black"
					onChange={(e) =>
						setNewItem({ ...newItem, title: e.target.value })
					}
				/>
				<Textarea
					placeholder="Project Description"
					value={newItem.description}
					className="text-black"
					onChange={(e) =>
						setNewItem({ ...newItem, description: e.target.value })
					}
				/>
				<Input
					placeholder="Image URL"
					value={newItem.image}
					className="text-black"
					onChange={(e) =>
						setNewItem({ ...newItem, image: e.target.value })
					}
				/>
				<Input
					placeholder="Category (web, mobile, analytics)"
					value={newItem.category}
					className="text-black"
					onChange={(e) =>
						setNewItem({
							...newItem,
							category: e.target.value as
								| "web"
								| "mobile"
								| "analytics",
						})
					}
				/>
				<Input
					placeholder="Demo URL (Optional)"
					value={newItem.demoUrl}
					className="text-black"
					onChange={(e) =>
						setNewItem({ ...newItem, demoUrl: e.target.value })
					}
				/>
				<div className="flex gap-2">
					<Button variant="outline" onClick={handleAddOrUpdateItem}>
						{editingItemId
							? "Update Portfolio Item"
							: "Add Portfolio Item"}
					</Button>
					{editingItemId && (
						<Button
							variant="secondary"
							onClick={handleCancelEditing}
							className="border rounded-lg"
						>
							Cancel
						</Button>
					)}
				</div>
			</div>

			{/* Portfolio Items Listing */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4">
				{portfolioItems.map((item) => (
					<div
						key={item.id}
						className="bg-gray-50 border border-gray-200 p-4 rounded shadow-sm"
					>
						<h3 className="text-xl font-semibold">{item.title}</h3>
						<p className="text-sm text-gray-500 mt-1">
							Category: {item.category}
						</p>
						<p className="mt-2">{item.description}</p>
						<p className="mt-2">
							{item.demoUrl && (
								<a
									href={item.demoUrl}
									className="text-blue-600 hover:underline"
									target="_blank"
									rel="noopener noreferrer"
								>
									Live Demo
								</a>
							)}
						</p>
						<div className="flex gap-2 mt-2">
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
