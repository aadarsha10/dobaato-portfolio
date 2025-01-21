import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { supabase } from "../../SupabaseClient";
import { FAQ } from "../../types";
import toast from "react-hot-toast";
import { Spinner } from "../../components/ui/spinner";

export default function FAQManager() {
	const [faqs, setFAQs] = useState<FAQ[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [newFAQ, setNewFAQ] = useState<Omit<FAQ, "id">>({
		question: "",
		answer: "",
	});

	// Fetch FAQs from Supabase
	const fetchFAQs = async () => {
		const { data, error } = await supabase.from("faq").select("*");
		if (error) {
			toast.error(error.message);
		} else {
			setFAQs(data || []);
		}
	};

	// Add a new FAQ to Supabase
	const handleAddFAQ = async () => {
		setLoading(true);
		const { data, error } = await supabase
			.from("faq")
			.insert([{ question: newFAQ.question, answer: newFAQ.answer }])
			.select();
		if (error) {
			toast.error(error.message);
			setLoading(false);
		} else {
			toast.success("FAQ added successfully");
			setFAQs((prev) => [...prev, data[0]]);
			setNewFAQ({ question: "", answer: "" });
			setLoading(false);
		}
		setLoading(false);
	};

	// Delete an FAQ from Supabase
	const handleDeleteFAQ = async (id: string) => {
		const { error } = await supabase.from("faq").delete().eq("id", id);
		if (error) {
			toast.error(error.message);
		} else {
			toast.success("FAQ deleted successfully");
			setFAQs((prev) => prev.filter((faq) => faq.id !== id));
		}
	};

	// Fetch FAQs on component mount
	useEffect(() => {
		fetchFAQs();
	}, []);

	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">Manage FAQs</h2>
			<div className="grid gap-4">
				<Input
					placeholder="Question"
					className="text-gray-700"
					value={newFAQ.question}
					onChange={(e) =>
						setNewFAQ({ ...newFAQ, question: e.target.value })
					}
				/>
				<Textarea
					className="text-gray-700"
					placeholder="Answer"
					value={newFAQ.answer}
					onChange={(e) =>
						setNewFAQ({ ...newFAQ, answer: e.target.value })
					}
				/>
				<Button onClick={handleAddFAQ}>
					{" "}
					{loading ? <Spinner /> : "Add FAQ"}{" "}
				</Button>
			</div>
			<div className="space-y-4">
				{faqs.map((faq) => (
					<div key={faq.id} className="border p-4 rounded-lg">
						<h3 className="text-xl font-semibold">
							{faq.question}
						</h3>
						<p className="text-sm text-gray-500 mt-2">
							{faq.answer}
						</p>
						<Button
							variant="destructive"
							className="mt-2"
							onClick={() => handleDeleteFAQ(faq.id)}
						>
							Delete
						</Button>
					</div>
				))}
			</div>
		</div>
	);
}
