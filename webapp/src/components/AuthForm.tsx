"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { site } from "@/data/site";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const { logIn, signUp } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const update = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      if (mode === "signup") {
        await signUp({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
        });
      } else {
        await logIn({ email: form.email, password: form.password });
      }
      router.push(redirect);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="container-page flex min-h-[78vh] items-center justify-center py-16">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="card w-full max-w-md p-8 sm:p-10"
      >
        <p className="eyebrow">{site.name}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          {mode === "login"
            ? "Log in to check out faster with saved details."
            : "Sign up to save your details for faster checkout."}
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          {mode === "signup" && (
            <>
              <div>
                <label htmlFor="name" className="field-label">
                  Full name
                </label>
                <input
                  id="name"
                  className="field"
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="phone" className="field-label">
                  Mobile number (optional)
                </label>
                <input
                  id="phone"
                  className="field"
                  value={form.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="field-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="field"
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="field-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="field"
              value={form.password}
              onChange={(event) => update("password", event.target.value)}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
            {mode === "signup" && (
              <p className="mt-1 text-xs text-ink-muted">At least 6 characters.</p>
            )}
          </div>

          {error && (
            <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button type="submit" disabled={pending} className="btn-primary w-full">
            {pending ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-soft">
          {mode === "login" ? (
            <>
              New here?{" "}
              <Link
                href={`/signup?redirect=${encodeURIComponent(redirect)}`}
                className="font-semibold text-brand-700"
              >
                Create an account
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                href={`/login?redirect=${encodeURIComponent(redirect)}`}
                className="font-semibold text-brand-700"
              >
                Log in
              </Link>
            </>
          )}
        </p>

        <p className="mt-4 text-center text-xs text-ink-muted">
          Accounts are stored in your browser only — this demo has no backend yet.
        </p>
      </motion.div>
    </section>
  );
}
