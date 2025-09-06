import React from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/common/ProductCard';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();

    const handleRemove = (id) => {
        removeFromCart(id);
    };

    const handleClear = () => {
        clearCart();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cartItems.map((item) => (
                            <ProductCard key={item.id} product={item} onRemove={handleRemove} />
                        ))}
                    </div>
                    <button
                        className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                        onClick={handleClear}
                    >
                        Clear Cart
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;