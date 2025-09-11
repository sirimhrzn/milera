import Cookies from "js-cookie";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    username: string | null;
    isAuthenticated: boolean;
}

interface AuthActions {
    login: (
        accessToken: string,
        refreshToken: string,
        username: string
    ) => void;
    logout: () => void;
    updateTokens: (accessToken: string, refreshToken: string) => void;
    initializeFromCookies: () => void;
}

type AuthStore = AuthState & AuthActions;

// Cookie configuration
const COOKIE_OPTIONS = {
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === "production", // Only secure in production
    sameSite: "strict" as const,
    httpOnly: false, // Set to true if you're setting cookies server-side
};

// Custom storage that syncs with cookies
const cookieStorage = {
    getItem: (name: string): string | null => {
        // Get from localStorage first (Zustand persistence)
        const item = localStorage.getItem(name);
        return item;
    },
    setItem: (name: string, value: string): void => {
        // Store in localStorage for Zustand
        localStorage.setItem(name, value);

        // Also sync auth data to cookies
        try {
            const parsedValue = JSON.parse(value);
            const authData = parsedValue.state;

            if (authData.accessToken) {
                Cookies.set(
                    "access_token",
                    authData.accessToken,
                    COOKIE_OPTIONS
                );
            }
            if (authData.refreshToken) {
                Cookies.set(
                    "refresh_token",
                    authData.refreshToken,
                    COOKIE_OPTIONS
                );
            }
            if (authData.username) {
                Cookies.set("username", authData.username, COOKIE_OPTIONS);
            }
        } catch (error) {
            console.error("Error syncing to cookies:", error);
        }
    },
    removeItem: (name: string): void => {
        localStorage.removeItem(name);
        // Clear auth cookies
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        Cookies.remove("username");
    },
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            // Initial state
            accessToken: null,
            refreshToken: null,
            username: null,
            isAuthenticated: false,

            // Actions
            login: (
                accessToken: string,
                refreshToken: string,
                username: string
            ) => {
                // Update Zustand state
                set({
                    accessToken,
                    refreshToken,
                    username,
                    isAuthenticated: true,
                });

                // Store in cookies (this will also be handled by the custom storage)
                Cookies.set("access_token", accessToken, COOKIE_OPTIONS);
                Cookies.set("refresh_token", refreshToken, COOKIE_OPTIONS);
                Cookies.set("username", username, COOKIE_OPTIONS);
            },

            logout: () => {
                // Clear Zustand state
                set({
                    accessToken: null,
                    refreshToken: null,
                    username: null,
                    isAuthenticated: false,
                });

                // Clear cookies
                Cookies.remove("access_token");
                Cookies.remove("refresh_token");
                Cookies.remove("username");
            },

            updateTokens: (accessToken: string, refreshToken: string) => {
                set({ accessToken, refreshToken });

                // Update cookies
                Cookies.set("access_token", accessToken, COOKIE_OPTIONS);
                Cookies.set("refresh_token", refreshToken, COOKIE_OPTIONS);
            },

            initializeFromCookies: () => {
                const accessToken = Cookies.get("access_token");
                const refreshToken = Cookies.get("refresh_token");
                const username = Cookies.get("username");

                if (accessToken && refreshToken && username) {
                    set({
                        accessToken,
                        refreshToken,
                        username,
                        isAuthenticated: true,
                    });
                }
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => cookieStorage),
            partialize: (state) => ({
                // Only persist these fields
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                username: state.username,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
