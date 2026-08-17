import { Link } from "react-router-dom";

const TICKETS = [
  { code: "WEB", label: "web Development", border: "border-role-web" },
  { code: "GFX", label: "Graphic Design", border: "border-role-graphic" },
  { code: "APP", label: "App Development", border: "border-role-app" },
];

const Home = () => {
  return (
    <div className="mx-auto  max-w-4xl  px-6 py-10 text-center sm:py-15 ">
      <span className="font-mono text-xs uppercase tracking-[0.2rem] text-ink/40">
        Project intake delivery
      </span>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        Every request, tracked like a ticket —
        <br className="hidden sm:block" /> from brief to delivery.
      </h1>
      <p className="mt-8 flex flex-wrap justify-center gap-3">
        {" "}
        Submit a project, and it's routed straight to the specialist who builds
        it — web, app, or graphic design — with the admin keeping every job
        moving.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/register"
          className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900"
        >
          Request a project
        </Link>
        <Link
          to="/login"
          className="rounded-md border border-line   px-5 py-2.5 text-sm font-semibold text-blue-900 transition hover:bg-blue-300/100"
        >
          Log in
        </Link>
      </div>
      <div className="mx-auto mt-16 grid max-w-2xl gap-3 sm:grid-cols-3">
        {TICKETS.map((t) => (
          <div
            key={t.code}
            className={`rounded-card border border-line  bg-paper p-5 text-left border-l-4 ${t.border}`}
          >
            <span className="font-mono text-medium font-semibold text-blue-900">
              {t.code}
            </span>
            <p className="mt-1 font-display font-semibold">{t.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
