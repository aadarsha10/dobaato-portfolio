"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useToast } from "../../components/ui/use-toast";

interface PortfolioItem {
	id: number;
	title: string;
	description: string;
	imageUrl: string;
}

const initialPortfolioItems: PortfolioItem[] = [
	{
		id: 1,
		title: "Project A",
		description: "A web application for managing tasks",
		imageUrl: "https://example.com/projectA.jpg",
	},
	{
		id: 2,
		title: "Project B",
		description: "An e-commerce platform",
		imageUrl: "https://example.com/projectB.jpg",
	},
];

export default function PortfolioManager() {
	const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(
		initialPortfolioItems
	);
	const [newItem, setNewItem] = useState<Omit<PortfolioItem, "id">>({
		title: "",
		description: "",
		imageUrl: "",
	});
	const { toast } = useToast();

	const handleAddItem = () => {
		const item = { ...newItem, id: Date.now() };
		setPortfolioItems([...portfolioItems, item]);
		setNewItem({ title: "", description: "", imageUrl: "" });
		toast({
			title: "Portfolio Item Added",
			description: `${item.title} has been added to the portfolio.`,
		});
	};

	const handleDeleteItem = (id: number) => {
		setPortfolioItems(portfolioItems.filter((item) => item.id !== id));
		toast({
			title: "Portfolio Item Deleted",
			description: "The item has been removed from the portfolio.",
			variant: "destructive",
		});
	};

	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">Manage Portfolio</h2>
			<div className="grid gap-4">
				<Input
					placeholder="Project Title"
					value={newItem.title}
					onChange={(e) =>
						setNewItem({ ...newItem, title: e.target.value })
					}
				/>
				<Textarea
					placeholder="Project Description"
					value={newItem.description}
					onChange={(e) =>
						setNewItem({ ...newItem, description: e.target.value })
					}
				/>
				<Input
					placeholder="Image URL"
					value={newItem.imageUrl}
					onChange={(e) =>
						setNewItem({ ...newItem, imageUrl: e.target.value })
					}
				/>
				<Button onClick={handleAddItem}>Add Portfolio Item</Button>
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{portfolioItems.map((item) => (
					<div key={item.id} className="border p-4 rounded-lg">
						<img
							src={item.imageUrl || "/placeholder.svg"}
							alt={item.title}
							className="w-full h-48 object-cover rounded-md mb-2"
						/>
						<h3 className="text-xl font-semibold">{item.title}</h3>
						<p className="text-sm text-gray-500">
							{item.description}
						</p>
						<Button
							variant="destructive"
							className="mt-2"
							onClick={() => handleDeleteItem(item.id)}
						>
							Delete
						</Button>
					</div>
				))}
			</div>
		</div>
	);
}
