import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useToast } from "../../components/ui/use-toast";

interface Testimonial {
	id: number;
	name: string;
	company: string;
	testimonial: string;
}

const initialTestimonials: Testimonial[] = [
	{
		id: 1,
		name: "John Doe",
		company: "ABC Corp",
		testimonial: "Great service! Highly recommended.",
	},
	{
		id: 2,
		name: "Jane Smith",
		company: "XYZ Inc",
		testimonial: "The team was very professional and delivered on time.",
	},
];

export default function TestimonialsManager() {
	const [testimonials, setTestimonials] =
		useState<Testimonial[]>(initialTestimonials);
	const [newTestimonial, setNewTestimonial] = useState<
		Omit<Testimonial, "id">
	>({ name: "", company: "", testimonial: "" });
	const { toast } = useToast();

	const handleAddTestimonial = () => {
		const testimonial = { ...newTestimonial, id: Date.now() };
		setTestimonials([...testimonials, testimonial]);
		setNewTestimonial({ name: "", company: "", testimonial: "" });
		toast({
			title: "Testimonial Added",
			description: `${testimonial.name}'s testimonial has been added to the list.`,
		});
	};

	const handleDeleteTestimonial = (id: number) => {
		setTestimonials(
			testimonials.filter((testimonial) => testimonial.id !== id)
		);
		toast({
			title: "Testimonial Deleted",
			description: "The testimonial has been removed from the list.",
			variant: "destructive",
		});
	};

	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">Manage Testimonials</h2>
			<div className="grid gap-4">
				<Input
					placeholder="Name"
					value={newTestimonial.name}
					onChange={(e) =>
						setNewTestimonial({
							...newTestimonial,
							name: e.target.value,
						})
					}
				/>
				<Input
					placeholder="Company"
					value={newTestimonial.company}
					onChange={(e) =>
						setNewTestimonial({
							...newTestimonial,
							company: e.target.value,
						})
					}
				/>
				<Textarea
					placeholder="Testimonial"
					value={newTestimonial.testimonial}
					onChange={(e) =>
						setNewTestimonial({
							...newTestimonial,
							testimonial: e.target.value,
						})
					}
				/>
				<Button onClick={handleAddTestimonial}>Add Testimonial</Button>
			</div>
			<div className="space-y-4">
				{testimonials.map((testimonial) => (
					<div key={testimonial.id} className="border p-4 rounded-lg">
						<h3 className="text-xl font-semibold">
							{testimonial.name}
						</h3>
						<p className="text-sm text-gray-500">
							{testimonial.company}
						</p>
						<p className="mt-2">{testimonial.testimonial}</p>
						<Button
							variant="destructive"
							className="mt-2"
							onClick={() =>
								handleDeleteTestimonial(testimonial.id)
							}
						>
							Delete
						</Button>
					</div>
				))}
			</div>
		</div>
	);
}
