import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const updatePosition = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);
      
      // Add to trail
      setTrail(prev => {
        const newTrail = [...prev, { ...newPosition, id: Date.now() }];
        return newTrail.slice(-8); // Keep only last 8 trail points
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference">
      {/* Trail particles */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute w-2 h-2 bg-drift-yellow rounded-full opacity-60"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            opacity: (index + 1) / trail.length * 0.6,
            transform: `scale(${(index + 1) / trail.length})`,
            transition: 'all 0.1s ease-out',
          }}
        />
      ))}
      
      {/* Main cursor - Drift Car */}
      <div
        className={`absolute w-8 h-6 transition-all duration-100 ease-out ${
          isClicked ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: position.x - 16,
          top: position.y - 12,
          transform: `translate(-50%, -50%) ${isClicked ? 'scale(1.5) rotate(15deg)' : 'scale(1)'}`,
        }}
      >
        {/* Car Body */}
        <div className="relative w-full h-full">
          {/* Main body */}
          <div className="absolute inset-0 bg-gradient-to-r from-drift-yellow to-drift-gold rounded-full shadow-glow">
            <div className="absolute inset-1 bg-drift-black rounded-full">
              {/* Windshield */}
              <div className="absolute top-1 left-2 w-3 h-1 bg-drift-yellow rounded-sm opacity-80"></div>
              {/* Headlights */}
              <div className="absolute top-2 left-0 w-1 h-1 bg-white rounded-full"></div>
              <div className="absolute bottom-2 left-0 w-1 h-1 bg-red-500 rounded-full"></div>
            </div>
          </div>
          
          {/* Wheels */}
          <div className="absolute -left-1 top-1 w-2 h-2 bg-gray-800 rounded-full border border-drift-yellow"></div>
          <div className="absolute -left-1 bottom-1 w-2 h-2 bg-gray-800 rounded-full border border-drift-yellow"></div>
          <div className="absolute -right-1 top-1 w-2 h-2 bg-gray-800 rounded-full border border-drift-yellow"></div>
          <div className="absolute -right-1 bottom-1 w-2 h-2 bg-gray-800 rounded-full border border-drift-yellow"></div>
          
          {/* Exhaust smoke when clicked */}
          {isClicked && (
            <div className="absolute -right-2 top-2 w-3 h-1">
              <div className="w-1 h-1 bg-gray-400 rounded-full opacity-70 animate-ping"></div>
              <div className="w-1 h-1 bg-gray-300 rounded-full opacity-50 animate-ping delay-100"></div>
            </div>
          )}
          
          {/* Speed lines when moving */}
          <div className="absolute -left-4 top-1 opacity-60">
            <div className="w-2 h-0.5 bg-drift-yellow animate-pulse"></div>
            <div className="w-1 h-0.5 bg-drift-yellow animate-pulse delay-75 mt-0.5"></div>
          </div>
        </div>
      </div>
      
      {/* Glow effect */}
      <div
        className="absolute w-12 h-12 bg-drift-yellow rounded-full opacity-20 animate-pulse-glow"
        style={{
          left: position.x - 24,
          top: position.y - 24,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
};

export default CustomCursor;
