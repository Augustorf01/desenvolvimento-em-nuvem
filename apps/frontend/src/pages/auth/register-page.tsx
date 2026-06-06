import { useNavigate } from "react-router-dom";

import { useAuth } from "../../app/providers/auth-provider";
import { RegisterForm } from "../../components/forms/register-form";

export function RegisterPage() {
  const navigate = useNavigate();
  const { registerAction } = useAuth();

  const handleRegister = async (name: string, email: string, password: string) => {
    await registerAction(name, email, password);
    navigate("/login");
  };

  return (
    <section className="mx-auto max-w-md space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-100 sm:text-3xl">Create account</h1>
        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Register before creating reviews or managing protected endpoints.
        </p>
      </div>
      <RegisterForm onSubmit={handleRegister} />
    </section>
  );
}
