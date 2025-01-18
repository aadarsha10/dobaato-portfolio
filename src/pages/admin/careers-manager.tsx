import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import type { Job, JobType, LocationType } from "../../types/careers";
import toast from "react-hot-toast";

const LOCAL_STORAGE_KEY = "jobs_data";

export default function CareersManager() {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [newJob, setNewJob] = useState<Omit<Job, "id" | "postedAt">>({
		title: "",
		type: "Full-time",
		location: "On-site",
		description: "",
		requirements: [""],
	});

	// Load jobs from localStorage on mount
	useEffect(() => {
		const storedJobs = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (storedJobs) {
			setJobs(JSON.parse(storedJobs));
		}
	}, []); // Empty dependency array ensures this runs only on mount

	// Save jobs to localStorage whenever they change
	useEffect(() => {
		if (jobs.length > 0) {
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(jobs));
		}
	}, [jobs]);

	const handleAddJob = () => {
		if (
			!newJob.title ||
			!newJob.type ||
			!newJob.location ||
			!newJob.description
		) {
			toast.error("Please fill in all fields before adding a job.");
			return;
		}

		const filteredRequirements = newJob.requirements.filter(
			(req) => req.trim() !== ""
		);

		const job: Job = {
			...newJob,
			requirements: filteredRequirements,
			id: Date.now().toString(),
			postedAt: new Date().toLocaleDateString(),
		};

		const updatedJobs = [...jobs, job];
		setJobs(updatedJobs);

		setNewJob({
			title: "",
			type: "Full-time",
			location: "On-site",
			description: "",
			requirements: [""],
		});

		toast.success(`${job.title} has been added successfully!`);
	};

	const handleRequirementChange = (index: number, value: string) => {
		const updatedRequirements = [...newJob.requirements];
		updatedRequirements[index] = value;
		setNewJob({ ...newJob, requirements: updatedRequirements });
	};

	const addRequirementField = () => {
		setNewJob({ ...newJob, requirements: [...newJob.requirements, ""] });
	};

	const removeRequirementField = (index: number) => {
		const updatedRequirements = newJob.requirements.filter(
			(_, i) => i !== index
		);
		setNewJob({ ...newJob, requirements: updatedRequirements });
	};

	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-bold">Add New Job</h2>
			<div className="grid gap-4">
				<Input
					placeholder="Job Title"
					className="text-gray-800 dark:text-white"
					value={newJob.title}
					onChange={(e) =>
						setNewJob({ ...newJob, title: e.target.value })
					}
				/>
				<Input
					placeholder="Job Type (e.g., Full-time, Part-time, Contract, Remote)"
					className="text-gray-800 dark:text-white"
					value={newJob.type}
					onChange={(e) =>
						setNewJob({
							...newJob,
							type: e.target.value as JobType,
						})
					}
				/>
				<Input
					placeholder="Location (e.g., On-site, Remote, Hybrid)"
					className="text-gray-800 dark:text-white"
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
					className="text-gray-800 dark:text-white"
					value={newJob.description}
					onChange={(e) =>
						setNewJob({ ...newJob, description: e.target.value })
					}
				/>
				<div className="space-y-2">
					<h3 className="text-lg font-semibold">Requirements</h3>
					{newJob.requirements.map((req, index) => (
						<div key={index} className="flex items-center gap-2">
							<Input
								placeholder="Requirement"
								className="text-gray-800 dark:text-white"
								value={req}
								onChange={(e) =>
									handleRequirementChange(
										index,
										e.target.value
									)
								}
							/>
							<Button
								variant="secondary"
								onClick={() => removeRequirementField(index)}
							>
								Remove
							</Button>
						</div>
					))}
					<Button variant="outline" onClick={addRequirementField}>
						Add Requirement
					</Button>
				</div>
				<Button onClick={handleAddJob}>Add Job</Button>
			</div>
		</div>
	);
}
