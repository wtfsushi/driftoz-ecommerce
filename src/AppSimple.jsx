import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import ErrorBoundary from './components/common/ErrorBoundary';
import Header from './components/layout/Header';

// Pages  
import HomeModern from './pages/HomeModern';

// Styles
import './main.css';

const App = () => {
  return (
    <ErrorBoundary>
      <div className="App relative min-h-screen bg-black text-white">
        <AuthProvider>
          <CartProvider>
            <Router>
              <Header />
              
              <main className="min-h-screen pt-20">
                <Switch>
                  <Route exact path="/" component={HomeModern} />
                  <Route path="*" render={() => (
                    <div className="text-center py-16">
                      <h2 className="text-2xl text-orange-400 mb-4">Page Not Found</h2>
                      <p className="text-gray-400">This page doesn't exist yet.</p>
                    </div>
                  )} />
                </Switch>
              </main>
            </Router>
          </CartProvider>
        </AuthProvider>
      </div>
    </ErrorBoundary>
  );
};

export default App;
