import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Benifit = () => {
  const benefitsRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const benefits = benefitsRef.current.children;
      const title = titleRef.current;

      gsap.set([title, ...benefits], { autoAlpha: 0, y: 50 });

      gsap.to(title, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
        },
      });

      gsap.to(benefits, {
        autoAlpha: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: benefitsRef.current,
          start: 'top 70%',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const benefits = [
    { icon: '🏠', title: 'Work From Home', description: 'Enjoy the comfort of your own space' },
    { icon: '⏰', title: 'Flexible Hours', description: 'Work from 10 AM to 4 PM' },
    { icon: '💰', title: 'Incentives', description: 'Earn bonuses for your hard work' },
    { icon: '✈️', title: 'Paid Trips', description: 'Explore new places on company time' },
    { icon: '📅', title: '5 Days Off Monthly', description: 'Extra time for yourself and loved ones' },
    { icon: '🏥', title: 'Paid Sick Leave', description: 'Take care of your health worry-free' },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-16 text-red-800">
          Join Our Lovely Team
        </h2>
        <div ref={benefitsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-80 rounded-lg p-6 shadow-xl transition-transform duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-red-700">{benefit.title}</h3>
              <p className="text-red-600">{benefit.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-red-500 text-white rounded-full font-bold text-lg hover:bg-red-600 transition duration-300 ease-in-out shadow-xl">
            Apply Now
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 0L60 10C120 20 240 40 360 50C480 60 600 60 720 50C840 40 960 20 1080 15C1200 10 1320 20 1380 25L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="#fff"
          />
        </svg>
      </div>
    </section>
  );
};

export default Benifit;