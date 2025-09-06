import React, { useEffect, useState } from 'react';

const LoadingScreen = ({ isLoading, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Starting Engines...');

  useEffect(() => {
    if (!isLoading) return;

    const loadingSteps = [
      { progress: 20, text: 'Starting Engines...' },
      { progress: 40, text: 'Warming up Tires...' },
      { progress: 60, text: 'Checking Drift Setup...' },
      { progress: 80, text: 'Ready to Race...' },
      { progress: 100, text: 'Let\'s Drift!' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setProgress(step.progress);
        setLoadingText(step.text);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => onComplete && onComplete(), 500);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-drift-black via-dark-800 to-drift-gray z-50 flex items-center justify-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-drift-yellow rounded-full animate-spin-slow"></div>
        <div className="absolute top-20 right-20 w-16 h-16 border-2 border-drift-gold rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 border-2 border-drift-yellow rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-drift-gold rounded-full animate-spin-slow"></div>
      </div>

      {/* Speed lines background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-drift-yellow to-transparent opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: '-100px',
              width: '200px',
              animationName: 'slideRight',
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 2}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        {/* Main car animation */}
        <div className="relative mb-12">
          <div className="w-40 h-24 mx-auto relative animate-car-move">
            {/* Car shadow */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-black rounded-full opacity-30 blur-sm"></div>
            
            {/* Car body */}
            <div className="relative w-full h-16 bg-gradient-to-r from-drift-yellow via-drift-gold to-drift-yellow rounded-2xl shadow-glow-lg">
              {/* Car details */}
              <div className="absolute inset-2 bg-drift-black rounded-xl">
                {/* Windshield */}
                <div className="absolute top-2 left-6 w-16 h-6 bg-gradient-to-b from-blue-300 to-blue-500 rounded-t-lg opacity-80"></div>
                
                {/* Headlights */}
                <div className="absolute top-4 left-1 w-3 h-3 bg-white rounded-full shadow-glow animate-pulse"></div>
                <div className="absolute bottom-4 left-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                
                {/* Side details */}
                <div className="absolute top-1/2 left-8 transform -translate-y-1/2 w-12 h-1 bg-drift-yellow rounded-full"></div>
                <div className="absolute top-1/2 left-8 transform translate-y-1 w-8 h-0.5 bg-drift-gold rounded-full"></div>
              </div>
              
              {/* Wheels */}
              <div className="absolute -bottom-2 left-4 w-6 h-6 bg-gray-800 rounded-full border-2 border-drift-yellow animate-spin-slow">
                <div className="absolute inset-1 bg-gray-600 rounded-full"></div>
              </div>
              <div className="absolute -bottom-2 right-4 w-6 h-6 bg-gray-800 rounded-full border-2 border-drift-yellow animate-spin-slow">
                <div className="absolute inset-1 bg-gray-600 rounded-full"></div>
              </div>
              
              {/* Exhaust particles */}
              <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2">
                <div className="w-2 h-2 bg-gray-400 rounded-full opacity-70 animate-ping"></div>
                <div className="w-1 h-1 bg-gray-300 rounded-full opacity-50 animate-ping absolute top-1 left-3"></div>
                <div className="w-1 h-1 bg-gray-200 rounded-full opacity-30 animate-ping absolute top-2 left-5"></div>
              </div>
            </div>
          </div>
          
          {/* Drift smoke */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-gray-300 rounded-full opacity-40 animate-ping"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1.5s',
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Loading text */}
        <h1 className="text-4xl font-racing text-drift-yellow mb-8 animate-pulse-glow">
          DRIFT<span className="text-white">oZ</span>
        </h1>

        {/* Progress bar */}
        <div className="w-80 mx-auto mb-6">
          <div className="flex justify-between text-sm text-drift-yellow mb-2">
            <span className="font-racing">Loading...</span>
            <span className="font-racing">{progress}%</span>
          </div>
          
          <div className="w-full bg-dark-700 rounded-full h-3 overflow-hidden">
            <div className="relative h-full">
              <div
                className="h-full bg-gradient-to-r from-drift-yellow to-drift-gold transition-all duration-500 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading status text */}
        <p className="text-xl text-white font-modern animate-fade-in">
          {loadingText}
        </p>

        {/* Racing flag animation */}
        <div className="mt-8 flex justify-center space-x-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 ${
                i % 2 === 0 ? 'bg-white' : 'bg-drift-black'
              } animate-bounce`}
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s',
              }}
            ></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideRight {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(calc(100vw + 100px));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
