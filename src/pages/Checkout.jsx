import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';

const Checkout = () => {
    const { cartItems, totalAmount } = useCart();
    const { user } = useAuth();

    const handleCheckout = () => {
        // Logic for handling checkout process
        console.log('Proceeding to checkout with:', cartItems);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            {user ? (
                <div>
                    <h2 className="text-xl mb-2">Hello, {user.displayName}</h2>
                    <h3 className="text-lg mb-2">Your Cart:</h3>
                    <ul className="mb-4">
                        {cartItems.map((item) => (
                            <li key={item.id} className="flex justify-between mb-2">
                                <span>{item.name}</span>
                                <span>${item.price}</span>
                            </li>
                        ))}
                    </ul>
                    <h3 className="text-lg font-bold">Total: ${totalAmount}</h3>
                    <Button onClick={handleCheckout} label="Complete Purchase" />
                </div>
            ) : (
                <p className="text-red-500">Please log in to proceed with checkout.</p>
            )}
        </div>
    );
};

export default Checkout;