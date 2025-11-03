import React from 'react';

const Loading = () => {
  return (
    <div className='flex justify-center h-40 items-center '>
      <div className="flex space-x-2">
        <div className="w-6 h-6 bg-blue-500 rounded-full animate-blink"></div>
        <div className="w-6 h-6 bg-green-500 rounded-full animate-blink delay-200"></div>
        <div className="w-6 h-6 bg-red-500 rounded-full animate-blink delay-400"></div>
      </div>
    </div>
  );
};

export default Loading;
