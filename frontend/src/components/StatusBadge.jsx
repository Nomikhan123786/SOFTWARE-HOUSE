// Small pill badge for a project's status. Color is drawn from the
// shared `status` token set defined in tailwind.config.js so status
// colors stay consistent everywhere they appear in the app.
const STATUS_STYLES = {
  pending: "bg-status-pending/10 text-status-pending border-status-pending/30",
  assigned: "bg-status-assigned/10 text-status-assigned border-status-assigned/30",
  "in-progress": "bg-status-progress/10 text-status-progress border-status-progress/30",
  completed: "bg-status-completed/10 text-status-completed border-status-completed/30",
  rejected: "bg-status-rejected/10 text-status-rejected border-status-rejected/30",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide ${
        STATUS_STYLES[status] || STATUS_STYLES.pending
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
