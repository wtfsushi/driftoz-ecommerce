import React from 'react';

const Button = ({ 
    children, 
    onClick, 
    className = '', 
    type = 'button', 
    variant = 'primary', 
    size = 'md',
    disabled = false,
    label,
    ...props 
}) => {
    const baseClasses = 'relative overflow-hidden font-bold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-drift-yellow/50 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
        primary: 'bg-gradient-to-r from-drift-yellow to-yellow-400 text-drift-black hover:from-yellow-400 hover:to-drift-yellow shadow-lg shadow-drift-yellow/25',
        secondary: 'bg-gradient-to-r from-drift-black to-gray-900 text-drift-yellow border border-drift-yellow hover:bg-drift-yellow hover:text-drift-black shadow-lg shadow-drift-yellow/25',
        outline: 'border-2 border-drift-yellow text-drift-yellow hover:bg-drift-yellow hover:text-drift-black bg-transparent',
        danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25'
    };
    
    const sizes = {
        sm: 'px-4 py-2 text-sm rounded-lg',
        md: 'px-6 py-3 text-base rounded-xl',
        lg: 'px-8 py-4 text-lg rounded-xl',
        xl: 'px-10 py-5 text-xl rounded-2xl'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            <span className="relative z-10">
                {label || children}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
    );
};

export default Button;