import { createContext, useState, useEffect, useCallback } from "react";
import api from "../api/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUser = useCallback(async () => {
        try {
            const userRes = await api.get('/api/account/me/');
            setUser(userRes.data);
        } catch (error) {
            console.error("Failed to fetch user", error);
            sessionStorage.removeItem("access_token");
        }
    }, []);

    // Get user from sessionStorage if the access token exists
    useEffect(() => {
        const token = sessionStorage.getItem("access_token");
        if (token) {
            fetchUser();
        }
    }, [fetchUser]);

    // Login function: called when user logs in
    const login = async (identifier, password) => {
        try {
            const response = await api.post("/api/account/login/", { identifier, password });

            sessionStorage.setItem("access_token", response.data.access);
            setUser(response.data.user);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const registerUser = async (registrationData) => {
        try {
            // registrationData should include fields like username, email, password, etc.
            const response = await api.post("/api/account/register/", registrationData);
            return response.data;
        } catch (error) {
            console.error("Registration failed", error);
            throw error;
        }
    };

    // Logout function: called when user logs out
    const logout = async () => {
        try {
            // Send a request to the backend to clear the refresh token in the HttpOnly cookie
            await api.post("/api/account/logout/");

            // Remove access token from sessionStorage
            sessionStorage.removeItem("access_token");

            // Clear user state
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
            throw error;
        }
    };


    return (
        <AuthContext.Provider value={{ user, login, registerUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
