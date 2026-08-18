import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const ROLE_HOME = {
  admin: "/admin",
  webdeveloper: "/staff",
  appdeveloper: "/staff",
  graphicdesigner: "/staff",
  user: "/dashboard",
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(" ");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(" ");
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      navigate(ROLE_HOME[user.role] || "/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center px-6 py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-card border border-line bg-paper p-8 shadow-sm"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-ink/40">
          Sign in
        </span>
        <h2 className="mt-1 font-display text-2xl font-semibold">
          Welcome back
        </h2>

        {error && (
          <div className="mt-4 rounded-md border border-status-rejected/30 bg-status-rejected/10 px-3 py-2 text-sm text-status-rejected">
            {error}
          </div>
        )}

        <label className="mt-5 block text-sm font-medium text-ink/80">
          Email
        </label>
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          type="email"
          required
          className="mt-1.5 w-full rounded-md border border-line bg-canvas px-3 py-2 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <label className="mt-4 block text-sm font-medium text-ink/80">
          Password
        </label>
        <input
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          type="password"
          required
          className="mt-1.5 w-full rounded-md border border-line bg-canvas px-3 py-2 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <button
          disabled={loading}
          className="mt-6 w-full rounded-md bg-accent py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark disabled:opacity-60"
        >
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
