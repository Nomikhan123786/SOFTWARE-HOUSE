import { useEffect, useState } from "react";
import api from "../api/axios";
import TicketCard from "../components/TicketCard";

const TYPE_TO_ROLE = {
  web: "webdeveloper",
  graphic: "graphicdesigner",
  app: "appdeveloper",
};
const ROLE_LABELS = {
  webdeveloper: "Web Developer",
  graphicdesigner: "Graphic Designer",
  appdeveloper: "App Developer",
};
const ROLE_DOT = {
  webdeveloper: "bg-role-web",
  graphicdesigner: "bg-role-graphic",
  appdeveloper: "bg-role-app",
};

export default function AdminDashboard() {
  const [tab, setTab] = useState("requests");
  const [projects, setProjects] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [staffForm, setStaffForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "webdeveloper",
  });
  const [staffMsg, setStaffMsg] = useState("");
  const [staffErr, setStaffErr] = useState("");

  const loadAll = async () => {
    setLoading(true);
    const [reqRes, staffRes] = await Promise.all([
      api.get("/admin/requests"),
      api.get("/admin/staff"),
    ]);
    setProjects(reqRes.data.projects);
    setStaff(staffRes.data.staff);
    setLoading(false);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleCreateStaff = async (e) => {
    e.preventDefault();
    setStaffMsg("");
    setStaffErr("");
    try {
      await api.post("/admin/staff", staffForm);
      setStaffMsg(
        `${ROLE_LABELS[staffForm.role]} account created successfully.`,
      );
      setStaffForm({ name: "", email: "", password: "", role: "webdeveloper" });
      await loadAll();
    } catch (err) {
      setStaffErr(
        err.response?.data?.message || "Failed to create staff account",
      );
    }
  };

  const assignTo = async (projectId, staffId) => {
    await api.patch(`/admin/requests/${projectId}/assign`, {
      assignedTo: staffId,
    });
    await loadAll();
  };

  const changeStatus = async (projectId, status) => {
    await api.patch(`/admin/requests/${projectId}/assign`, { status });
    await loadAll();
  };

  const staffForType = (projectType) =>
    staff.filter((s) => s.role === TYPE_TO_ROLE[projectType]);

  const inputClass =
    "mt-1.5 w-full rounded-md border border-line bg-canvas px-3 py-2 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";
  const selectSmall =
    "rounded-md border border-line bg-canvas px-2.5 py-1.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
      <span className="font-mono text-xs uppercase tracking-widest text-ink/40">
        Control room
      </span>
      <h1 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">
        Admin dashboard
      </h1>
      <p className="mt-1 text-sm text-ink/50">
        Create specialist accounts and manage every project request in the
        studio.
      </p>

      <div className="mt-6 flex gap-2 border-b border-line">
        <button
          onClick={() => setTab("requests")}
          className={`border-b-2 px-1 pb-3 text-sm font-medium transition ${
            tab === "requests"
              ? "border-accent text-accent"
              : "border-transparent text-ink/50 hover:text-ink"
          }`}
        >
          All requests ({projects.length})
        </button>
        <button
          onClick={() => setTab("staff")}
          className={`border-b-2 px-1 pb-3 text-sm font-medium transition ml-6 ${
            tab === "staff"
              ? "border-accent text-accent"
              : "border-transparent text-ink/50 hover:text-ink"
          }`}
        >
          Manage staff ({staff.length})
        </button>
      </div>

      {loading && <p className="mt-8 text-sm text-ink/40">Loading...</p>}

      {!loading && tab === "requests" && (
        <div className="mt-6 space-y-3">
          {projects.length === 0 && (
            <p className="rounded-card border border-dashed border-line px-4 py-10 text-center text-sm text-ink/40">
              No requests yet.
            </p>
          )}
          {projects.map((p) => (
            <TicketCard key={p._id} project={p}>
              <div className="flex flex-wrap gap-2">
                <select
                  value={p.assignedTo?._id || ""}
                  onChange={(e) => assignTo(p._id, e.target.value)}
                  className={selectSmall}
                >
                  <option value="">Assign staff...</option>
                  {staffForType(p.projectType).map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <select
                  value={p.status}
                  onChange={(e) => changeStatus(p._id, e.target.value)}
                  className={selectSmall}
                >
                  <option value="pending">pending</option>
                  <option value="assigned">assigned</option>
                  <option value="in-progress">in-progress</option>
                  <option value="completed">completed</option>
                  <option value="rejected">rejected</option>
                </select>
              </div>
            </TicketCard>
          ))}
        </div>
      )}

      {!loading && tab === "staff" && (
        <div className="mt-6 grid gap-6 lg:grid-cols-[380px_1fr]">
          <form
            onSubmit={handleCreateStaff}
            className="h-fit rounded-card border border-line bg-paper p-6 shadow-sm"
          >
            <h3 className="font-display text-lg font-semibold">
              Create staff account
            </h3>
            {staffMsg && (
              <div className="mt-3 rounded-md border border-status-completed/30 bg-status-completed/10 px-3 py-2 text-sm text-status-completed">
                {staffMsg}
              </div>
            )}
            {staffErr && (
              <div className="mt-3 rounded-md border border-status-rejected/30 bg-status-rejected/10 px-3 py-2 text-sm text-status-rejected">
                {staffErr}
              </div>
            )}

            <label className="mt-4 block text-sm font-medium text-ink/80">
              Role
            </label>
            <select
              value={staffForm.role}
              onChange={(e) =>
                setStaffForm({ ...staffForm, role: e.target.value })
              }
              className={inputClass}
            >
              <option value="webdeveloper">Web Developer</option>
              <option value="graphicdesigner">Graphic Designer</option>
              <option value="appdeveloper">App Developer</option>
            </select>

            <label className="mt-4 block text-sm font-medium text-ink/80">
              Name
            </label>
            <input
              required
              value={staffForm.name}
              onChange={(e) =>
                setStaffForm({ ...staffForm, name: e.target.value })
              }
              className={inputClass}
            />

            <label className="mt-4 block text-sm font-medium text-ink/80">
              Email
            </label>
            <input
              type="email"
              required
              value={staffForm.email}
              onChange={(e) =>
                setStaffForm({ ...staffForm, email: e.target.value })
              }
              className={inputClass}
            />

            <label className="mt-4 block text-sm font-medium text-ink/80">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={staffForm.password}
              onChange={(e) =>
                setStaffForm({ ...staffForm, password: e.target.value })
              }
              className={inputClass}
            />

            <button className="mt-6 w-full rounded-md bg-accent py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark">
              Create account
            </button>
          </form>

          <div>
            <h3 className="font-display text-lg font-semibold">
              Existing staff
            </h3>
            <div className="mt-3 space-y-2">
              {staff.length === 0 && (
                <p className="rounded-card border border-dashed border-line px-4 py-10 text-center text-sm text-ink/40">
                  No staff accounts yet — create one from the form.
                </p>
              )}
              {staff.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between rounded-card border border-line bg-paper px-4 py-3 shadow-sm"
                >
                  <div>
                    <p className="font-medium">{s.name}</p>
                    <p className="text-xs text-ink/50">{s.email}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide text-ink/70">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${ROLE_DOT[s.role]}`}
                    />
                    {ROLE_LABELS[s.role]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
