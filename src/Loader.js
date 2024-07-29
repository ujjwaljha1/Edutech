// src/components/Loader.js
import React from 'react';
import Lottie from 'lottie-react';
import animationData from './Animation - 1722190040736.json';

const Loader = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      zIndex: 9999
    }}>
      <Lottie animationData={animationData} style={{ width: 200, height: 200 }} />
    </div>
  );
};

export default Loader;