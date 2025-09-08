import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const { cartItems, totalAmount } = useCart();
  const { orders } = useOrders();

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-bold text-gradient mb-8">Your Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Purchases */}
          <section className="lg:col-span-2 card glass p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Purchases</h2>
            </div>
            {orders.length === 0 ? (
              <div className="text-neutral-400">No purchases yet. <Link to="/products" className="text-accent-500">Browse products</Link>.</div>
            ) : (
              <ul className="space-y-4">
                {orders.map(order => (
                  <li key={order.id} className="border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-neutral-300 text-sm">{new Date(order.createdAt).toLocaleString()}</div>
                      <div className="text-accent-500 font-medium">${order.total.toFixed(2)}</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="bg-neutral-900/50 rounded-lg p-3 flex items-center justify-between">
                          <div className="text-sm text-neutral-300">{it.name} × {it.quantity}</div>
                          <div className="text-sm text-neutral-400">${(it.price * it.quantity).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Cart snapshot */}
          <aside className="card glass p-6">
            <h3 className="text-xl font-bold mb-4">In your cart</h3>
            {cartItems.length === 0 ? (
              <div className="text-neutral-400">Cart is empty.</div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((it) => (
                  <div key={it.id} className="flex items-center justify-between text-sm">
                    <div className="text-neutral-300">{it.name} × {it.quantity}</div>
                    <div className="text-neutral-400">${(it.price * it.quantity).toFixed(2)}</div>
                  </div>
                ))}
                <div className="border-t border-white/10 pt-3 flex items-center justify-between font-medium">
                  <div>Total</div>
                  <div className="text-accent-500">${totalAmount.toFixed(2)}</div>
                </div>
                <Link to="/checkout" className="btn btn-primary w-full">Checkout</Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
