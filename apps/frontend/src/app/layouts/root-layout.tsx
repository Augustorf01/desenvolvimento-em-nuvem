import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Library, LogIn, LogOut, Menu, Star, UserPlus, X } from "lucide-react";

import { useAuth } from "../providers/auth-provider";

const linkClassName = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition sm:text-base ${
    isActive ? "bg-cyan-500 text-slate-950" : "text-slate-200 hover:bg-slate-800"
  }`;

const iconClassName = "h-4 w-4 sm:h-5 sm:w-5";

export function RootLayout() {
  const { isAuthenticated, logoutAction, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = (
    <>
      <NavLink to="/" className={linkClassName} onClick={closeMenu}>
        <Library className={iconClassName} aria-hidden="true" />
        Catalog
      </NavLink>

      {isAuthenticated ? (
        <>
          <NavLink to="/reviews/me" className={linkClassName} onClick={closeMenu}>
            <Star className={iconClassName} aria-hidden="true" />
            My reviews
          </NavLink>
          <span className="px-2 text-sm text-slate-300 sm:text-base">{user?.name}</span>
          <button
            type="button"
            onClick={() => {
              closeMenu();
              logoutAction();
            }}
            className="flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm font-medium transition hover:border-cyan-400 hover:text-cyan-300 sm:text-base"
          >
            <LogOut className={iconClassName} aria-hidden="true" />
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" className={linkClassName} onClick={closeMenu}>
            <LogIn className={iconClassName} aria-hidden="true" />
            Login
          </NavLink>
          <NavLink to="/register" className={linkClassName} onClick={closeMenu}>
            <UserPlus className={iconClassName} aria-hidden="true" />
            Register
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            to="/"
            className="text-base font-semibold text-cyan-400 sm:text-lg"
            onClick={closeMenu}
          >
            Biblioteca em Nuvem
          </Link>

          <nav className="hidden items-center gap-3 md:flex">{navLinks}</nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex items-center justify-center rounded-full border border-slate-700 p-2 text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300 md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {isMenuOpen ? (
          <nav className="flex flex-col gap-2 border-t border-slate-800 px-4 py-4 md:hidden">
            {navLinks}
          </nav>
        ) : null}
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>
    </div>
  );
}
