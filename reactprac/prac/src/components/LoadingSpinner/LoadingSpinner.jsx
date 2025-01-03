import React from 'react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen bg-gray-900">
    <div className="relative w-20 h-20">
      <div className="absolute w-4 h-4 rounded-full bg-teal-400 animate-ping"></div>
      <div className="absolute w-4 h-4 rounded-full bg-teal-400 animate-ping delay-200"></div>
      <div className="absolute w-4 h-4 rounded-full bg-teal-400 animate-ping delay-400"></div>
    </div>
  </div>
);

export default LoadingSpinner;