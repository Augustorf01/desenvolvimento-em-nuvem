import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { login, register } from "../../services/api/auth";
import { AuthResponse, User } from "../../types/api";

const STORAGE_KEY = "library-cloud-auth";

type AuthState = {
  token: string | null;
  user: User | null;
};

type AuthContextValue = AuthState & {
  isAuthenticated: boolean;
  loginAction: (email: string, password: string) => Promise<void>;
  registerAction: (name: string, email: string, password: string) => Promise<void>;
  logoutAction: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const readStorage = (): AuthState => {
  const rawValue = localStorage.getItem(STORAGE_KEY);

  if (!rawValue) {
    return {
      token: null,
      user: null,
    };
  }

  try {
    return JSON.parse(rawValue) as AuthState;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return {
      token: null,
      user: null,
    };
  }
};

const persistStorage = (payload: AuthResponse | null) => {
  if (!payload) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      token: payload.accessToken,
      user: payload.user,
    }),
  );
};

export function AuthProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<AuthState>({
    token: null,
    user: null,
  });

  useEffect(() => {
    setState(readStorage());
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      isAuthenticated: Boolean(state.token && state.user),
      async loginAction(email, password) {
        const payload = await login({ email, password });
        persistStorage(payload);
        setState({
          token: payload.accessToken,
          user: payload.user,
        });
      },
      async registerAction(name, email, password) {
        await register({ name, email, password });
      },
      logoutAction() {
        persistStorage(null);
        setState({
          token: null,
          user: null,
        });
      },
    }),
    [state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
