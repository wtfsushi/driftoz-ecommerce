import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import CustomCursor from './components/common/CustomCursor';
import LoadingScreen from './components/common/LoadingScreen';
import ErrorBoundary from './components/common/ErrorBoundary';
import HeaderModern from './components/layout/HeaderModern';
import FooterModern from './components/layout/FooterModern';

// Pages
import HomeModern from './pages/HomeModern';
import ProductsModern from './pages/ProductsModern';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';

// Styles
import './main.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <ErrorBoundary>
      <div className="App relative min-h-screen bg-background-primary scroll-smooth">
        <AuthProvider>
          <CartProvider>
            <Router>
              {/* Custom Cursor */}
              <CustomCursor />
              
              {/* Loading Screen */}
              <LoadingScreen 
                isLoading={isLoading} 
                onComplete={handleLoadingComplete} 
              />

              {/* Main App Content */}
              {!isLoading && (
                <div className="relative z-10">
                  <HeaderModern />
                
                <main className="min-h-screen">
                  <Switch>
                    <Route exact path="/" component={HomeModern} />
                    <Route exact path="/products" component={ProductsModern} />
                    <Route path="/products/:id" component={ProductDetail} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                    <Route path="/admin" component={Admin} />
                  </Switch>
                </main>

                <FooterModern />
              </div>
            )}

            {/* Background Animation Elements */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
              {/* Floating particles */}
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-accent-400 rounded-full opacity-30 animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 6}s`,
                    animationDuration: `${8 + Math.random() * 4}s`,
                  }}
                />
              ))}
              
              {/* Subtle gradient orbs */}
              <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-accent-500/5 rounded-full filter blur-3xl animate-float"></div>
              <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </div>
    </ErrorBoundary>
  );
};

export default App;