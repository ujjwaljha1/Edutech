// src/components/Notification.js

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { Bell, X, Star, Zap, Brain, Code, Users, Cookie } from 'lucide-react';

const Notification = () => {
  const [showTestingNotification, setShowTestingNotification] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const lottieRef = useRef();

  useEffect(() => {
    const hasSeenNotification = localStorage.getItem('hasSeenNotification');
    if (!hasSeenNotification) {
      setShowTestingNotification(true);
      localStorage.setItem('hasSeenNotification', 'true');
    }

    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent !== 'true') {
      setShowCookieConsent(true);
    }

    // Load animation JSON from public folder
    fetch(`${process.env.PUBLIC_URL}/lottie/Animation - 1722156898294.json`)
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.5);
    }
  }, [showTestingNotification]);

  const handleTestingNotificationClose = () => {
    setShowTestingNotification(false);
  };

  const handleCookieConsent = (accepted) => {
    setShowCookieConsent(false);
    if (accepted) {
      localStorage.setItem('cookieConsent', 'true');
    }
  };

  const features = [
    { icon: <Star className="mr-2 text-yellow-400" size={20} />, text: 'Premium membership', emoji: '🌟' },
    { icon: <Zap className="mr-2 text-blue-400" size={20} />, text: 'Quiz exams', emoji: '⚡' },
    { icon: <Brain className="mr-2 text-purple-400" size={20} />, text: 'Personalized learning paths', emoji: '🧠' },
    { icon: <Code className="mr-2 text-green-400" size={20} />, text: 'Live coding challenges', emoji: '💻' },
    { icon: <Users className="mr-2 text-red-400" size={20} />, text: 'Mentorship program', emoji: '👥' },
  ];

  return (
    <>
      <AnimatePresence>
        {showTestingNotification && animationData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={handleTestingNotificationClose}
            />
            <motion.div
              className="relative bg-white p-6 rounded-xl shadow-2xl max-w-4xl w-11/12 flex flex-col md:flex-row items-center overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <button
                onClick={handleTestingNotificationClose}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                <X size={24} />
              </button>
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <Lottie
                  lottieRef={lottieRef}
                  animationData={animationData}
                  loop={true}
                  className="w-full h-48 md:h-64"
                />
              </div>
              <div className="w-full md:w-2/3 md:pl-6">
                <motion.h3
                  className="text-3xl font-bold mb-4 flex items-center text-indigo-600"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Bell className="mr-2" /> The Future is Loading... 🚀
                </motion.h3>
                <motion.p
                  className="mb-4 text-gray-700"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Buckle up, tech enthusiasts! 🎢 We're crafting a digital wonderland that'll make your neurons dance:
                </motion.p>
                <ul className="list-none mb-6 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center text-gray-800"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      {feature.icon}
                      <span>{feature.text}</span>
                      <span className="ml-2">{feature.emoji}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.p
                  className="mb-6 text-gray-700"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  Your data is locked up tighter than a dragon's treasure chest. Trust us, we're basically digital locksmiths! 🔒✨
                </motion.p>
                <motion.button
                  onClick={handleTestingNotificationClose}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-full transition-colors transform hover:scale-105 duration-200 ease-in-out"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Let's Rock This Digital Party! 🎉
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCookieConsent && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 p-6 rounded-xl shadow-2xl max-w-md w-11/12"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
            }}
          >
            <motion.div
              className="flex items-center mb-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Cookie className="mr-2 text-indigo-500" size={24} />
              <p className="text-lg font-semibold text-gray-800">Cookie Consent 🍪</p>
            </motion.div>
            <motion.p
              className="mb-4 text-gray-600"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept," you consent to our use of cookies.
            </motion.p>
            <div className="flex justify-end space-x-4">
              <motion.button
                onClick={() => handleCookieConsent(true)}
                className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Accept
              </motion.button>
              <motion.button
                onClick={() => handleCookieConsent(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Decline
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Notification;
