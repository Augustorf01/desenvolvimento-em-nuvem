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
        <h1 className="text-3xl font-semibold text-slate-100">Login</h1>
        <p className="mt-2 text-sm text-slate-400">
          Access your account to manage the catalog and publish reviews.
        </p>
      </div>
      <LoginForm onSubmit={handleLogin} />
    </section>
  );
}
