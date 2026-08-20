import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import TicketCard from "../components/TicketCard";

const ROLE_TITLES = {
  webdeveloper: "Web Developer",
  graphicdesigner: "Graphic Designer",
  appdeveloper: "App Developer",
};

export default function StaffDashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noteDrafts, setNoteDrafts] = useState({});

  const load = async () => {
    setLoading(true);
    const res = await api.get("/projects/assigned");
    setProjects(res.data.projects);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    await api.patch(`/projects/${id}/status`, { status });
    await load();
  };

  const addNote = async (id) => {
    const note = noteDrafts[id];
    if (!note) return;
    await api.patch(`/projects/${id}/status`, { note });
    setNoteDrafts({ ...noteDrafts, [id]: "" });
    await load();
  };

  const claimProject = async (id) => {
    await api.patch(`/projects/${id}/status`, {});
    await load();
  };

  const btnGhost =
    "rounded-md border border-line px-3 py-1.5 text-sm font-medium text-ink transition hover:bg-ink/5 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 sm:px-8">
      <span className="font-mono text-xs uppercase tracking-widest text-ink/40">
        Specialist queue
      </span>
      <h1 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">
        {ROLE_TITLES[user.role]} dashboard
      </h1>
      <p className="mt-1 text-sm text-ink/50">
        You only see requests that belong to your specialty —{" "}
        {ROLE_TITLES[user.role]}.
      </p>

      <div className="mt-8 space-y-3">
        {loading ? (
          <p className="text-sm text-ink/40">Loading...</p>
        ) : projects.length === 0 ? (
          <p className="rounded-card border border-dashed border-line px-4 py-10 text-center text-sm text-ink/40">
            No relevant projects right now.
          </p>
        ) : (
          projects.map((p) => {
            const isMine = p.assignedTo && p.assignedTo._id === user.id;
            return (
              <TicketCard key={p._id} project={p}>
                <div className="flex flex-wrap items-center gap-2">
                  {!p.assignedTo && (
                    <button
                      onClick={() => claimProject(p._id)}
                      className="rounded-md bg-accent px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
                    >
                      Claim this project
                    </button>
                  )}
                  {isMine && (
                    <>
                      <button
                        disabled={p.status === "in-progress"}
                        onClick={() => updateStatus(p._id, "in-progress")}
                        className={btnGhost}
                      >
                        Mark in progress
                      </button>
                      <button
                        disabled={p.status === "completed"}
                        onClick={() => updateStatus(p._id, "completed")}
                        className={btnGhost}
                      >
                        Mark completed
                      </button>
                    </>
                  )}
                </div>

                {isMine && (
                  <div className="mt-3 flex gap-2">
                    <input
                      placeholder="Add a progress note..."
                      value={noteDrafts[p._id] || ""}
                      onChange={(e) =>
                        setNoteDrafts({
                          ...noteDrafts,
                          [p._id]: e.target.value,
                        })
                      }
                      className="flex-1 rounded-md border border-line bg-canvas px-3 py-1.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                    <button onClick={() => addNote(p._id)} className={btnGhost}>
                      Add note
                    </button>
                  </div>
                )}
              </TicketCard>
            );
          })
        )}
      </div>
    </div>
  );
}
