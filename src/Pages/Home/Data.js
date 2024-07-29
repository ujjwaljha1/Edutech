import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Data = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { label: 'Daily Users', value: 10000, icon: '👥' },
    { label: 'Monthly Views', value: 2000000, icon: '👀' },
    { label: 'Daily Reports Solved', value: 5, icon: '✅' },
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M+`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K+`;
    return `${num}+`;
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-pink-100 to-red-100 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-red-800 mb-12">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-6 shadow-xl text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <h3 className="text-xl font-semibold text-red-700 mb-2">{stat.label}</h3>
              <motion.p
                className="text-3xl font-bold text-red-800"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 2 }}
                >
                  {inView ? (
                    <Counter from={0} to={stat.value} duration={2} />
                  ) : (
                    formatNumber(0)
                  )}
                </motion.span>
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
      <FloatingIcons />
    </section>
  );
};

const Counter = ({ from, to, duration }) => {
  const [count, setCount] = React.useState(from);

  React.useEffect(() => {
    let startTime;
    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * (to - from) + from));
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    requestAnimationFrame(animateCount);
  }, [from, to, duration]);

  return <>{count.toLocaleString()}+</>;
};

const FloatingIcons = () => (
  <div className="absolute inset-0 pointer-events-none">
    {['🚀', '📚', '🎓', '💡', '🌟', '🔬', '🎨', '🎵', '🌈', '🧠'].map((icon, index) => (
      <motion.div
        key={index}
        className="absolute text-3xl opacity-20"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          y: ['0%', `${Math.random() * 100 - 50}%`],
          x: ['0%', `${Math.random() * 100 - 50}%`],
          rotate: [0, Math.random() * 360],
        }}
        transition={{
          duration: Math.random() * 2 + 3,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      >
        {icon}
      </motion.div>
    ))}
  </div>
);

export default Data;