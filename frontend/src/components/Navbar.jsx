import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center sticky top-0  z-50  justify-between border-b border-line  bg-gray-900 px-6 py-3.5 sm:px-8">
      <Link
        to="/"
        className="font-display text-lg font-semibold tracking-tight text-white"
      >
        SoftWare <span className="text-blue-700">House</span>
      </Link>
      <div className="gap-4">
        <Link
          to="/login"
          className="rounded-md border border-white/20 px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-white/10"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="rounded-md bg-accent px-3.5 py-1.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
        >
          Register
        </Link>
        <button className="rounded-md border border-white/20 px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-white/10">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
