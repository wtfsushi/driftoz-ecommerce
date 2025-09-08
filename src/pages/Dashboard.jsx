import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
	const { user, logout } = useAuth();

	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
			<div className="text-center mb-10">
				<h1 className="text-4xl font-display font-bold text-gradient">Your Dashboard</h1>
				<p className="text-neutral-400 mt-2">Manage your account and orders.</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="md:col-span-1 card glass p-6">
					<div className="w-20 h-20 rounded-2xl bg-accent-500/20 flex items-center justify-center text-3xl mb-4">
						{(user?.displayName?.[0] || user?.email?.[0] || 'U').toUpperCase()}
					</div>
					<div className="space-y-1">
						<div className="text-neutral-300 font-medium">{user?.displayName || 'User'}</div>
						<div className="text-neutral-400 text-sm">{user?.email}</div>
					</div>
					<button onClick={logout} className="btn btn-secondary w-full mt-6">Log out</button>
				</div>

				<div className="md:col-span-2 space-y-6">
					<div className="card glass p-6">
						<h2 className="text-xl font-display font-bold text-white mb-4">Recent Activity</h2>
						<p className="text-neutral-400">No recent activity yet.</p>
					</div>
					<div className="card glass p-6">
						<h2 className="text-xl font-display font-bold text-white mb-4">Orders</h2>
						<p className="text-neutral-400">You don’t have any orders yet.</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

