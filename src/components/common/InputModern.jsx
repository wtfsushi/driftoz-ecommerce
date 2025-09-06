import React, { useState, forwardRef } from 'react';

const Input = forwardRef(({ 
    type = 'text',
    label = '',
    placeholder = '',
    value,
    onChange,
    onBlur,
    onFocus,
    className = '',
    error = '',
    success = false,
    disabled = false,
    required = false,
    icon = null,
    iconPosition = 'left',
    helperText = '',
    size = 'md',
    fullWidth = false,
    ...props 
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleFocus = (e) => {
        setIsFocused(true);
        if (onFocus) onFocus(e);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        if (onBlur) onBlur(e);
    };

    const baseClasses = 'input transition-all duration-300';
    
    const sizes = {
        sm: 'px-3 py-1.5 text-sm rounded-lg',
        md: 'px-4 py-2 text-base rounded-xl',
        lg: 'px-5 py-3 text-lg rounded-xl'
    };

    const getClasses = () => {
        const classes = [baseClasses];
        
        if (sizes[size]) {
            classes.push(sizes[size]);
        }
        
        if (error) {
            classes.push('border-red-500 focus:border-red-500 focus:ring-red-500/20');
        } else if (success) {
            classes.push('border-green-500 focus:border-green-500 focus:ring-green-500/20');
        }
        
        if (icon) {
            if (iconPosition === 'left') {
                classes.push('pl-10');
            } else {
                classes.push('pr-10');
            }
        }
        
        if (type === 'password') {
            classes.push('pr-10');
        }
        
        if (fullWidth) {
            classes.push('w-full');
        }
        
        if (disabled) {
            classes.push('opacity-50 cursor-not-allowed');
        }
        
        if (className) {
            classes.push(className);
        }
        
        return classes.join(' ');
    };

    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
        <div className={`relative ${fullWidth ? 'w-full' : ''}`}>
            {/* Label */}
            {label && (
                <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${
                    error ? 'text-red-400' : 
                    success ? 'text-green-400' : 
                    isFocused ? 'text-accent-400' : 'text-neutral-400'
                }`}>
                    {label}
                    {required && <span className="text-red-400 ml-1">*</span>}
                </label>
            )}

            {/* Input Container */}
            <div className="relative">
                {/* Left Icon */}
                {icon && iconPosition === 'left' && (
                    <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 transition-colors duration-200 ${
                        isFocused ? 'text-accent-400' : ''
                    }`}>
                        {icon}
                    </div>
                )}

                {/* Input */}
                <input
                    ref={ref}
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={disabled}
                    required={required}
                    className={getClasses()}
                    {...props}
                />

                {/* Right Icon */}
                {icon && iconPosition === 'right' && (
                    <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 transition-colors duration-200 ${
                        isFocused ? 'text-accent-400' : ''
                    }`}>
                        {icon}
                    </div>
                )}

                {/* Password Toggle */}
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-accent-400 transition-colors duration-200"
                    >
                        {showPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                )}

                {/* Success Icon */}
                {success && !error && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                )}

                {/* Error Icon */}
                {error && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Helper Text / Error Message */}
            {(helperText || error) && (
                <div className={`mt-1 text-sm ${
                    error ? 'text-red-400' : 'text-neutral-400'
                }`}>
                    {error || helperText}
                </div>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
