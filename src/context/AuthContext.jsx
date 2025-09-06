import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        // Mock login for now
        setCurrentUser({ email, displayName: email.split('@')[0] });
        return Promise.resolve();
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const signup = async (email, password) => {
        // Mock signup for now
        setCurrentUser({ email, displayName: email.split('@')[0] });
        return Promise.resolve();
    };

    const value = {
        user: currentUser,
        currentUser,
        login,
        logout,
        signup,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthContext };