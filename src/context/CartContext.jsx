import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
    items: [],
    totalAmount: 0,
    totalItems: 0,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            let updatedItems;
            
            if (existingItemIndex >= 0) {
                // Item already exists, increase quantity
                updatedItems = state.items.map((item, index) => 
                    index === existingItemIndex 
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // New item, add to cart
                updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
            }
            
            const updatedTotalAmount = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            const updatedTotalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
            
            return {
                ...state,
                items: updatedItems,
                totalAmount: updatedTotalAmount,
                totalItems: updatedTotalItems,
            };
            
        case 'REMOVE_ITEM':
            const filteredItems = state.items.filter(item => item.id !== action.payload.id);
            const newTotalAmount = filteredItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            const newTotalItems = filteredItems.reduce((total, item) => total + item.quantity, 0);
            
            return {
                ...state,
                items: filteredItems,
                totalAmount: newTotalAmount,
                totalItems: newTotalItems,
            };
            
        case 'UPDATE_QUANTITY':
            const updatedQuantityItems = state.items.map(item =>
                item.id === action.payload.id
                    ? { ...item, quantity: Math.max(0, action.payload.quantity) }
                    : item
            ).filter(item => item.quantity > 0);
            
            const quantityTotalAmount = updatedQuantityItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            const quantityTotalItems = updatedQuantityItems.reduce((total, item) => total + item.quantity, 0);
            
            return {
                ...state,
                items: updatedQuantityItems,
                totalAmount: quantityTotalAmount,
                totalItems: quantityTotalItems,
            };
            
        case 'CLEAR_CART':
            return initialState;
            
        case 'LOAD_CART':
            return action.payload;
            
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Load cart from localStorage on component mount
    useEffect(() => {
        const savedCart = localStorage.getItem('driftoz-cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                dispatch({ type: 'LOAD_CART', payload: parsedCart });
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('driftoz-cart', JSON.stringify(state));
    }, [state]);

    const addItem = (item) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
    };

    const removeItem = (item) => {
        dispatch({ type: 'REMOVE_ITEM', payload: item });
    };

    const updateQuantity = (id, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const getItemQuantity = (id) => {
        const item = state.items.find(item => item.id === id);
        return item ? item.quantity : 0;
    };

    return (
        <CartContext.Provider value={{ 
            cartItems: state.items, 
            totalAmount: state.totalAmount,
            totalItems: state.totalItems,
            addItem, 
            removeItem, 
            updateQuantity,
            clearCart,
            getItemQuantity 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};

export { CartContext };