import { createContext, useState, useEffect, useCallback } from "react";
import api from "../api/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [visitUser, setVisitUser] = useState(null);

    const fetchMe = useCallback(async () => {
        if (!sessionStorage.getItem("access_token")) return null;

        try {
            const userRes = await api.get('/api/account/me/');
            setUser(userRes.data);
        } catch (error) {
            console.error("Failed to fetch user", error);
            sessionStorage.removeItem("access_token");
        }
    }, []);

    const fetchUser = useCallback(async (username) => {
        try {
            const userRes = await api.get(`/api/account/${username}/`);
            setVisitUser(userRes.data);
        } catch (error) {
            console.error("Failed to fetch user", error);
            throw error;
        }
    }, []);

    // Get user from sessionStorage if the access token exists
    useEffect(() => {
        const token = sessionStorage.getItem("access_token");
        if (token) {
            fetchMe();
        }
    }, [fetchMe]);

    // Login function: called when user logs in
    const login = async (identifier, password) => {
        try {
            const response = await api.post("/api/account/login/", { identifier, password });

            sessionStorage.setItem("access_token", response.data.access);
            fetchMe();
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
            console.error("Registration failed");
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
            window.location.href = '/';
        } catch (error) {
            console.error("Logout failed");
            throw error;
        }
    };

    const updateUser = async (updatedFields) => {
        try {
            const { data } = await api.put("/api/account/edit-profile/", updatedFields);
            setUser((user) => ({ ...user, ...data })); // Update state with new values
            return data;
        } catch (error) {
            console.error("Update user failed");
            throw error;
        }
    };

    const changePassword = async (oldPassword, newPassword, confirmNewPassword) => {
        try {
            const { data } = await api.post("/api/account/change-password/", {
                old_password: oldPassword,
                new_password: newPassword,
                new_password_confirm: confirmNewPassword,
            });
            console.log("Password changed successfully");
            return data;
        } catch (error) {
            console.error("Password change failed");
            throw error;
        }
    };

    const deleteAccount = async () => {
        try {
            const { data } = await api.post("/api/account/delete/");
            console.log('Account Deleted Successfully');
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, visitUser, fetchMe, fetchUser, login, registerUser, updateUser, changePassword, logout, deleteAccount }}>
            {children}
        </AuthContext.Provider>
    );
};
