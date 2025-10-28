import { ref, computed, inject, provide, type Ref } from "vue";

interface User {
  email: string;
  password: string;
}

interface AuthContextType {
  user: Ref<User | null>;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  logout: () => void;
}

const AuthSymbol = Symbol("AuthContext");

export function createAuth() {
  const user = ref<User | null>(null);

  // ✅ Load saved session from localStorage
  const loadSession = () => {
    const storedUser = localStorage.getItem("ticketapp_session");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed && parsed.email && parsed.password) {
          user.value = parsed;
        } else if (typeof storedUser === "string") {
          user.value = { email: storedUser, password: "" };
        }
      } catch {
        user.value = { email: storedUser, password: "" };
      }
    }
  };

  loadSession();

  // ✅ Login user and persist session
  const login = (email: string, password: string) => {
    const savedUser = localStorage.getItem("ticketapp_user");
    if (!savedUser) throw new Error("User not found");

    const parsed = JSON.parse(savedUser);
    if (parsed.email !== email || parsed.password !== password)
      throw new Error("Invalid credentials");

    localStorage.setItem("ticketapp_session", JSON.stringify(parsed));
    user.value = parsed;
  };

  // ✅ Signup new user
  const signup = (email: string, password: string) => {
    const newUser = { email, password };
    localStorage.setItem("ticketapp_user", JSON.stringify(newUser));
    localStorage.setItem("ticketapp_session", JSON.stringify(newUser));
    user.value = newUser;
  };

  // ✅ Logout
  const logout = () => {
    user.value = null;
    localStorage.removeItem("ticketapp_session");
  };

  const authContext: AuthContextType = {
    user,
    login,
    signup,
    logout,
  };

  provide(AuthSymbol, authContext);
  return authContext;
}

// ✅ useAuth composable (like React’s useContext)
export function useAuth() {
  const context = inject<AuthContextType>(AuthSymbol);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
