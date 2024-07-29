import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Aim = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(imageRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(contentRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen">
      <section ref={sectionRef} className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 ref={titleRef} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-center text-blue-800 mb-16 leading-tight">
            Shaping the <span className="text-purple-600">Future</span> of Learning
          </h1>
          
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0 lg:space-x-12">
            <div ref={imageRef} className="lg:w-1/2 relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-3xl transform -rotate-3 scale-105"></div>
              <img
                src="https://plus.unsplash.com/premium_vector-1682301078214-f62f59f47e1c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFpbXxlbnwwfHwwfHx8MA%3D%3D"
                alt="What We Aim For"
                className="relative rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500 ease-in-out"
              />
            </div>
            
            <div ref={contentRef} className="lg:w-1/2 order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-blue-700 mb-6">What We Aim For</h2>
              <p className="text-xl text-blue-600 mb-8 leading-relaxed">
                At LovelyLearn, our aim is to revolutionize the educational landscape. We strive to create a world where learning is accessible, engaging, and tailored to individual needs. Our goal is to empower learners of all ages with the tools and knowledge they need to succeed in an ever-evolving digital world.
              </p>
              <p className="text-xl text-blue-600 mb-8 leading-relaxed">
                We're committed to pushing the boundaries of educational technology, leveraging artificial intelligence, and creating immersive learning experiences that inspire curiosity and foster lifelong learning.
              </p>
              <button className="px-8 py-3 bg-purple-600 text-white rounded-full font-bold text-lg hover:bg-purple-700 transition duration-300 ease-in-out shadow-xl transform hover:scale-105">
                Join Our Mission
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aim;

//Testing code

// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const Aim = () => {
//   const sectionRef = useRef(null);
//   const titleRef = useRef(null);
//   const contentRef = useRef(null);
//   const imageRef = useRef(null);
//   const buttonRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.set([titleRef.current, contentRef.current, imageRef.current, buttonRef.current], { autoAlpha: 0 });

//       const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

//       tl.fromTo(titleRef.current, { y: 50 }, { y: 0, autoAlpha: 1, duration: 0.8 })
//         .fromTo(imageRef.current, { scale: 0.8, rotation: 5 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.7 }, '-=0.5')
//         .fromTo(contentRef.current, { y: 30 }, { y: 0, autoAlpha: 1, duration: 0.8 }, '-=0.4')
//         .fromTo(buttonRef.current, { y: 20 }, { y: 0, autoAlpha: 1, duration: 0.5 }, '-=0.3');

//       ScrollTrigger.create({
//         trigger: sectionRef.current,
//         start: 'top center',
//         end: 'bottom center',
//         animation: tl,
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-pink-100 to-red-100 py-20">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <h2 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-12 text-red-800">
//           Shaping the Future of Learning
//         </h2>
//         <div className="flex flex-col lg:flex-row-reverse items-center justify-between">
//           <div ref={contentRef} className="lg:w-1/2 mb-12 lg:mb-0">
//             <p className="text-xl text-red-700 mb-8">
//               At LovelyLearn, our aim is to revolutionize the educational landscape. We strive to create a world where learning is accessible, engaging, and tailored to individual needs. Our goal is to empower learners of all ages with the tools and knowledge they need to succeed in an ever-evolving digital world.
//             </p>
//             <p className="text-xl text-red-700 mb-8">
//               We're committed to pushing the boundaries of educational technology, leveraging artificial intelligence, and creating immersive learning experiences that inspire curiosity and foster lifelong learning.
//             </p>
//             <button
//               ref={buttonRef}
//               className="px-8 py-3 bg-red-500 text-white rounded-full font-bold text-lg hover:bg-red-600 transition duration-300 ease-in-out shadow-xl"
//             >
//               Join Our Mission
//             </button>
//           </div>
//           <div className="w-full lg:w-1/2 relative">
//             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-400 to-red-300 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
//             <img
//               ref={imageRef}
//               src="https://plus.unsplash.com/premium_vector-1682301078214-f62f59f47e1c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFpbXxlbnwwfHwwfHx8MA%3D%3D"
//               alt="What We Aim For"
//               className="relative z-10 rounded-3xl shadow-2xl"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="absolute bottom-0 left-0 w-full overflow-hidden">
//         <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path
//             d="M0 0L60 10C120 20 240 40 360 50C480 60 600 60 720 50C840 40 960 20 1080 15C1200 10 1320 20 1380 25L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
//             fill="#fff"
//           />
//         </svg>
//       </div>
//     </section>
//   );
// };

// export default Aim;