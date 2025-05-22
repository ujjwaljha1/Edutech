
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const cardTopics = [
  { text: "Interview Prep", icon: "📝" },
  { text: "Java Dev", icon: "☕" },
  { text: "Git", icon: "🌿" },
  { text: "GitHub", icon: "🐙" },
  { text: "Data Structures", icon: "🏗️" },
  { text: "Algorithms", icon: "🧮" },
  { text: "Web Development", icon: "🌐" },
  { text: "Machine Learning", icon: "🤖" },
  { text: "Cloud Computing", icon: "☁️" },
  { text: "Cybersecurity", icon: "🔒" }
];

const AutoScrollingCards = () => {
  const containerRef = useRef(null);
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);

  useEffect(() => {
    const topRow = topRowRef.current;
    const bottomRow = bottomRowRef.current;

    gsap.to(topRow, {
      x: '-50%',
      repeat: -1,
      duration: 20,
      ease: 'linear',
    });

    gsap.to(bottomRow, {
      x: '50%',
      repeat: -1,
      duration: 20,
      ease: 'linear',
    });

    const shineElements = document.querySelectorAll('.card-shine');
    shineElements.forEach((shine) => {
      gsap.to(shine, {
        x: '150%',
        repeat: -1,
        duration: 1.5,
        ease: 'power2.inOut',
        delay: Math.random() * 2,
      });
    });
  }, []);

  const CardRow = ({ topics, reverse = false }) => (
    <div className={`flex ${reverse ? 'flex-row-reverse' : ''} whitespace-nowrap`}>
      {[...topics, ...topics].map((topic, index) => (
        <motion.div
          key={index}
          className="inline-block px-6 py-4 m-2 bg-gradient-to-br from-pink-400 to-red-300 rounded-lg shadow-lg overflow-hidden relative min-w-[200px] max-w-[300px]"
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="card-shine absolute top-0 left-0 w-[50%] h-full bg-white opacity-20 skew-x-[45deg] transform -translate-x-full"></div>
          <div className="flex items-center space-x-2 text-nowrap">
            <span className="text-2xl">{topic.icon}</span>
            <p className="text-lg font-semibold text-white">{topic.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="py-16 w-full bg-gradient-to-br from-pink-100 to-red-100 overflow-hidden">
      <motion.h2 
        className="text-4xl font-bold text-red-800 text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        We are working on
      </motion.h2>
      <div ref={containerRef} className="w-full overflow-hidden">
        <div ref={topRowRef} className="mb-4">
          <CardRow topics={cardTopics.slice(0, 5)} />
        </div>
        <div ref={bottomRowRef} className="mt-4">
          <CardRow topics={cardTopics.slice(5)} reverse />
        </div>
      </div>
    </div>
  );
};

export default AutoScrollingCards;
