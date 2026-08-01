/**
 * Mock authentication service.
 *
 * Everything lives in localStorage — there is no backend and no real security here.
 * Swap the body of these functions for API calls (fetch/axios) when a backend exists;
 * the exported signatures are what the UI depends on.
 */

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

type StoredAccount = User & { password: string };

const ACCOUNTS_KEY = "mmgs.accounts";
const SESSION_KEY = "mmgs.session";

export class AuthError extends Error {}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readAccounts(): StoredAccount[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(ACCOUNTS_KEY);
    return raw ? (JSON.parse(raw) as StoredAccount[]) : [];
  } catch {
    return [];
  }
}

function writeAccounts(accounts: StoredAccount[]): void {
  window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

/** Obfuscation only — a real backend must hash passwords server-side. */
function scramble(password: string): string {
  if (!isBrowser()) return password;
  return window.btoa(unescape(encodeURIComponent(`mmgs:${password}`)));
}

function toUser(account: StoredAccount): User {
  return { id: account.id, name: account.name, email: account.email, phone: account.phone };
}

export function normaliseEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validatePassword(password: string): boolean {
  return password.length >= 6;
}

export async function signUp(input: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}): Promise<User> {
  const email = normaliseEmail(input.email);
  if (!input.name.trim()) throw new AuthError("Please enter your name.");
  if (!validateEmail(email)) throw new AuthError("Please enter a valid email address.");
  if (!validatePassword(input.password))
    throw new AuthError("Password must be at least 6 characters long.");

  const accounts = readAccounts();
  if (accounts.some((account) => account.email === email))
    throw new AuthError("An account with this email already exists. Please log in instead.");

  const account: StoredAccount = {
    id: `user_${Date.now().toString(36)}`,
    name: input.name.trim(),
    email,
    phone: input.phone?.trim() || undefined,
    password: scramble(input.password),
  };

  writeAccounts([...accounts, account]);
  const user = toUser(account);
  setSession(user);
  return user;
}

export async function logIn(input: { email: string; password: string }): Promise<User> {
  const email = normaliseEmail(input.email);
  const account = readAccounts().find((candidate) => candidate.email === email);
  if (!account || account.password !== scramble(input.password))
    throw new AuthError("Incorrect email or password.");

  const user = toUser(account);
  setSession(user);
  return user;
}

export function logOut(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(SESSION_KEY);
}

export function setSession(user: User): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function getSession(): User | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}
