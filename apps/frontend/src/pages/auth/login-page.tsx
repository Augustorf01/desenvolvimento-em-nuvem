import { useNavigate } from "react-router-dom";

import { LoginForm } from "../../components/forms/login-form";
import { useAuth } from "../../app/providers/auth-provider";

export function LoginPage() {
  const navigate = useNavigate();
  const { loginAction } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    await loginAction(email, password);
    navigate("/");
  };

  return (
    <section className="mx-auto max-w-md space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-100 sm:text-3xl">Login</h1>
        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Access your account to manage the catalog and publish reviews.
        </p>
      </div>
      <LoginForm onSubmit={handleLogin} />
    </section>
  );
}
