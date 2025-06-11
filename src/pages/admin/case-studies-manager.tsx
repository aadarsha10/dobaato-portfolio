import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { supabase } from "../../SupabaseClient";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";
import { Spinner } from "../../components/ui/spinner";
import type { CaseStudy } from "../../types";

export default function CaseStudiesManager() {
	const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [newCaseStudy, setNewCaseStudy] = useState<Omit<CaseStudy, "id">>({
		title: "",
		description: "",
		imageUrl: "",
		slug: "",
		content: "",
		technologies: [""],
		clientName: "",
		projectDate: "",
		projectUrl: "",
		githubUrl: "",
	});
	const [editingCaseStudyId, setEditingCaseStudyId] = useState<string | null>(null);

	// Fetch case studies from Supabase
	useEffect(() => {
		const fetchCaseStudies = async () => {
			const { data, error } = await supabase.from("CaseStudy").select("*");
			if (error) {
				toast.error("Error fetching case studies: " + error.message);
			} else {
				setCaseStudies(data || []);
			}
		};
		fetchCaseStudies();
	}, []);

	// Generate slug from title
	const generateSlug = (title: string) => {
		return title
			.toLowerCase()
			.replace(/[^a-z0-9 -]/g, "")
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-")
			.trim();
	};

	// Add or update case study
	const handleAddOrUpdateCaseStudy = async () => {
		if (!newCaseStudy.title || !newCaseStudy.description || !newCaseStudy.imageUrl) {
			toast.error("Please fill in all required fields (title, description, image).");
			return;
		}

		setLoading(true);

		// Generate slug if not provided
		const slug = newCaseStudy.slug || generateSlug(newCaseStudy.title);
		
		// Filter out empty technologies
		const filteredTechnologies = newCaseStudy.technologies?.filter(tech => tech.trim() !== "") || [];

		if (editingCaseStudyId) {
			// Update existing case study
			const updatedCaseStudy: CaseStudy = {
				...newCaseStudy,
				slug,
				technologies: filteredTechnologies,
				id: editingCaseStudyId,
			};

			const { error } = await supabase
				.from("CaseStudy")
				.update(updatedCaseStudy)
				.eq("id", editingCaseStudyId);

			if (error) {
				toast.error("Error updating case study: " + error.message);
				setLoading(false);
				return;
			}

			setCaseStudies(caseStudies.map(cs => 
				cs.id === editingCaseStudyId ? updatedCaseStudy : cs
			));
			toast.success("Case study updated successfully!");
			setEditingCaseStudyId(null);
			resetForm();
		} else {
			// Add new case study
			const caseStudy: CaseStudy = {
				...newCaseStudy,
				slug,
				technologies: filteredTechnologies,
				id: uuid(),
			};

			const { error } = await supabase.from("CaseStudy").insert([caseStudy]);
			if (error) {
				toast.error("Error adding case study: " + error.message);
				setLoading(false);
				return;
			}

			setCaseStudies([...caseStudies, caseStudy]);
			toast.success(`${caseStudy.title} has been added successfully!`);
			resetForm();
		}
		setLoading(false);
	};

	// Delete case study
	const handleDeleteCaseStudy = async (id: string) => {
		setLoading(true);
		const { error } = await supabase.from("CaseStudy").delete().eq("id", id);
		if (error) {
			toast.error("Error deleting case study: " + error.message);
			setLoading(false);
			return;
		}
		setCaseStudies(caseStudies.filter(cs => cs.id !== id));
		toast.success("Case study deleted successfully!");
		setLoading(false);

		if (id === editingCaseStudyId) {
			setEditingCaseStudyId(null);
			resetForm();
		}
	};

	// Edit case study
	const handleEditCaseStudy = (caseStudy: CaseStudy) => {
		setEditingCaseStudyId(caseStudy.id);
		setNewCaseStudy({
			title: caseStudy.title,
			description: caseStudy.description,
			imageUrl: caseStudy.imageUrl,
			slug: caseStudy.slug,
			content: caseStudy.content || "",
			technologies: caseStudy.technologies || [""],
			clientName: caseStudy.clientName || "",
			projectDate: caseStudy.projectDate || "",
			projectUrl: caseStudy.projectUrl || "",
			githubUrl: caseStudy.githubUrl || "",
		});
	};

	// Cancel editing
	const handleCancelEditing = () => {
		setEditingCaseStudyId(null);
		resetForm();
	};

	// Reset form
	const resetForm = () => {
		setNewCaseStudy({
			title: "",
			description: "",
			imageUrl: "",
			slug: "",
			content: "",
			technologies: [""],
			clientName: "",
			projectDate: "",
			projectUrl: "",
			githubUrl: "",
		});
	};

	// Handle technologies input
	const handleTechnologiesChange = (index: number, value: string) => {
		const updatedTechnologies = [...(newCaseStudy.technologies || [])];
		updatedTechnologies[index] = value;
		setNewCaseStudy({ ...newCaseStudy, technologies: updatedTechnologies });
	};

	const addTechnologyField = () => {
		setNewCaseStudy({
			...newCaseStudy,
			technologies: [...(newCaseStudy.technologies || []), ""]
		});
	};

	const removeTechnologyField = (index: number) => {
		const updatedTechnologies = [...(newCaseStudy.technologies || [])];
		updatedTechnologies.splice(index, 1);
		setNewCaseStudy({ ...newCaseStudy, technologies: updatedTechnologies });
	};

	return (
		<div className="space-y-8 p-4">
			<h2 className="text-2xl font-bold">Manage Case Studies</h2>

			{/* Case Study Form */}
			<div className="bg-white p-6 shadow rounded grid gap-4">
				<h3 className="text-xl font-semibold">
					{editingCaseStudyId ? "Edit Case Study" : "Add New Case Study"}
				</h3>
				
				<Input
					placeholder="Case Study Title *"
					value={newCaseStudy.title}
					className="text-black"
					onChange={(e) => {
						const title = e.target.value;
						setNewCaseStudy({ 
							...newCaseStudy, 
							title,
							slug: generateSlug(title)
						});
					}}
				/>
				
				<Input
					placeholder="Slug (auto-generated from title)"
					value={newCaseStudy.slug}
					className="text-black"
					onChange={(e) => setNewCaseStudy({ ...newCaseStudy, slug: e.target.value })}
				/>
				
				<Textarea
					placeholder="Case Study Description *"
					value={newCaseStudy.description}
					className="text-black"
					onChange={(e) => setNewCaseStudy({ ...newCaseStudy, description: e.target.value })}
				/>

				{/* Image URL */}
				<div className="space-y-2">
					<label className="block text-sm font-medium text-gray-700">
						Case Study Image URL *
					</label>
					<Input
						placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
						value={newCaseStudy.imageUrl}
						className="text-black"
						onChange={(e) => setNewCaseStudy({ ...newCaseStudy, imageUrl: e.target.value })}
					/>
					{newCaseStudy.imageUrl && (
						<div className="mt-2">
							<p className="text-sm text-gray-500 mb-1">Image preview:</p>
							<img
								src={newCaseStudy.imageUrl}
								alt="Preview"
								className="h-32 w-auto object-cover rounded border"
								onError={(e) => {
									e.currentTarget.style.display = 'none';
								}}
							/>
						</div>
					)}
				</div>

				<Textarea
					placeholder="Detailed Content (optional)"
					value={newCaseStudy.content}
					className="text-black min-h-32"
					onChange={(e) => setNewCaseStudy({ ...newCaseStudy, content: e.target.value })}
				/>

				<Input
					placeholder="Client Name (optional)"
					value={newCaseStudy.clientName}
					className="text-black"
					onChange={(e) => setNewCaseStudy({ ...newCaseStudy, clientName: e.target.value })}
				/>

				<Input
					type="date"
					placeholder="Project Date (optional)"
					value={newCaseStudy.projectDate}
					className="text-black"
					onChange={(e) => setNewCaseStudy({ ...newCaseStudy, projectDate: e.target.value })}
				/>

				<Input
					placeholder="Project URL (optional)"
					value={newCaseStudy.projectUrl}
					className="text-black"
					onChange={(e) => setNewCaseStudy({ ...newCaseStudy, projectUrl: e.target.value })}
				/>

				<Input
					placeholder="GitHub URL (optional)"
					value={newCaseStudy.githubUrl}
					className="text-black"
					onChange={(e) => setNewCaseStudy({ ...newCaseStudy, githubUrl: e.target.value })}
				/>

				{/* Technologies */}
				<div className="space-y-2">
					<label className="block text-sm font-medium text-gray-700">
						Technologies Used (optional)
					</label>
					{newCaseStudy.technologies?.map((tech, index) => (
						<div key={index} className="flex gap-2">
							<Input
								placeholder={`Technology ${index + 1}`}
								value={tech}
								className="text-black"
								onChange={(e) => handleTechnologiesChange(index, e.target.value)}
							/>
							{newCaseStudy.technologies!.length > 1 && (
								<Button
									type="button"
									variant="destructive"
									onClick={() => removeTechnologyField(index)}
									className="px-3"
								>
									×
								</Button>
							)}
						</div>
					))}
					<Button
						type="button"
						variant="outline"
						onClick={addTechnologyField}
						className="mt-2"
					>
						+ Add Technology
					</Button>
				</div>

				<div className="flex gap-2">
					<Button
						className="bg-primary-300"
						onClick={handleAddOrUpdateCaseStudy}
						disabled={loading}
					>
						{loading ? (
							<Spinner />
						) : editingCaseStudyId ? (
							"Update Case Study"
						) : (
							"Add Case Study"
						)}
					</Button>
					{editingCaseStudyId && (
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

			{/* Case Studies Listing */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4">
				{caseStudies.map((caseStudy) => (
					<div
						key={caseStudy.id}
						className="bg-gray-50 border border-gray-200 p-4 rounded shadow-sm"
					>
						{caseStudy.imageUrl && (
							<img
								src={caseStudy.imageUrl}
								alt={caseStudy.title}
								className="w-full h-32 object-cover rounded mb-3"
							/>
						)}
						<h3 className="text-lg font-bold mb-2">{caseStudy.title}</h3>
						<p className="text-sm text-gray-600 mb-2">{caseStudy.description}</p>
						{caseStudy.clientName && (
							<p className="text-xs text-gray-500 mb-2">Client: {caseStudy.clientName}</p>
						)}
						{caseStudy.technologies && caseStudy.technologies.length > 0 && (
							<div className="flex flex-wrap gap-1 mb-3">
								{caseStudy.technologies.map((tech, index) => (
									<span
										key={index}
										className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
									>
										{tech}
									</span>
								))}
							</div>
						)}
						<div className="flex gap-2">
							<Button
								className="bg-primary-300"
								onClick={() => handleEditCaseStudy(caseStudy)}
							>
								Edit
							</Button>
							<Button
								variant="destructive"
								className="bg-red-300"
								onClick={() => handleDeleteCaseStudy(caseStudy.id)}
							>
								<svg
									width="15"
									height="15"
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5Z"
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
