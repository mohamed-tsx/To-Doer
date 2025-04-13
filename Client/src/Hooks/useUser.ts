import api from "@/Services/api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserType {
  id: string;
  fullname: string;
  username: string;
  phoneNumber: string;
  role: string;
}

type UserStore = {
  user: UserType | null;
  isAuthenticated: boolean;
  saveUserInfo: (userInfo: UserType) => void;
  checkAuth: () => Promise<void>;
  logout: () => void;
};

// ✅ Create Zustand Store
export const useUser = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      // ✅ Save User Info After Login
      saveUserInfo: (userInfo) => {
        set(() => ({ user: userInfo, isAuthenticated: true }));
      },

      // ✅ Check User Authentication Status via `/auth/me`
      checkAuth: async () => {
        try {
          const response = await api.get<UserType>("api/users/me", {
            withCredentials: true,
          });
          set({ user: response.data, isAuthenticated: true });
        } catch (error) {
          console.error("Token expired or user not authenticated:", error);
          get().logout(); // ✅ Logout if session is invalid
        }
      },

      // ✅ Logout and Clear User Data
      logout: () => {
        api
          .post("api/users/logout", {}, { withCredentials: true })
          .catch((err: any) => console.error("Logout error:", err));

        set(() => ({ user: null, isAuthenticated: false }));
        window.location.href = "/login"; // ✅ Redirect to login page
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage), // ✅ Persists user info
    }
  )
);
