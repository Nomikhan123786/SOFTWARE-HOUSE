import StatusBadge from "./StatusBadge";

const TYPE_META = {
  web: {
    label: "Website",
    edge: "border-role-web",
    tag: "text-role-web",
    code: "WEB",
  },
  graphic: {
    label: "Graphic Design",
    edge: "border-role-graphic",
    tag: "text-role-graphic",
    code: "GFX",
  },
  app: {
    label: "Mobile App",
    edge: "border-role-app",
    tag: "text-role-app",
    code: "APP",
  },
};

export default function TicketCard({ project, children }) {
  const meta = TYPE_META[project.projectType] || TYPE_META.web;
  const ticketNo = `${meta.code}-${project._id.slice(-5).toUpperCase()}`;

  return (
    <div
      className={`rounded-card border border-line bg-paper p-5 shadow-sm border-l-4 ${meta.edge}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className={`font-mono text-xs font-semibold ${meta.tag}`}>
              {ticketNo}
            </span>
            <span className="text-xs text-ink/40">&middot;</span>
            <span className="text-xs text-ink/50">{meta.label}</span>
          </div>
          <h3 className="mt-1 font-display text-lg font-semibold leading-snug">
            {project.title}
          </h3>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <p className="mt-2 text-sm leading-relaxed text-ink/70">
        {project.description}
      </p>

      {(project.requestedBy || project.assignedTo || project.budget) && (
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink/50">
          {project.requestedBy && (
            <span>
              Client:{" "}
              <span className="text-ink/70">{project.requestedBy.name}</span>
            </span>
          )}
          {project.assignedTo && (
            <span>
              Assigned:{" "}
              <span className="text-ink/70">{project.assignedTo.name}</span>
            </span>
          )}
          {project.budget ? <span>Budget: {project.budget} Rs.</span> : null}
        </div>
      )}

      {project.notes?.length > 0 && (
        <div className="mt-3 space-y-1.5 border-t border-dashed border-line pt-3">
          {project.notes.map((n, i) => (
            <p
              key={i}
              className="rounded-md bg-canvas px-3 py-1.5 text-xs text-ink/70"
            >
              {n.text}
            </p>
          ))}
        </div>
      )}

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
