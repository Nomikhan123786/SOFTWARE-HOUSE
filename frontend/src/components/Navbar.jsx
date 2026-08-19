import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ROLE_META = {
  admin: { lable: "Admin", color: "bg-role-admin" },
  webdeveloper: { lable: "Web Developer", color: "bg-role-web" },
  appdeveloper: { lable: "App Developer", color: "bg-role-app" },
  graphicdesigner: { lable: "Graphic Designer", color: "bg-role-graphic" },
  user: { lable: "Client", color: "bg-role-client" },
};
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const role = user ? ROLE_META[user.role] : null;
  return (
    <nav className="flex items-center sticky top-0  z-50  justify-between border-b border-line  bg-gray-900 px-6 py-3.5 sm:px-8">
      <Link
        to="/"
        className="font-display text-lg font-semibold tracking-tight text-white"
      >
        SoftWare <span className="text-blue-700">House</span>
      </Link>
      {user ? (
        <>
          <div className="flex gap-10">
            <span
              className={`hidden items-center gap-1.5 rounded-full ${role.color} px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide text-ink sm:inline-flex`}
            >
              {role.lable}
            </span>
            <span className="text-sm text-white/80 px-2.5 py-1.5">
              {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="rounded-md border border-white/20 px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex  gap-4">
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
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
