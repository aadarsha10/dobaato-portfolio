import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import type { Job, JobType, LocationType } from "../../types/careers";
import toast from "react-hot-toast";
import { supabase } from "../../SupabaseClient";
import { v4 as uuid } from "uuid";
import { Spinner } from "../../components/ui/spinner";

export default function CareersManager() {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	// This form state is used for both creating and updating a job.
	const [newJob, setNewJob] = useState<Omit<Job, "id" | "postedAt">>({
		title: "",
		type: "Full-time",
		location: "On-site",
		description: "",
		requirements: [""],
	});
	// Holds the id of the job being edited (if any).
	const [editingJobId, setEditingJobId] = useState<string | null>(null);

	useEffect(() => {
		const fetchJobs = async () => {
			const { data, error } = await supabase.from("Job").select("*");
			if (error) {
				toast.error("Error fetching jobs");
				return;
			}
			setJobs(data || []);
		};
		fetchJobs();
	}, []);

	const handleAddOrUpdateJob = async () => {
		if (
			!newJob.title ||
			!newJob.type ||
			!newJob.location ||
			!newJob.description
		) {
			toast.error("Please fill in all fields before submitting.");
			return;
		}

		setLoading(true);
		const filteredRequirements = newJob.requirements.filter(
			(req) => req.trim() !== ""
		);

		// When editingJobId is set, update the job.
		if (editingJobId) {
			const updatedJob: Job = {
				...newJob,
				requirements: filteredRequirements,
				id: editingJobId,
				postedAt:
					jobs.find((job) => job.id === editingJobId)?.postedAt ||
					new Date().toLocaleDateString(),
			};

			const { error } = await supabase
				.from("Job")
				.update(updatedJob)
				.eq("id", editingJobId);
			if (error) {
				toast.error("Error updating job: " + error.message);
				setLoading(false);
				return;
			}
			setJobs(
				jobs.map((job) => (job.id === editingJobId ? updatedJob : job))
			);
			toast.success("Job updated successfully!");
			// Reset editing mode and clear the form.
			setEditingJobId(null);
			setNewJob({
				title: "",
				type: "Full-time",
				location: "On-site",
				description: "",
				requirements: [""],
			});
		} else {
			// Adding a new job.
			const job: Job = {
				...newJob,
				requirements: filteredRequirements,
				id: uuid(),
				postedAt: new Date().toLocaleDateString(),
			};

			const { error } = await supabase.from("Job").insert([job]);
			if (error) {
				toast.error("Error adding job: " + error.message);
				setLoading(false);
				return;
			}
			setJobs([...jobs, job]);
			toast.success(`${job.title} has been added successfully!`);
			setNewJob({
				title: "",
				type: "Full-time",
				location: "On-site",
				description: "",
				requirements: [""],
			});
		}
		setLoading(false);
	};

	const handleDeleteJob = async (id: string) => {
		setLoading(true);
		const { error } = await supabase.from("Job").delete().eq("id", id);
		if (error) {
			toast.error("Error deleting job: " + error.message);
			setLoading(false);
			return;
		}
		setJobs(jobs.filter((job) => job.id !== id));
		toast.success("Job deleted successfully!");
		setLoading(false);
		// If the deleted job was in edit mode, clear the form.
		if (id === editingJobId) {
			setEditingJobId(null);
			setNewJob({
				title: "",
				type: "Full-time",
				location: "On-site",
				description: "",
				requirements: [""],
			});
		}
	};

	// Load the selected job's details into our single form.
	const handleEditClick = (job: Job) => {
		setEditingJobId(job.id);
		setNewJob({
			title: job.title,
			type: job.type,
			location: job.location,
			description: job.description,
			requirements: job.requirements,
		});
	};

	// Cancel editing and clear the form.
	const handleCancelEditing = () => {
		setEditingJobId(null);
		setNewJob({
			title: "",
			type: "Full-time",
			location: "On-site",
			description: "",
			requirements: [""],
		});
	};

	return (
		<div className="space-y-8 p-4">
			<h2 className="text-2xl font-bold">Manage Jobs</h2>

			{/* Job Form - for Adding or Editing */}
			<div className="bg-white p-6 shadow rounded grid gap-4">
				<h3 className="text-xl font-semibold">
					{editingJobId ? "Edit Job" : "Add New Job"}
				</h3>
				<Input
					placeholder="Job Title"
					value={newJob.title}
					onChange={(e) =>
						setNewJob({ ...newJob, title: e.target.value })
					}
				/>
				<Input
					placeholder="Job Type"
					value={newJob.type}
					onChange={(e) =>
						setNewJob({
							...newJob,
							type: e.target.value as JobType,
						})
					}
				/>
				<Input
					placeholder="Location"
					value={newJob.location}
					onChange={(e) =>
						setNewJob({
							...newJob,
							location: e.target.value as LocationType,
						})
					}
				/>
				<Textarea
					placeholder="Job Description"
					value={newJob.description}
					onChange={(e) =>
						setNewJob({ ...newJob, description: e.target.value })
					}
				/>
				<div className="flex gap-2">
					<Button
						className="bg-primary-300"
						onClick={handleAddOrUpdateJob}
					>
						{loading ? (
							<Spinner />
						) : editingJobId ? (
							"Update Job"
						) : (
							"Add Job"
						)}
					</Button>
					{editingJobId && (
						<Button
							className="border rounded-lg"
							onClick={handleCancelEditing}
						>
							Cancel
						</Button>
					)}
				</div>
			</div>

			{/* Job Listing */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 ">
				{jobs.map((job) => (
					<div
						key={job.id}
						className="bg-gray-50 border border-gray-200 p-4 rounded shadow-sm"
					>
						<h3 className="text-lg font-bold mb-2">{job.title}</h3>
						<p className="mb-2">{job.description}</p>
						<div className="flex gap-2">
							<Button
								className="bg-primary-300"
								onClick={() => handleEditClick(job)}
							>
								Edit
							</Button>
							<Button
								className="bg-red-300"
								onClick={() => handleDeleteJob(job.id)}
								variant="destructive"
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
										fill-rule="evenodd"
										clip-rule="evenodd"
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
