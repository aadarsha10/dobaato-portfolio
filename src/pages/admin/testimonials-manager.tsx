import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { supabase } from "../../SupabaseClient";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { Spinner } from "../../components/ui/spinner";
import type { Testimonial } from "../../types";

export default function TestimonialsManager() {
	const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	// Form state for adding/editing a testimonial.
	const [newTestimonial, setNewTestimonial] = useState<
		Omit<Testimonial, "id">
	>({
		text: "",
		author: "",
		position: "",
		company: "",
	});
	// Holds the ID of the testimonial being edited (if any).
	const [editingTestimonialId, setEditingTestimonialId] = useState<
		string | null
	>(null);

	// Fetch testimonials from the database
	const fetchTestimonials = async () => {
		const { data, error } = await supabase.from("Testimonial").select("*");
		if (error) {
			toast.error(error.message);
		} else {
			setTestimonials(data || []);
		}
	};

	// Add or update testimonial
	const handleAddOrUpdateTestimonial = async () => {
		if (
			!newTestimonial.author ||
			!newTestimonial.position ||
			!newTestimonial.company ||
			!newTestimonial.text
		) {
			toast.error("Please fill in all fields before submitting.");
			return;
		}

		setLoading(true);
		if (editingTestimonialId) {
			// Update existing testimonial.
			const updatedTestimonial: Testimonial = {
				...newTestimonial,
				id: editingTestimonialId,
			};

			const { error } = await supabase
				.from("Testimonial")
				.update(updatedTestimonial)
				.eq("id", editingTestimonialId);

			if (error) {
				toast.error("Error updating testimonial: " + error.message);
				setLoading(false);
				return;
			}

			setTestimonials((prev) =>
				prev.map((t) =>
					t.id === editingTestimonialId ? updatedTestimonial : t
				)
			);
			toast.success("Testimonial updated successfully!");
			// Reset form
			setEditingTestimonialId(null);
			setNewTestimonial({
				text: "",
				author: "",
				position: "",
				company: "",
			});
		} else {
			// Add new testimonial.
			const testimonialWithId: Testimonial = {
				id: uuidv4(),
				...newTestimonial,
			};

			const { data, error } = await supabase
				.from("Testimonial")
				.insert(testimonialWithId)
				.select();

			if (error) {
				toast.error("Error adding testimonial: " + error.message);
				setLoading(false);
				return;
			}

			toast.success("Testimonial added successfully!");
			setTestimonials((prev) => [...prev, data[0]]);
			setNewTestimonial({
				text: "",
				author: "",
				position: "",
				company: "",
			});
		}
		setLoading(false);
	};

	// Delete a testimonial.
	const handleDeleteTestimonial = async (id: string) => {
		setLoading(true);
		const { error } = await supabase
			.from("Testimonial")
			.delete()
			.eq("id", id);
		if (error) {
			toast.error("Error deleting testimonial: " + error.message);
			setLoading(false);
			return;
		}
		setTestimonials((prev) => prev.filter((t) => t.id !== id));
		toast.success("Testimonial deleted successfully!");
		setLoading(false);
		// If the deleted testimonial was in edit mode, clear the form.
		if (id === editingTestimonialId) {
			setEditingTestimonialId(null);
			setNewTestimonial({
				text: "",
				author: "",
				position: "",
				company: "",
			});
		}
	};

	// Populate the form with the testimonial data for editing.
	const handleEditTestimonial = (testimonial: Testimonial) => {
		setEditingTestimonialId(testimonial.id);
		setNewTestimonial({
			text: testimonial.text,
			author: testimonial.author,
			position: testimonial.position,
			company: testimonial.company,
		});
	};

	// Cancel editing mode.
	const handleCancelEditing = () => {
		setEditingTestimonialId(null);
		setNewTestimonial({
			text: "",
			author: "",
			position: "",
			company: "",
		});
	};

	// Fetch testimonials on component mount.
	useEffect(() => {
		fetchTestimonials();
	}, []);

	return (
		<div className="space-y-8 p-4">
			<h2 className="text-2xl font-bold">Manage Testimonials</h2>

			{/* Testimonial Form (Add / Edit) */}
			<div className="bg-white p-6 shadow rounded grid gap-4">
				<h3 className="text-xl font-semibold text-gray-700">
					{editingTestimonialId
						? "Edit Testimonial"
						: "Add New Testimonial"}
				</h3>
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
					placeholder="Position"
					value={newTestimonial.position}
					className="text-gray-700"
					onChange={(e) =>
						setNewTestimonial({
							...newTestimonial,
							position: e.target.value,
						})
					}
				/>
				<Input
					placeholder="Company"
					value={newTestimonial.company}
					className="text-gray-700"
					onChange={(e) =>
						setNewTestimonial({
							...newTestimonial,
							company: e.target.value,
						})
					}
				/>
				<Textarea
					placeholder="Testimonial"
					value={newTestimonial.text}
					className="text-gray-700"
					onChange={(e) =>
						setNewTestimonial({
							...newTestimonial,
							text: e.target.value,
						})
					}
				/>
				<div className="flex gap-2">
					<Button
						onClick={handleAddOrUpdateTestimonial}
						className="bg-primary-300"
					>
						{loading ? (
							<Spinner />
						) : editingTestimonialId ? (
							"Update Testimonial"
						) : (
							"Add Testimonial"
						)}
					</Button>
					{editingTestimonialId && (
						<Button
							onClick={handleCancelEditing}
							variant="secondary"
							className="border rounded-lg"
						>
							Cancel
						</Button>
					)}
				</div>
			</div>

			{/* Testimonials Listing */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 ">
				{testimonials.map((testimonial) => (
					<div
						key={testimonial.id}
						className="bg-gray-50 border text-gray-800 border-gray-200 p-4 rounded shadow-sm"
					>
						<h3 className="text-xl font-semibold">
							{testimonial.author}
						</h3>
						<p className="text-sm text-gray-500">
							{testimonial.position} at {testimonial.company}
						</p>
						<p className="mt-2">{testimonial.text}</p>
						<div className="flex gap-2 mt-2">
							<Button
								className="bg-primary-300"
								onClick={() =>
									handleEditTestimonial(testimonial)
								}
							>
								Edit
							</Button>
							<Button
								variant="destructive"
								className="bg-red-300"
								onClick={() =>
									handleDeleteTestimonial(testimonial.id)
								}
							>
								<svg
									width="15"
									height="15"
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
										fill="currentColor"
										fillRule="evenodd"
										clipRule="evenodd"
									></path>
								</svg>
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
