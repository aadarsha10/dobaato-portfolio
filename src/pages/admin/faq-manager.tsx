import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { supabase } from "../../SupabaseClient";
import toast from "react-hot-toast";
import { Spinner } from "../../components/ui/spinner";
import type { FAQ } from "../../types";

export default function FAQManager() {
	const [faqs, setFAQs] = useState<FAQ[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	// This state is used to manage adding/updating FAQ.
	const [newFAQ, setNewFAQ] = useState<Omit<FAQ, "id">>({
		question: "",
		answer: "",
	});
	// Holds the id of the FAQ being edited (if any).
	const [editingFAQId, setEditingFAQId] = useState<string | null>(null);

	// Fetch FAQs from Supabase.
	const fetchFAQs = async () => {
		const { data, error } = await supabase.from("faq").select("*");
		if (error) {
			toast.error(error.message);
		} else {
			setFAQs(data || []);
		}
	};

	// Add or update FAQ based on editingFAQId.
	const handleAddOrUpdateFAQ = async () => {
		if (!newFAQ.question || !newFAQ.answer) {
			toast.error("Please fill in all fields before submitting.");
			return;
		}
		setLoading(true);

		if (editingFAQId) {
			// Update logic.
			const updatedFAQ: FAQ = {
				...newFAQ,
				id: editingFAQId,
			};

			const { error } = await supabase
				.from("faq")
				.update(updatedFAQ)
				.eq("id", editingFAQId);

			if (error) {
				toast.error("Error updating FAQ: " + error.message);
				setLoading(false);
				return;
			}
			setFAQs(
				faqs.map((faq) => (faq.id === editingFAQId ? updatedFAQ : faq))
			);
			toast.success("FAQ updated successfully!");
			setEditingFAQId(null);
			setNewFAQ({ question: "", answer: "" });
		} else {
			// Add logic.
			const { data, error } = await supabase
				.from("faq")
				.insert([{ question: newFAQ.question, answer: newFAQ.answer }])
				.select();

			if (error) {
				toast.error("Error adding FAQ: " + error.message);
				setLoading(false);
				return;
			}
			// Assume data[0] is the new FAQ record.
			setFAQs([...faqs, data[0]]);
			toast.success("FAQ added successfully!");
			setNewFAQ({ question: "", answer: "" });
		}
		setLoading(false);
	};

	// Delete an FAQ.
	const handleDeleteFAQ = async (id: string) => {
		setLoading(true);
		const { error } = await supabase.from("faq").delete().eq("id", id);
		if (error) {
			toast.error("Error deleting FAQ: " + error.message);
			setLoading(false);
			return;
		}
		setFAQs(faqs.filter((faq) => faq.id !== id));
		toast.success("FAQ deleted successfully!");
		setLoading(false);
		// Clear edit mode in case the deleted FAQ was being edited.
		if (id === editingFAQId) {
			setEditingFAQId(null);
			setNewFAQ({ question: "", answer: "" });
		}
	};

	// Populate form for editing.
	const handleEditFAQ = (faq: FAQ) => {
		setEditingFAQId(faq.id);
		setNewFAQ({ question: faq.question, answer: faq.answer });
	};

	// Cancel editing mode.
	const handleCancelEditing = () => {
		setEditingFAQId(null);
		setNewFAQ({ question: "", answer: "" });
	};

	// Fetch FAQs on component mount.
	useEffect(() => {
		fetchFAQs();
	}, []);

	return (
		<div className="space-y-8 p-4">
			<h2 className="text-2xl font-bold">Manage FAQs</h2>

			{/* FAQ Form (Add / Edit) */}
			<div className="bg-white p-6 shadow rounded grid gap-4">
				<h3 className="text-xl font-semibold">
					{editingFAQId ? "Edit FAQ" : "Add New FAQ"}
				</h3>
				<Input
					placeholder="Question"
					className="text-gray-700"
					value={newFAQ.question}
					onChange={(e) =>
						setNewFAQ({ ...newFAQ, question: e.target.value })
					}
				/>
				<Textarea
					placeholder="Answer"
					className="text-gray-700"
					value={newFAQ.answer}
					onChange={(e) =>
						setNewFAQ({ ...newFAQ, answer: e.target.value })
					}
				/>
				<div className="flex gap-2">
					<Button
						className="bg-primary-200"
						onClick={handleAddOrUpdateFAQ}
					>
						{loading ? (
							<Spinner />
						) : editingFAQId ? (
							"Update FAQ"
						) : (
							"Add FAQ"
						)}
					</Button>
					{editingFAQId && (
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

			{/* FAQ Listing */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 ">
				{faqs.map((faq) => (
					<div
						key={faq.id}
						className="bg-gray-50 border border-gray-200 p-4 rounded shadow-sm"
					>
						<h3 className="text-xl font-semibold">
							{faq.question}
						</h3>
						<p className="text-sm text-gray-500 mt-2">
							{faq.answer}
						</p>
						<div className="flex gap-2 mt-2">
							<Button
								className="bg-primary-300"
								onClick={() => handleEditFAQ(faq)}
							>
								Edit
							</Button>
							<Button
								variant="destructive"
								className="bg-red-300"
								onClick={() => handleDeleteFAQ(faq.id)}
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
