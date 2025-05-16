import React, { useState, useEffect } from 'react';
import { Loader2, BookOpen, Coffee, Brain } from 'lucide-react';

const FrustratingFantasticLoader = () => {
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [dots, setDots] = useState('');

  const loadingMessages = [
    "Compiling knowledge",
    "Brewing educational coffee",
    "Stretching mental muscles",
    "Almost there, we promise",
    "Just kidding, still loading",
    "Hang in there, future genius!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingPhase((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);

    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(dotInterval);
    };
  }, []);

  const getIcon = () => {
    switch (loadingPhase) {
      case 0: return <BookOpen className="animate-bounce" />;
      case 1: return <Coffee className="animate-spin" />;
      case 2: return <Brain className="animate-pulse" />;
      default: return <Loader2 className="animate-spin" />;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center text-white">
        <div className="mb-4 text-6xl">
          {getIcon()}
        </div>
        <h2 className="text-2xl font-bold mb-2">Loading Your Learning Adventure</h2>
        <p className="text-lg mb-4">{loadingMessages[loadingPhase]}{dots}</p>
        <div className="w-64 h-2 bg-white rounded-full mx-auto overflow-hidden">
          <div 
            className="h-full bg-yellow-400 transition-all duration-300 ease-out"
            style={{ width: `${((loadingPhase + 1) / loadingMessages.length) * 100}%` }}
          ></div>
        </div>
        <p className="mt-4 text-sm italic">Pro tip: The more frustrated you get, the faster we load!</p>
      </div>
    </div>
  );
};

export default FrustratingFantasticLoader;