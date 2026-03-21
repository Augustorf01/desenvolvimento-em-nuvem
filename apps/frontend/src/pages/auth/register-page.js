import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers/auth-provider";
import { RegisterForm } from "../../components/forms/register-form";
export function RegisterPage() {
    const navigate = useNavigate();
    const { registerAction } = useAuth();
    const handleRegister = async (name, email, password) => {
        await registerAction(name, email, password);
        navigate("/login");
    };
    return (_jsxs("section", { className: "mx-auto max-w-md space-y-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-semibold text-slate-100", children: "Create account" }), _jsx("p", { className: "mt-2 text-sm text-slate-400", children: "Register before creating reviews or managing protected endpoints." })] }), _jsx(RegisterForm, { onSubmit: handleRegister })] }));
}
