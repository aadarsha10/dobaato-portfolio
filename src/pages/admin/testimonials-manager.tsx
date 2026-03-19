import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {v4 as uuidv4} from "uuid";
import AdminModal from "../../components/ui/admin/AdminModal";
import AdminSectionHeader from "../../components/ui/admin/AdminSectionHeader";
import {Button} from "../../components/ui/button";
import {Input} from "../../components/ui/input";
import {Spinner} from "../../components/ui/spinner";
import {Textarea} from "../../components/ui/textarea";
import {supabase} from "../../SupabaseClient";
import type {Testimonial} from "../../types";

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Form state for adding/editing a testimonial.
  const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, "id">>(
    {
      text: "",
      author: "",
      position: "",
      company: "",
    },
  );
  // Holds the ID of the testimonial being edited (if any).
  const [editingTestimonialId, setEditingTestimonialId] = useState<
    string | null
  >(null);

  // Fetch testimonials from the database
  const fetchTestimonials = async () => {
    const {data, error} = await supabase.from("Testimonial").select("*");
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

      const {error} = await supabase
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
          t.id === editingTestimonialId ? updatedTestimonial : t,
        ),
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
      setIsModalOpen(false);
    } else {
      // Add new testimonial.
      const testimonialWithId: Testimonial = {
        id: uuidv4(),
        ...newTestimonial,
      };

      const {data, error} = await supabase
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
      setIsModalOpen(false);
    }
    setLoading(false);
  };

  // Delete a testimonial.
  const handleDeleteTestimonial = async (id: string) => {
    setLoading(true);
    const {error} = await supabase.from("Testimonial").delete().eq("id", id);
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
    setIsModalOpen(true);
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
    setIsModalOpen(false);
  };

  const handleOpenCreateModal = () => {
    setEditingTestimonialId(null);
    setNewTestimonial({
      text: "",
      author: "",
      position: "",
      company: "",
    });
    setIsModalOpen(true);
  };

  // Fetch testimonials on component mount.
  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="space-y-6 p-4">
      <AdminSectionHeader
        title="Manage Testimonials"
        description="Add and maintain customer quotes that appear on the site."
        buttonLabel="Add Testimonial"
        onButtonClick={handleOpenCreateModal}
      />

      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="relative flex min-h-[300px] h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="pointer-events-none absolute right-0 top-0 h-14 w-20 bg-gradient-to-bl from-primary-500/20 to-sky-400/10 [clip-path:polygon(100%_0,0_0,100%_100%)]" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {testimonial.author}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {testimonial.position} at {testimonial.company}
            </p>
            <p className="mt-3 line-clamp-6 text-sm leading-6 text-slate-700 dark:text-slate-300">
              {testimonial.text}
            </p>
            <div className="mt-auto pt-4 flex gap-2">
              <Button
                className="bg-amber-500 text-white hover:bg-amber-600"
                onClick={() => handleEditTestimonial(testimonial)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                className="bg-rose-600 text-white hover:bg-rose-700"
                onClick={() => handleDeleteTestimonial(testimonial.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AdminModal
        open={isModalOpen}
        title={
          editingTestimonialId ? "Edit Testimonial" : "Add New Testimonial"
        }
        description="All fields are required."
        onClose={handleCancelEditing}
      >
        <div className="grid gap-4">
          <Input
            placeholder="Author"
            value={newTestimonial.author}
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
            onChange={(e) =>
              setNewTestimonial({
                ...newTestimonial,
                text: e.target.value,
              })
            }
          />
          <div className="flex gap-2">
            <Button
              className="bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={handleAddOrUpdateTestimonial}
            >
              {loading ? (
                <Spinner />
              ) : editingTestimonialId ? (
                "Update Testimonial"
              ) : (
                "Add Testimonial"
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
