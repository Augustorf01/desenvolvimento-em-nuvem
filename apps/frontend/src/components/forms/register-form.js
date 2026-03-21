import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export function RegisterForm({ onSubmit }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            await onSubmit(name, email, password);
        }
        catch (submissionError) {
            const message = submissionError instanceof Error ? submissionError.message : "Registration failed.";
            setError(message);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-sm text-slate-300", htmlFor: "name", children: "Name" }), _jsx("input", { id: "name", value: name, onChange: (event) => setName(event.target.value), className: "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-sm text-slate-300", htmlFor: "email", children: "Email" }), _jsx("input", { id: "email", type: "email", value: email, onChange: (event) => setEmail(event.target.value), className: "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-sm text-slate-300", htmlFor: "password", children: "Password" }), _jsx("input", { id: "password", type: "password", value: password, onChange: (event) => setPassword(event.target.value), className: "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100", required: true, minLength: 8 })] }), error ? _jsx("p", { className: "text-sm text-rose-400", children: error }) : null, _jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60", children: isSubmitting ? "Creating account..." : "Create account" })] }));
}
