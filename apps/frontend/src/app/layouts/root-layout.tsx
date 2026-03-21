import { Link, NavLink, Outlet } from "react-router-dom";

import { useAuth } from "../providers/auth-provider";

const linkClassName = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive ? "bg-cyan-500 text-slate-950" : "text-slate-200 hover:bg-slate-800"
  }`;

export function RootLayout() {
  const { isAuthenticated, logoutAction, user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-lg font-semibold text-cyan-400">
            Biblioteca em Nuvem
          </Link>

          <nav className="flex items-center gap-3">
            <NavLink to="/" className={linkClassName}>
              Catalog
            </NavLink>
            {isAuthenticated ? (
              <>
                <NavLink to="/reviews/me" className={linkClassName}>
                  My reviews
                </NavLink>
                <span className="text-sm text-slate-300">{user?.name}</span>
                <button
                  type="button"
                  onClick={logoutAction}
                  className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium hover:border-cyan-400 hover:text-cyan-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkClassName}>
                  Login
                </NavLink>
                <NavLink to="/register" className={linkClassName}>
                  Register
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
