import React from 'react';

const Button = ({ 
    children, 
    onClick, 
    className = '', 
    type = 'button', 
    variant = 'primary', 
    size = 'md',
    disabled = false,
    loading = false,
    icon = null,
    iconPosition = 'left',
    fullWidth = false,
    ...props 
}) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
    
    const variants = {
        primary: 'btn btn-primary',
        secondary: 'btn btn-secondary',
        outline: 'btn btn-outline',
        ghost: 'btn btn-ghost',
        danger: 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white border border-red-500 hover:border-red-600 shadow-lg hover:shadow-xl backdrop-blur-sm'
    };
    
    const sizes = {
        sm: 'px-3 py-1.5 text-sm rounded-lg min-h-[32px]',
        md: 'px-4 py-2 text-base rounded-xl min-h-[40px]',
        lg: 'px-6 py-3 text-lg rounded-xl min-h-[48px]',
        xl: 'px-8 py-4 text-xl rounded-2xl min-h-[56px]'
    };

    const getClasses = () => {
        const classes = [baseClasses];
        
        if (variants[variant]) {
            classes.push(variants[variant]);
        }
        
        if (sizes[size]) {
            classes.push(sizes[size]);
        }
        
        if (fullWidth) {
            classes.push('w-full');
        }
        
        if (className) {
            classes.push(className);
        }
        
        return classes.join(' ');
    };

    const renderIcon = () => {
        if (loading) {
            return (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                    />
                    <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            );
        }
        
        return icon;
    };

    const iconElement = renderIcon();

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={getClasses()}
            {...props}
        >
            {/* Background animation */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            {/* Content */}
            <span className="relative flex items-center">
                {iconElement && iconPosition === 'left' && (
                    <span className={children ? 'mr-2' : ''}>
                        {iconElement}
                    </span>
                )}
                
                {children && (
                    <span className={loading ? 'opacity-0' : ''}>
                        {children}
                    </span>
                )}
                
                {iconElement && iconPosition === 'right' && (
                    <span className={children ? 'ml-2' : ''}>
                        {iconElement}
                    </span>
                )}
            </span>
            
            {/* Loading overlay */}
            {loading && (
                <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle 
                            className="opacity-25" 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            stroke="currentColor" 
                            strokeWidth="4"
                        />
                        <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                </span>
            )}
        </button>
    );
};

export default Button;
