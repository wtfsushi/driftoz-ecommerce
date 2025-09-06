import React from 'react';

const TailwindTest = () => {
  return (
    <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-2">Tailwind CSS Test</h1>
      <p className="text-lg">If you can see this with red background, Tailwind is working!</p>
      <div className="mt-4 space-y-2">
        <div className="bg-blue-500 p-2 rounded">Blue Box</div>
        <div className="bg-green-500 p-2 rounded">Green Box</div>
        <div className="bg-yellow-500 p-2 rounded">Yellow Box</div>
      </div>
    </div>
  );
};

export default TailwindTest;
