import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Project } from "../../types";
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
	});

	useEffect(() => {
		const fetchPortfolioItems = async () => {
			const { data, error } = await supabase
				.from("Portfolio")
				.select("*");
			if (error) {
				toast.error("Error fetching portfolio items: " + error.message);
			} else {
				setPortfolioItems(data);
			}
		};

		fetchPortfolioItems();
	}, []);

	const handleAddItem = async () => {
		if (
			!newItem.title ||
			!newItem.description ||
			!newItem.image ||
			!newItem.category
		) {
			toast.error(
				"Please fill in all fields before adding a portfolio item."
			);
			return;
		}

		const item: Project = {
			...newItem,
			id: uuid(),
		};

		const { error } = await supabase.from("Portfolio").insert([item]);

		if (error) {
			toast.error("Error adding portfolio item: " + error.message);
			return;
		}

		setPortfolioItems([...portfolioItems, item]);
		setNewItem({ title: "", description: "", image: "", category: "web" }); // Reset form

		toast.success(`${item.title} has been added to the portfolio.`);
	};

	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">Manage Portfolio</h2>
			<div className="grid gap-4">
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
				<Button variant={"outline"} onClick={handleAddItem}>
					Add Portfolio Item
				</Button>
			</div>
		</div>
	);
}
