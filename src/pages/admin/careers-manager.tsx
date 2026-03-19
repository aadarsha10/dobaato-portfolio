import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {v4 as uuid} from "uuid";
import AdminModal from "../../components/ui/admin/AdminModal";
import AdminSectionHeader from "../../components/ui/admin/AdminSectionHeader";
import {Button} from "../../components/ui/button";
import {Input} from "../../components/ui/input";
import {Spinner} from "../../components/ui/spinner";
import {Textarea} from "../../components/ui/textarea";
import {supabase} from "../../SupabaseClient";
import type {Job, JobType, LocationType} from "../../types/careers";
import {formatJobDescription} from "../../utils/formatters";

export default function CareersManager() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      const {data, error} = await supabase.from("Job").select("*");
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
      (req) => req.trim() !== "",
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

      const {error} = await supabase
        .from("Job")
        .update(updatedJob)
        .eq("id", editingJobId);
      if (error) {
        toast.error("Error updating job: " + error.message);
        setLoading(false);
        return;
      }
      setJobs(jobs.map((job) => (job.id === editingJobId ? updatedJob : job)));
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
      setIsModalOpen(false);
    } else {
      // Adding a new job.
      const job: Job = {
        ...newJob,
        requirements: filteredRequirements,
        id: uuid(),
        postedAt: new Date().toLocaleDateString(),
      };

      const {error} = await supabase.from("Job").insert([job]);
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
      setIsModalOpen(false);
    }
    setLoading(false);
  };

  const handleDeleteJob = async (id: string) => {
    setLoading(true);
    const {error} = await supabase.from("Job").delete().eq("id", id);
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
    setIsModalOpen(true);
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
    setIsModalOpen(false);
  };

  const handleOpenCreateModal = () => {
    setEditingJobId(null);
    setNewJob({
      title: "",
      type: "Full-time",
      location: "On-site",
      description: "",
      requirements: [""],
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 p-4">
      <AdminSectionHeader
        title="Manage Jobs"
        description="Create and maintain open roles shown on the careers page."
        buttonLabel="Add Job"
        onButtonClick={handleOpenCreateModal}
      />

      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="relative flex min-h-[320px] h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="pointer-events-none absolute right-0 top-0 h-14 w-20 bg-gradient-to-bl from-primary-500/20 to-sky-400/10 [clip-path:polygon(100%_0,0_0,100%_100%)]" />
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                {job.type}
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {job.location}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {job.title}
            </h3>
            <div className="mt-2 space-y-2 line-clamp-6 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {formatJobDescription(job.description)
                .slice(0, 2)
                .map((paragraph) => (
                  <div key={paragraph.id}>
                    {paragraph.lines.slice(0, 2).map((line, lineIdx) => (
                      <div key={lineIdx}>{line}</div>
                    ))}
                    {paragraph.lines.length > 2 && (
                      <div className="text-xs italic opacity-75">
                        +{paragraph.lines.length - 2} more lines...
                      </div>
                    )}
                  </div>
                ))}
            </div>
            {job.requirements && job.requirements.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Requirements ({job.requirements.length}):
                </p>
                <ul className="mt-1 space-y-1">
                  {job.requirements.slice(0, 2).map((req, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-slate-600 dark:text-slate-400"
                    >
                      • {req}
                    </li>
                  ))}
                  {job.requirements.length > 2 && (
                    <li className="text-xs text-slate-500 dark:text-slate-500 italic">
                      +{job.requirements.length - 2} more
                    </li>
                  )}
                </ul>
              </div>
            )}
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Posted: {job.postedAt}
            </p>
            <div className="mt-auto pt-4 flex gap-2">
              <Button
                className="bg-amber-500 text-white hover:bg-amber-600"
                onClick={() => handleEditClick(job)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                className="bg-rose-600 text-white hover:bg-rose-700"
                onClick={() => handleDeleteJob(job.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AdminModal
        open={isModalOpen}
        title={editingJobId ? "Edit Job" : "Add New Job"}
        description="Provide core role details."
        onClose={handleCancelEditing}
      >
        <div className="grid gap-4">
          <Input
            placeholder="Job Title"
            value={newJob.title}
            onChange={(e) => setNewJob({...newJob, title: e.target.value})}
          />
          <Input
            placeholder="Job Type (e.g. Full-time)"
            value={newJob.type}
            onChange={(e) =>
              setNewJob({
                ...newJob,
                type: e.target.value as JobType,
              })
            }
          />
          <Input
            placeholder="Location (e.g. Remote)"
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
              setNewJob({...newJob, description: e.target.value})
            }
          />
          {newJob.description && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
              <p className="mb-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                Preview:
              </p>
              <div className="space-y-2 text-xs leading-5 text-slate-600 dark:text-slate-300">
                {formatJobDescription(newJob.description).map((paragraph) => (
                  <div key={paragraph.id}>
                    {paragraph.lines.map((line, lineIdx) => (
                      <div key={lineIdx}>{line}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Requirements
            </label>
            {newJob.requirements.map((req, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Requirement ${index + 1}`}
                  value={req}
                  onChange={(e) => {
                    const updatedRequirements = [...newJob.requirements];
                    updatedRequirements[index] = e.target.value;
                    setNewJob({...newJob, requirements: updatedRequirements});
                  }}
                />
                <Button
                  variant="destructive"
                  className="bg-rose-600 text-white hover:bg-rose-700 px-3"
                  onClick={() => {
                    setNewJob({
                      ...newJob,
                      requirements: newJob.requirements.filter(
                        (_, i) => i !== index,
                      ),
                    });
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600 w-full"
              onClick={() => {
                setNewJob({
                  ...newJob,
                  requirements: [...newJob.requirements, ""],
                });
              }}
            >
              + Add Requirement
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              className="bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={handleAddOrUpdateJob}
            >
              {loading ? <Spinner /> : editingJobId ? "Update Job" : "Add Job"}
            </Button>
            <Button
              variant="secondary"
              className="bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
              onClick={handleCancelEditing}
            >
              Cancel
            </Button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
