// src/components/Loader.js
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

const Loader = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/animations/Animation - 1722190040736.json`)
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error('Failed to load Lottie animation:', err));
  }, []);

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
      {animationData && (
        <Lottie animationData={animationData} style={{ width: 200, height: 200 }} />
      )}
    </div>
  );
};

export default Loader;
