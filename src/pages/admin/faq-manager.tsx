import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useToast } from "../../components/ui/use-toast";

interface FAQ {
	id: number;
	question: string;
	answer: string;
}

const initialFAQs: FAQ[] = [
	{
		id: 1,
		question: "What services do you offer?",
		answer: "We offer web development, mobile app development, and UI/UX design services.",
	},
	{
		id: 2,
		question: "How can I contact support?",
		answer: "You can reach our support team via email at support@example.com or by phone at (123) 456-7890.",
	},
];

export default function FAQManager() {
	const [faqs, setFAQs] = useState<FAQ[]>(initialFAQs);
	const [newFAQ, setNewFAQ] = useState<Omit<FAQ, "id">>({
		question: "",
		answer: "",
	});
	const { toast } = useToast();

	const handleAddFAQ = () => {
		const faq = { ...newFAQ, id: Date.now() };
		setFAQs([...faqs, faq]);
		setNewFAQ({ question: "", answer: "" });
		toast({
			title: "FAQ Added",
			description: "The new FAQ has been added to the list.",
		});
	};

	const handleDeleteFAQ = (id: number) => {
		setFAQs(faqs.filter((faq) => faq.id !== id));
		toast({
			title: "FAQ Deleted",
			description: "The FAQ has been removed from the list.",
			variant: "destructive",
		});
	};

	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">Manage FAQs</h2>
			<div className="grid gap-4">
				<Input
					placeholder="Question"
					value={newFAQ.question}
					onChange={(e) =>
						setNewFAQ({ ...newFAQ, question: e.target.value })
					}
				/>
				<Textarea
					placeholder="Answer"
					value={newFAQ.answer}
					onChange={(e) =>
						setNewFAQ({ ...newFAQ, answer: e.target.value })
					}
				/>
				<Button onClick={handleAddFAQ}>Add FAQ</Button>
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
