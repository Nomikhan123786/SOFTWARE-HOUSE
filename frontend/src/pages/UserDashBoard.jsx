import { useState } from "react";
import api from "../api/axios";
import TicketCard from "../components/TicketCard";
import { useEffect } from "react";
const UserDashBoard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    projectType: "web",
    budget: "",
    deadline: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(" ");

  const load = async () => {
    setLoading(true);
    const res = await api.get("/projects/mine");
    setProjects(res.data.projects);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await api.post("/projects", form);
      setForm({
        title: "",
        description: "",
        projectType: "web",
        budget: "",
        deadline: "",
      });
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit request");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "mt-1.5 w-full rounded-md border border-line bg-canvas px-3 py-2 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
      <span className="font-mono text-xs uppercase tracking-widest text-ink/40">
        Client portal
      </span>
      <h1 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">
        My project requests
      </h1>
      <p className="mt-1 text-sm text-ink/50">
        Submit a new request and track its progress here.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[380px_1fr]">
        <form
          onSubmit={handleSubmit}
          className="h-fit rounded-card border border-line bg-paper p-6 shadow-sm"
        >
          <h3 className="font-display text-lg font-semibold">New request</h3>

          {error && (
            <div className="mt-3 rounded-md border border-status-rejected/30 bg-status-rejected/10 px-3 py-2 text-sm text-status-rejected">
              {error}
            </div>
          )}

          <label className="mt-4 block text-sm font-medium text-ink/80">
            Title
          </label>
          <input required className={inputClass} />

          <label className="mt-4 block text-sm font-medium text-ink/80">
            Description
          </label>
          <textarea required rows={4} className={inputClass} />

          <label className="mt-4 block text-sm font-medium text-ink/80">
            Project type
          </label>
          <select className={inputClass}>
            <option value="web">Website (Web Developer)</option>
            <option value="graphic">Graphic Design (Graphic Designer)</option>
            <option value="app">Mobile App (App Developer)</option>
          </select>

          <label className="mt-4 block text-sm font-medium text-ink/80">
            Budget (optional)
          </label>
          <input type="number" className={inputClass} />

          <label className="mt-4 block text-sm font-medium text-ink/80">
            Deadline (optional)
          </label>
          <input type="date" className={inputClass} />

          <button
            disabled={submitting}
            className="mt-6 w-full rounded-md bg-accent py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit request"}
          </button>
        </form>
        <div>
          <h3 className="font-display text-lg font-semibold">Your requests</h3>
          <div className="mt-3 space-y-3">
            {loading ? (
              <p className="text-sm text-ink/40">Loading...</p>
            ) : projects.length === 0 ? (
              <p className="rounded-card border border-dashed border-line px-4 py-10 text-center text-sm text-ink/40">
                No requests submitted yet — use the form to send your first
                project brief.
              </p>
            ) : (
              projects.map((p) => <TicketCard key={p._id} project={p} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
