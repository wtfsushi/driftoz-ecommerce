import React from 'react';

const SimpleApp = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-orange-500 mb-4">
        DriftoZ - 3D Craft Shop
      </h1>
      <p className="text-xl text-gray-300 mb-8">
        Welcome to our amazing e-commerce site!
      </p>
      
      {/* Test basic Tailwind classes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-orange-400 mb-2">Test Card 1</h3>
          <p className="text-gray-400">Basic Tailwind styling is working!</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-orange-400 mb-2">Test Card 2</h3>
          <p className="text-gray-400">Responsive grid is working!</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-orange-400 mb-2">Test Card 3</h3>
          <p className="text-gray-400">Colors and spacing work!</p>
        </div>
      </div>
      
      <div className="mt-8">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors duration-200">
          Test Button
        </button>
      </div>
    </div>
  );
};

export default SimpleApp;
