import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="flex justify-center px-6 py-16">
      <form className="w-full max-w-sm rounded-card border border-line bg-paper p-8 shadow-sm">
        <span className="font-mono text-xs uppercase tracking-widest text-ink/40">
          Sign in
        </span>
        <h2 className="mt-1 font-display text-2xl font-semibold">
          Welcome back
        </h2>
        <label className="mt-5 block text-sm font-medium text-ink/80">
          Email
        </label>
        <input
          type="email"
          required
          className="mt-1.5 w-full rounded-md border border-line bg-canvas px-3 py-2 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <label className="mt-4 block text-sm font-medium text-ink/80">
          Password
        </label>
        <input
          type="password"
          required
          className="mt-1.5 w-full rounded-md border border-line bg-canvas px-3 py-2 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <button className="mt-6 w-full rounded-md bg-accent py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark disabled:opacity-60">
          Login
        </button>
        <p className="mt-5 text-center text-sm text-ink/50">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-accent hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
