import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useHistory } from 'react-router-dom';

const Register = () => {
    const { signup } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(email, password, name);
            history.push('/');
        } catch (err) {
            setError(err.message);
        }
    };

        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="card glass p-8">
                        <h1 className="text-3xl font-display font-bold text-gradient mb-6">Create your account</h1>
                        {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Name</label>
                                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 focus-ring" placeholder="Your name" />
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Email</label>
                                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 focus-ring" placeholder="you@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm text-neutral-400 mb-1">Password</label>
                                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 focus-ring" placeholder="••••••••" />
                            </div>
                            <button type="submit" className="btn btn-primary w-full">Sign Up</button>
                        </form>
                        <p className="mt-6 text-sm text-neutral-400">Already have an account? <Link to="/login" className="text-accent-500 hover:underline">Log in</Link></p>
                    </div>
                </div>
            </div>
        );
};

export default Register;