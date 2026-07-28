"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { site } from "@/data/site";

export default function AccountPage() {
  const { user, isReady, logOut } = useAuth();

  if (!isReady) return <section className="container-page py-24" />;

  if (!user)
    return (
      <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="text-headline font-semibold text-ink">You are not logged in</h1>
        <p className="mt-3 text-ink-soft">Log in to see your account details.</p>
        <Link href="/login?redirect=/account" className="btn-primary mt-8">
          Log in
        </Link>
      </section>
    );

  return (
    <section className="container-page py-16">
      <p className="eyebrow">Your account</p>
      <h1 className="mt-3 text-headline font-semibold text-ink">Hi, {user.name}</h1>

      <dl className="card mt-10 max-w-lg divide-y divide-ink/[0.06] p-6 text-sm">
        <div className="flex justify-between py-3">
          <dt className="text-ink-soft">Name</dt>
          <dd className="text-ink">{user.name}</dd>
        </div>
        <div className="flex justify-between py-3">
          <dt className="text-ink-soft">Email</dt>
          <dd className="text-ink">{user.email}</dd>
        </div>
        <div className="flex justify-between py-3">
          <dt className="text-ink-soft">Mobile</dt>
          <dd className="text-ink">{user.phone || "Not added"}</dd>
        </div>
      </dl>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-secondary">
          Continue shopping
        </Link>
        <button onClick={logOut} className="btn-ghost">
          Log out
        </button>
      </div>

      <p className="mt-10 max-w-lg text-xs text-ink-muted">
        Order history will appear here once {site.name} is connected to a backend. For now, accounts
        and sessions live in your browser&apos;s localStorage.
      </p>
    </section>
  );
}
