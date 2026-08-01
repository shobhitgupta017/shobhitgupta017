"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import * as authService from "@/services/auth";
import type { User } from "@/services/auth";

type AuthContextValue = {
  user: User | null;
  isReady: boolean;
  isLoggedIn: boolean;
  logIn: (input: { email: string; password: string }) => Promise<User>;
  signUp: (input: { name: string; email: string; password: string; phone?: string }) => Promise<User>;
  logOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setUser(authService.getSession());
    setIsReady(true);
  }, []);

  const logIn = useCallback(async (input: { email: string; password: string }) => {
    const loggedIn = await authService.logIn(input);
    setUser(loggedIn);
    return loggedIn;
  }, []);

  const signUp = useCallback(
    async (input: { name: string; email: string; password: string; phone?: string }) => {
      const created = await authService.signUp(input);
      setUser(created);
      return created;
    },
    [],
  );

  const logOut = useCallback(() => {
    authService.logOut();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isReady, isLoggedIn: Boolean(user), logIn, signUp, logOut }),
    [user, isReady, logIn, signUp, logOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside an AuthProvider");
  return context;
}
