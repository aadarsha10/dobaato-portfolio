import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { supabase } from "../../SupabaseClient";
import { Testimonial } from "../../types";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { Spinner } from "../../components/ui/spinner";

export default function TestimonialsManager() {
	const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [newTestimonial, setNewTestimonial] = useState<
		Omit<Testimonial, "id">
	>({ text: "", author: "", position: "", company: "" });

	// Fetch testimonials from the database
	const fetchTestimonials = async () => {
		const { data, error } = await supabase.from("Testimonial").select("*");
		if (error) {
			toast.error(error.message);
		} else {
			setTestimonials(data);
		}
	};

	// Add a new testimonial to the database
	const handleAddTestimonial = async () => {
		setLoading(true);
		const testimonialWithId = {
			id: uuidv4(), // Generate a UUID for the testimonial
			...newTestimonial,
		};

		const { data, error } = await supabase
			.from("Testimonial")
			.insert(testimonialWithId)
			.select();
		if (error) {
			toast.error(error.message);
			setLoading(false);
			return;
		} else {
			toast.success("Testimonial added successfully");
			setTestimonials((prev) => [...prev, data[0]]);
			setNewTestimonial({
				text: "",
				author: "",
				position: "",
				company: "",
			});
			setLoading(false);
		}
		setLoading(false);
	};

	// Fetch testimonials on component mount
	useEffect(() => {
		fetchTestimonials();
	}, []);

	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">Manage Testimonials</h2>
			<div className="grid gap-4">
				<Input
					placeholder="Author"
					value={newTestimonial.author}
					className="text-gray-700"
					onChange={(e) =>
						setNewTestimonial({
							...newTestimonial,
							author: e.target.value,
						})
					}
				/>
				<Input
					className="text-gray-700"
					placeholder="Position"
					value={newTestimonial.position}
					onChange={(e) =>
						setNewTestimonial({
							...newTestimonial,
							position: e.target.value,
						})
					}
				/>
				<Input
					className="text-gray-700"
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
					className="text-gray-700"
					placeholder="Testimonial"
					value={newTestimonial.text}
					onChange={(e) =>
						setNewTestimonial({
							...newTestimonial,
							text: e.target.value,
						})
					}
				/>
				<Button onClick={handleAddTestimonial}>
					{loading ? <Spinner /> : "Add Testimonials"}
				</Button>
			</div>
			<div className="space-y-4">
				{testimonials.map((testimonial) => (
					<div key={testimonial.id} className="border p-4 rounded-lg">
						<h3 className="text-xl font-semibold">
							{testimonial.author}
						</h3>
						<p className="text-sm text-gray-500">
							{testimonial.position} at {testimonial.company}
						</p>
						<p className="mt-2">{testimonial.text}</p>
					</div>
				))}
			</div>
		</div>
	);
}
