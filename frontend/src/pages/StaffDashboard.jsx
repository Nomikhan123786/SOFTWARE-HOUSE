import React from "react";

const StaffDashboard = () => {
  //   const btnGhost =
  //     "rounded-md border border-line px-3 py-1.5 text-sm font-medium text-ink transition hover:bg-ink/5 disabled:cursor-not-allowed disabled:opacity-40";
  //
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 sm:px-8">
      <span className="font-mono text-xs uppercase tracking-widest text-ink/40">
        Specialist queue
      </span>
      <h1 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">
        StaFF dashboard
      </h1>
      <p className="mt-1 text-sm text-ink/50">
        You only see requests that belong to your specialty —{" "}
      </p>
      <div className="mt-8 space-y-3">
        <p className="rounded-card border border-dashed border-line px-4 py-10 text-center text-sm text-ink/40">
          No relevant projects right now.
        </p>
      </div>
    </div>
  );
};

export default StaffDashboard;
