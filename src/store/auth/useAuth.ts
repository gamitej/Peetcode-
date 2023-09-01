import { create } from "zustand";
// services
import { LoginApi, SignUpApi } from "@/services";
// libs
import { toast } from "react-hot-toast";
// utils
import {
  getSession,
  getSessionInfoBool,
  removeSession,
  setSession,
} from "@/utils/session";

const USER_SESSION = "USER";

interface AuthState {
  isLoggedIn: boolean;
  userInfo: object;
  isLoading: boolean;
  handleLogin: (data: object) => void;
  handleSignUp: (data: object) => void;
}

export const useAuth = create<AuthState>((set) => ({
  // variables
  isLoggedIn: getSessionInfoBool(USER_SESSION) || false,
  userInfo: getSession(USER_SESSION) || {},
  isLoading: false,
  // logout
  handleLogout: () => {
    removeSession(USER_SESSION);
    set((state) => ({ ...state, isLoggedIn: false }));
  },
  // login
  handleLogin: async (req) => {
    set((state) => ({ ...state, isLoading: true }));
    const { message, error, data } = await LoginApi(req);
    console.log(message, error);
    if (!error) {
      set((state) => ({
        ...state,
        isLoading: false,
        isLoggedIn: true,
        userInfo: data,
      }));
      // setting session data
      setSession(USER_SESSION, data);
    } else {
      toast.error(message, { duration: 1200 });
      set((state) => ({
        ...state,
        isLoading: false,
        isLoggedIn: false,
      }));
    }
  },
  // sign-up
  handleSignUp: async (req) => {
    set((state) => ({ ...state, isLoading: true }));
    const { message, error, data } = await SignUpApi(req);
    if (!error) {
      set((state) => ({
        ...state,
        isLoading: false,
        isLoggedIn: true,
        userInfo: data,
      }));
      // setting session data
      setSession(USER_SESSION, data);
    } else {
      toast.error(message, { duration: 1200 });
      set((state) => ({
        ...state,
        isLoading: false,
        isLoggedIn: false,
      }));
    }
  },
}));
