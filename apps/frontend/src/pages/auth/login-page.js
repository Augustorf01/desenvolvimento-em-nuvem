import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/forms/login-form";
import { useAuth } from "../../app/providers/auth-provider";
export function LoginPage() {
    const navigate = useNavigate();
    const { loginAction } = useAuth();
    const handleLogin = async (email, password) => {
        await loginAction(email, password);
        navigate("/");
    };
    return (_jsxs("section", { className: "mx-auto max-w-md space-y-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-semibold text-slate-100", children: "Login" }), _jsx("p", { className: "mt-2 text-sm text-slate-400", children: "Access your account to manage the catalog and publish reviews." })] }), _jsx(LoginForm, { onSubmit: handleLogin })] }));
}
