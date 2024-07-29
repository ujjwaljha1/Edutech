// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const WhatWeAre = () => {
//   const sectionRef = useRef(null);
//   const titleRef = useRef(null);
//   const contentRef = useRef(null);
//   const imageRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from(titleRef.current, {
//         y: 50,
//         opacity: 0,
//         duration: 1,
//         scrollTrigger: {
//           trigger: titleRef.current,
//           start: 'top 80%',
//         },
//       });

//       gsap.from(contentRef.current, {
//         y: 50,
//         opacity: 0,
//         duration: 1,
//         delay: 0.5,
//         scrollTrigger: {
//           trigger: contentRef.current,
//           start: 'top 80%',
//         },
//       });

//       gsap.from(imageRef.current, {
//         scale: 0.8,
//         opacity: 0,
//         duration: 1,
//         delay: 0.8,
//         scrollTrigger: {
//           trigger: imageRef.current,
//           start: 'top 80%',
//         },
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div className="bg-gradient-to-br from-indigo-100 to-purple-100 min-h-screen">
//       <section ref={sectionRef} className="py-20">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 ref={titleRef} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-center text-indigo-800 mb-12 leading-tight">
//             Join Our <span className="text-purple-600">Visionary</span> Team
//           </h1>
          
//           <div className="flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0 lg:space-x-12">
//             <div ref={contentRef} className="lg:w-1/2">
//               <h2 className="text-3xl font-bold text-indigo-700 mb-6">What We Are</h2>
//               <p className="text-xl text-indigo-600 mb-8 leading-relaxed">
//                 We are pioneers in the world of technology and innovation. Our team is composed of dreamers, thinkers, and doers who are passionate about shaping the future of digital learning and empowering individuals to reach their full potential.
//               </p>
//               <p className="text-xl text-indigo-600 mb-8 leading-relaxed">
//                 At LovelyLearn, we're not just a company; we're a movement. We're dedicated to revolutionizing education through cutting-edge technology, creative solutions, and a deep understanding of human potential.
//               </p>
//               <button className="px-8 py-3 bg-purple-600 text-white rounded-full font-bold text-lg hover:bg-purple-700 transition duration-300 ease-in-out shadow-xl transform hover:scale-105">
//                 Explore Opportunities
//               </button>
//             </div>
            
//             <div ref={imageRef} className="lg:w-1/2 relative">
//               <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-3xl transform rotate-3 scale-105"></div>
//               <img
//                 src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                 alt="Technology and Innovation"
//                 className="relative rounded-3xl shadow-2xl transform -rotate-3 hover:rotate-0 transition duration-500 ease-in-out"
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default WhatWeAre;

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhatWeAre = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, contentRef.current, imageRef.current, buttonRef.current], { autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(titleRef.current, { y: 50 }, { y: 0, autoAlpha: 1, duration: 0.8 })
        .fromTo(contentRef.current, { y: 30 }, { y: 0, autoAlpha: 1, duration: 0.8 }, '-=0.4')
        .fromTo(imageRef.current, { scale: 0.8, rotation: -5 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.7 }, '-=0.5')
        .fromTo(buttonRef.current, { y: 20 }, { y: 0, autoAlpha: 1, duration: 0.5 }, '-=0.3');

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        animation: tl,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-pink-100 to-red-100 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-12 text-red-800">
          What We Are
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div ref={contentRef} className="lg:w-1/2 mb-12 lg:mb-0">
            <p className="text-xl text-red-700 mb-8">
              We are pioneers in the world of technology and innovation. Our team is composed of dreamers, thinkers, and doers who are passionate about shaping the future of digital learning and empowering individuals to reach their full potential.
            </p>
            <p className="text-xl text-red-700 mb-8">
              At LovelyLearn, we're not just a company; we're a movement. We're dedicated to revolutionizing education through cutting-edge technology, creative solutions, and a deep understanding of human potential.
            </p>
            <button
              ref={buttonRef}
              className="px-8 py-3 bg-red-500 text-white rounded-full font-bold text-lg hover:bg-red-600 transition duration-300 ease-in-out shadow-xl"
            >
              Explore Opportunities
            </button>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-400 to-red-300 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
            <img
              ref={imageRef}
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Technology and Innovation"
              className="relative z-10 rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default WhatWeAre;