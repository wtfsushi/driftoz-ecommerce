import React, { createContext, useContext, useEffect, useReducer } from 'react';

const OrdersContext = createContext();

const initialState = {
  orders: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return { orders: action.payload || [] };
    case 'ADD_ORDER':
      return { orders: [action.payload, ...state.orders] };
    default:
      return state;
  }
}

export const OrdersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('driftoz-orders');
      if (raw) dispatch({ type: 'LOAD', payload: JSON.parse(raw) });
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem('driftoz-orders', JSON.stringify(state.orders)); } catch {}
  }, [state.orders]);

  const createOrder = ({ userId, items, total }) => {
    const order = {
      id: `${Date.now()}`,
      userId,
      items,
      total,
      status: 'Completed',
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_ORDER', payload: order });
    return order;
  };

  return (
    <OrdersContext.Provider value={{ orders: state.orders, createOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);

export { OrdersContext };
