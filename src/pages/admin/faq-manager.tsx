import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import AdminModal from "../../components/ui/admin/AdminModal";
import AdminSectionHeader from "../../components/ui/admin/AdminSectionHeader";
import {Button} from "../../components/ui/button";
import {Input} from "../../components/ui/input";
import {Spinner} from "../../components/ui/spinner";
import {Textarea} from "../../components/ui/textarea";
import {supabase} from "../../SupabaseClient";
import type {FAQ} from "../../types";

export default function FAQManager() {
  const [faqs, setFAQs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // This state is used to manage adding/updating FAQ.
  const [newFAQ, setNewFAQ] = useState<Omit<FAQ, "id">>({
    question: "",
    answer: "",
  });
  // Holds the id of the FAQ being edited (if any).
  const [editingFAQId, setEditingFAQId] = useState<string | null>(null);

  // Fetch FAQs from Supabase.
  const fetchFAQs = async () => {
    const {data, error} = await supabase.from("faq").select("*");
    if (error) {
      toast.error(error.message);
    } else {
      setFAQs(data || []);
    }
  };

  // Add or update FAQ based on editingFAQId.
  const handleAddOrUpdateFAQ = async () => {
    if (!newFAQ.question || !newFAQ.answer) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }
    setLoading(true);

    if (editingFAQId) {
      // Update logic.
      const updatedFAQ: FAQ = {
        ...newFAQ,
        id: editingFAQId,
      };

      const {error} = await supabase
        .from("faq")
        .update(updatedFAQ)
        .eq("id", editingFAQId);

      if (error) {
        toast.error("Error updating FAQ: " + error.message);
        setLoading(false);
        return;
      }
      setFAQs(faqs.map((faq) => (faq.id === editingFAQId ? updatedFAQ : faq)));
      toast.success("FAQ updated successfully!");
      setEditingFAQId(null);
      setNewFAQ({question: "", answer: ""});
      setIsModalOpen(false);
    } else {
      // Add logic.
      const {data, error} = await supabase
        .from("faq")
        .insert([{question: newFAQ.question, answer: newFAQ.answer}])
        .select();

      if (error) {
        toast.error("Error adding FAQ: " + error.message);
        setLoading(false);
        return;
      }
      // Assume data[0] is the new FAQ record.
      setFAQs([...faqs, data[0]]);
      toast.success("FAQ added successfully!");
      setNewFAQ({question: "", answer: ""});
      setIsModalOpen(false);
    }
    setLoading(false);
  };

  // Delete an FAQ.
  const handleDeleteFAQ = async (id: string) => {
    setLoading(true);
    const {error} = await supabase.from("faq").delete().eq("id", id);
    if (error) {
      toast.error("Error deleting FAQ: " + error.message);
      setLoading(false);
      return;
    }
    setFAQs(faqs.filter((faq) => faq.id !== id));
    toast.success("FAQ deleted successfully!");
    setLoading(false);
    // Clear edit mode in case the deleted FAQ was being edited.
    if (id === editingFAQId) {
      setEditingFAQId(null);
      setNewFAQ({question: "", answer: ""});
    }
  };

  // Populate form for editing.
  const handleEditFAQ = (faq: FAQ) => {
    setEditingFAQId(faq.id);
    setNewFAQ({question: faq.question, answer: faq.answer});
    setIsModalOpen(true);
  };

  // Cancel editing mode.
  const handleCancelEditing = () => {
    setEditingFAQId(null);
    setNewFAQ({question: "", answer: ""});
    setIsModalOpen(false);
  };

  const handleOpenCreateModal = () => {
    setEditingFAQId(null);
    setNewFAQ({question: "", answer: ""});
    setIsModalOpen(true);
  };

  // Fetch FAQs on component mount.
  useEffect(() => {
    fetchFAQs();
  }, []);

  return (
    <div className="space-y-6 p-4">
      <AdminSectionHeader
        title="Manage FAQs"
        description="Create concise questions and answers displayed on the public FAQ section."
        buttonLabel="Add FAQ"
        onButtonClick={handleOpenCreateModal}
      />

      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="relative flex min-h-[280px] h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="pointer-events-none absolute right-0 top-0 h-14 w-20 bg-gradient-to-bl from-primary-500/20 to-sky-400/10 [clip-path:polygon(100%_0,0_0,100%_100%)]" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 font-domine">
              {faq.question}
            </h3>
            <p className="mt-2 line-clamp-6 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {faq.answer}
            </p>
            <div className="mt-auto pt-4 flex gap-2">
              <Button
                className="bg-amber-500 text-white hover:bg-amber-600"
                onClick={() => handleEditFAQ(faq)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                className="bg-rose-600 text-white hover:bg-rose-700"
                onClick={() => handleDeleteFAQ(faq.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AdminModal
        open={isModalOpen}
        title={editingFAQId ? "Edit FAQ" : "Add New FAQ"}
        description="All fields are required."
        onClose={handleCancelEditing}
      >
        <div className="grid gap-4">
          <Input
            placeholder="Question"
            value={newFAQ.question}
            onChange={(e) => setNewFAQ({...newFAQ, question: e.target.value})}
          />
          <Textarea
            placeholder="Answer"
            value={newFAQ.answer}
            onChange={(e) => setNewFAQ({...newFAQ, answer: e.target.value})}
          />
          <div className="flex gap-2">
            <Button
              className="bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={handleAddOrUpdateFAQ}
            >
              {loading ? <Spinner /> : editingFAQId ? "Update FAQ" : "Add FAQ"}
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
