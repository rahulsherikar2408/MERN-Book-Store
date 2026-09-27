import { createContext, useContext, useEffect, useState } from "react";

import api from "../api/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getCurrentUser = async () => {
        try {
            const response = await api.get("/auth/me");
            setUser(response.data.user);
        } catch (error) {
            setUser(null);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    const login = async (email, password) => {
        const response = await api.post("/auth/login", {
            email,
            password
        });
        setUser(response.data.user);
        return response;
    }

    const signup = async (name, email, password) => {
        const response = await api.post("/auth/signup", {
            name,
            email,
            password
        });
        return response;
    }

    const logout = async () => {
        await api.post("/auth/logout");
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{ user, loading, login, signup, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}