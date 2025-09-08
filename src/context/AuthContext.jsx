import React, { createContext, useContext, useEffect, useState } from 'react';
import app from '../firebase/config';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    const login = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => signOut(auth);

    const signup = async (email, password, displayName) => {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (displayName) {
            await updateProfile(cred.user, { displayName });
        }
        return cred.user;
    };

    // Observe auth state
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return () => unsub();
    }, []);

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
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthContext };