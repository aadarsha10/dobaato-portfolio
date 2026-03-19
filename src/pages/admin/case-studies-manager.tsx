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
import type {CaseStudy} from "../../types";

export default function CaseStudiesManager() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const [editingCaseStudyId, setEditingCaseStudyId] = useState<string | null>(
    null,
  );

  // Fetch case studies from Supabase
  useEffect(() => {
    const fetchCaseStudies = async () => {
      const {data, error} = await supabase.from("CaseStudy").select("*");
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
    if (
      !newCaseStudy.title ||
      !newCaseStudy.description ||
      !newCaseStudy.imageUrl
    ) {
      toast.error(
        "Please fill in all required fields (title, description, image).",
      );
      return;
    }

    setLoading(true);

    // Generate slug if not provided
    const slug = newCaseStudy.slug || generateSlug(newCaseStudy.title);

    // Filter out empty technologies
    const filteredTechnologies =
      newCaseStudy.technologies?.filter((tech) => tech.trim() !== "") || [];

    if (editingCaseStudyId) {
      // Update existing case study
      const updatedCaseStudy: CaseStudy = {
        ...newCaseStudy,
        slug,
        technologies: filteredTechnologies,
        id: editingCaseStudyId,
      };

      const {error} = await supabase
        .from("CaseStudy")
        .update(updatedCaseStudy)
        .eq("id", editingCaseStudyId);

      if (error) {
        toast.error("Error updating case study: " + error.message);
        setLoading(false);
        return;
      }

      setCaseStudies(
        caseStudies.map((cs) =>
          cs.id === editingCaseStudyId ? updatedCaseStudy : cs,
        ),
      );
      toast.success("Case study updated successfully!");
      setEditingCaseStudyId(null);
      resetForm();
      setIsModalOpen(false);
    } else {
      // Add new case study
      const caseStudy: CaseStudy = {
        ...newCaseStudy,
        slug,
        technologies: filteredTechnologies,
        id: uuid(),
      };

      const {error} = await supabase.from("CaseStudy").insert([caseStudy]);
      if (error) {
        toast.error("Error adding case study: " + error.message);
        setLoading(false);
        return;
      }

      setCaseStudies([...caseStudies, caseStudy]);
      toast.success(`${caseStudy.title} has been added successfully!`);
      resetForm();
      setIsModalOpen(false);
    }
    setLoading(false);
  };

  // Delete case study
  const handleDeleteCaseStudy = async (id: string) => {
    setLoading(true);
    const {error} = await supabase.from("CaseStudy").delete().eq("id", id);
    if (error) {
      toast.error("Error deleting case study: " + error.message);
      setLoading(false);
      return;
    }
    setCaseStudies(caseStudies.filter((cs) => cs.id !== id));
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
    setIsModalOpen(true);
  };

  // Cancel editing
  const handleCancelEditing = () => {
    setEditingCaseStudyId(null);
    resetForm();
    setIsModalOpen(false);
  };

  const handleOpenCreateModal = () => {
    setEditingCaseStudyId(null);
    resetForm();
    setIsModalOpen(true);
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
    setNewCaseStudy({...newCaseStudy, technologies: updatedTechnologies});
  };

  const addTechnologyField = () => {
    setNewCaseStudy({
      ...newCaseStudy,
      technologies: [...(newCaseStudy.technologies || []), ""],
    });
  };

  const removeTechnologyField = (index: number) => {
    const updatedTechnologies = [...(newCaseStudy.technologies || [])];
    updatedTechnologies.splice(index, 1);
    setNewCaseStudy({...newCaseStudy, technologies: updatedTechnologies});
  };

  return (
    <div className="space-y-6 p-4">
      <AdminSectionHeader
        title="Manage Case Studies"
        description="Showcase long-form project stories with links and technologies."
        buttonLabel="Add Case Study"
        onButtonClick={handleOpenCreateModal}
      />

      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
        {caseStudies.map((caseStudy) => (
          <div
            key={caseStudy.id}
            className="relative flex min-h-[340px] h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="pointer-events-none absolute right-0 top-0 h-14 w-20 bg-gradient-to-bl from-primary-500/20 to-sky-400/10 [clip-path:polygon(100%_0,0_0,100%_100%)]" />
            {caseStudy.imageUrl && (
              <img
                src={caseStudy.imageUrl}
                alt={caseStudy.title}
                className="w-full h-32 object-cover rounded mb-3"
              />
            )}
            <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-slate-100">
              {caseStudy.title}
            </h3>
            <p className="mb-2 line-clamp-5 text-sm text-slate-600 dark:text-slate-300">
              {caseStudy.description}
            </p>
            {caseStudy.clientName && (
              <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
                Client: {caseStudy.clientName}
              </p>
            )}
            {caseStudy.technologies && caseStudy.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {caseStudy.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-auto pt-4 flex gap-2">
              <Button
                className="bg-amber-500 text-white hover:bg-amber-600"
                onClick={() => handleEditCaseStudy(caseStudy)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                className="bg-rose-600 text-white hover:bg-rose-700"
                onClick={() => handleDeleteCaseStudy(caseStudy.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AdminModal
        open={isModalOpen}
        title={editingCaseStudyId ? "Edit Case Study" : "Add New Case Study"}
        description="Title, description and image URL are required."
        onClose={handleCancelEditing}
      >
        <div className="grid gap-4">
          <Input
            placeholder="Case Study Title *"
            value={newCaseStudy.title}
            onChange={(e) => {
              const title = e.target.value;
              setNewCaseStudy({
                ...newCaseStudy,
                title,
                slug: generateSlug(title),
              });
            }}
          />
          <Input
            placeholder="Slug"
            value={newCaseStudy.slug}
            onChange={(e) =>
              setNewCaseStudy({...newCaseStudy, slug: e.target.value})
            }
          />
          <Textarea
            placeholder="Case Study Description *"
            value={newCaseStudy.description}
            onChange={(e) =>
              setNewCaseStudy({
                ...newCaseStudy,
                description: e.target.value,
              })
            }
          />
          <Input
            placeholder="Image URL *"
            value={newCaseStudy.imageUrl}
            onChange={(e) =>
              setNewCaseStudy({
                ...newCaseStudy,
                imageUrl: e.target.value,
              })
            }
          />
          <Textarea
            placeholder="Detailed Content"
            value={newCaseStudy.content}
            onChange={(e) =>
              setNewCaseStudy({...newCaseStudy, content: e.target.value})
            }
          />
          <Input
            placeholder="Client Name"
            value={newCaseStudy.clientName}
            onChange={(e) =>
              setNewCaseStudy({
                ...newCaseStudy,
                clientName: e.target.value,
              })
            }
          />
          <Input
            type="date"
            value={newCaseStudy.projectDate}
            onChange={(e) =>
              setNewCaseStudy({
                ...newCaseStudy,
                projectDate: e.target.value,
              })
            }
          />
          <Input
            placeholder="Project URL"
            value={newCaseStudy.projectUrl}
            onChange={(e) =>
              setNewCaseStudy({
                ...newCaseStudy,
                projectUrl: e.target.value,
              })
            }
          />
          <Input
            placeholder="GitHub URL"
            value={newCaseStudy.githubUrl}
            onChange={(e) =>
              setNewCaseStudy({
                ...newCaseStudy,
                githubUrl: e.target.value,
              })
            }
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Technologies
            </label>
            {newCaseStudy.technologies?.map((tech, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Technology ${index + 1}`}
                  value={tech}
                  onChange={(e) =>
                    handleTechnologiesChange(index, e.target.value)
                  }
                />
                {newCaseStudy.technologies!.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    className="bg-rose-600 text-white hover:bg-rose-700"
                    onClick={() => removeTechnologyField(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
              onClick={addTechnologyField}
            >
              Add Technology
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              className="bg-emerald-600 text-white hover:bg-emerald-700"
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
