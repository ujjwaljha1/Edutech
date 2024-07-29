


// import React, { useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { TextPlugin } from 'gsap/TextPlugin';
// import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
// import LocomotiveScroll from 'locomotive-scroll';

// import AutoScrollingCards from './AutoScrollingCards';
// import BugReportSection from './BugReportSection';
// import Course from './Course';
// import Data from './Data';
// import Footer from './Footer';
// import TestimonialSection from './Testimonials';

// gsap.registerPlugin(ScrollTrigger, TextPlugin, MotionPathPlugin);

// const Hero = () => {
//   const scrollRef = useRef(null);
//   const heroRef = useRef(null);
//   const buttonRef = useRef(null);
//   const imageRef = useRef(null);
//   const titleRef = useRef(null);
//   const heartIconRef = useRef(null);
//   const floatingItemsRef = useRef(null);
//   const contentRef = useRef(null);

//   const navigate = useNavigate();

//   const handleButtonClick = () => {
//     navigate('/Courses');
//   };

//   useEffect(() => {
//     const locoScroll = new LocomotiveScroll({
//       el: scrollRef.current,
//       smooth: true,
//       multiplier: 1,
//       class: 'is-revealed',
//       smartphone: {
//         smooth: true,
//       },
//       tablet: {
//         smooth: true,
//       },
//     });

//     ScrollTrigger.scrollerProxy(scrollRef.current, {
//       scrollTop(value) {
//         return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
//       },
//       getBoundingClientRect() {
//         return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
//       },
//     });

//     locoScroll.on('scroll', ScrollTrigger.update);

//     const ctx = gsap.context(() => {
//       const hero = heroRef.current;
//       const button = buttonRef.current;
//       const image = imageRef.current;
//       const title = titleRef.current;
//       const heartIcon = heartIconRef.current;
//       const floatingItems = Array.from(floatingItemsRef.current.children);
//       const content = contentRef.current;

//       gsap.set([button, image, title, heartIcon, ...floatingItems], { autoAlpha: 0 });

//       const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

//       tl.fromTo(hero, { backgroundColor: '#fff5f5' }, { backgroundColor: '#fff0f0', duration: 1 })
//         .fromTo(title, { y: 50 }, { y: 0, autoAlpha: 1, duration: 0.8 }, '-=0.5')
//         .fromTo(button, { y: 20 }, { y: 0, autoAlpha: 1, duration: 0.5 }, '-=0.3')
//         .fromTo(image, { scale: 0.8, rotation: -10 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.7 }, '-=0.5')
//         .fromTo(heartIcon, { scale: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out(1.7)' });

//       gsap.to(title, {
//         duration: 2,
//         text: 'Welcome to LovelyLearn',
//         ease: 'none',
//         delay: 0.5,
//       });

//       gsap.to(heartIcon, {
//         scale: 1.1,
//         repeat: -1,
//         yoyo: true,
//         duration: 0.8,
//         ease: 'power1.inOut',
//       });

//       gsap.to(floatingItems, {
//         autoAlpha: 0.5,
//         stagger: 0.2,
//         duration: 0.5,
//         y: 0,
//         scale: 1,
//         rotate: 0,
//         ease: 'back.out(1.7)',
//       });

//       floatingItems.forEach((item, index) => {
//         gsap.to(item, {
//           y: `random(-40, 40)`,
//           x: `random(-40, 40)`,
//           rotation: `random(-30, 30)`,
//           repeat: -1,
//           yoyo: true,
//           duration: gsap.utils.random(3, 6),
//           ease: 'sine.inOut',
//           delay: index * 0.1,
//         });
//       });

//       ScrollTrigger.create({
//         trigger: hero,
//         scroller: scrollRef.current,
//         start: 'top top',
//         end: 'bottom top',
//         scrub: true,
//         onUpdate: (self) => {
//           const progress = self.progress;
//           gsap.to(image, {
//             xPercent: progress * 20,
//             yPercent: -progress * 20,
//             duration: 0.5,
//             ease: 'power2.out',
//           });
//           gsap.to(content, {
//             xPercent: -progress * 10,
//             duration: 0.5,
//             ease: 'power2.out',
//           });
//         },
//       });

//       gsap.utils.toArray(button).forEach((btn) => {
//         btn.addEventListener('mouseenter', () => {
//           gsap.to(btn, { scale: 1.1, duration: 0.3, ease: 'power2.out' });
//         });
//         btn.addEventListener('mouseleave', () => {
//           gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' });
//         });
//       });
//     });

//     return () => {
//       locoScroll.destroy();
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//       ctx.revert();
//     };
//   }, []);

//   return (
//     <div ref={scrollRef} className="smooth-scroll">
//       <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-pink-100 to-red-100">
//         <div ref={floatingItemsRef} className="absolute inset-0 z-0">
//           {[...Array(20)].map((_, index) => (
//             <span
//               key={index}
//               className="absolute text-3xl opacity-20"
//               style={{
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`,
//               }}
//             >
//               {['❤️', '🚀', '📚', '🔥', '😍', '🌟', '🎨', '🔬', '🎵', '🌈', '🌍', '🧠'][Math.floor(Math.random() * 12)]}
//             </span>
//           ))}
//         </div>
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="flex flex-col lg:flex-row items-center justify-between">
//             <div ref={contentRef} className="lg:w-1/2 mb-12 lg:mb-0">
              
//               <h1 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-red-800">
//                 {/* Typewriter effect will be applied here */}
//               </h1>
//               <p className="text-xl text-red-700 mb-8">
//                 Embark on a journey of joyful learning and heartwarming discoveries.
//               </p>
//               <button
//                 ref={buttonRef}
//                 onClick={handleButtonClick}
//                 className="px-8 py-3 bg-red-500 text-white rounded-full font-bold text-lg hover:bg-red-600 transition duration-300 ease-in-out shadow-xl"
//               >
//                 Start Your Adventure
//               </button>
//             </div>
//             <div className="w-full lg:w-1/2 relative">
//               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-400 to-red-300 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
//               <img
//                 ref={imageRef}
//                 src="https://cdn-icons-png.flaticon.com/256/12350/12350489.png"
//                 alt="Love and Learning"
//                 className="relative z-10 rounded-3xl shadow-2xl"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="absolute bottom-0 left-0 w-full overflow-hidden">
//           <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path
//               d="M0 0L60 10C120 20 240 40 360 50C480 60 600 60 720 50C840 40 960 20 1080 15C1200 10 1320 20 1380 25L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
//               fill="#fff"
//             />
//           </svg>
//         </div>
//       </section>
//       <Course />
//       <Data />
//       <AutoScrollingCards />
//       <BugReportSection />
//       <TestimonialSection />
//       <Footer />
//     </div>
//   );
// };

// export default Hero;


import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import LocomotiveScroll from 'locomotive-scroll';

import AutoScrollingCards from './AutoScrollingCards';
import BugReportSection from './BugReportSection';
import Course from './Course';
import Data from './Data';
import Footer from './Footer';
import TestimonialSection from './Testimonials';

gsap.registerPlugin(ScrollTrigger, TextPlugin, MotionPathPlugin);

const Hero = () => {
  const scrollRef = useRef(null);
  const heroRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const heartIconRef = useRef(null);
  const floatingItemsRef = useRef(null);
  const contentRef = useRef(null);
  const cursorRef = useRef(null);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/Courses');
  };

  useEffect(() => {
    const locoScroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      class: 'is-revealed',
      smartphone: { smooth: true },
      tablet: { smooth: true },
    });

    ScrollTrigger.scrollerProxy(scrollRef.current, {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    locoScroll.on('scroll', ScrollTrigger.update);

    const ctx = gsap.context(() => {
      const hero = heroRef.current;
      const button = buttonRef.current;
      const image = imageRef.current;
      const title = titleRef.current;
      const heartIcon = heartIconRef.current;
      const floatingItems = Array.from(floatingItemsRef.current.children);
      const content = contentRef.current;
      const cursor = cursorRef.current;

      gsap.set([button, image, title, heartIcon, ...floatingItems], { autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(hero, { backgroundColor: '#fff5f5' }, { backgroundColor: '#fff0f0', duration: 1 })
        .fromTo(title, { y: 50 }, { y: 0, autoAlpha: 1, duration: 0.8 }, '-=0.5')
        .fromTo(button, { y: 20 }, { y: 0, autoAlpha: 1, duration: 0.5 }, '-=0.3')
        .fromTo(image, { scale: 0.8, rotation: -10 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.7 }, '-=0.5')
        .fromTo(heartIcon, { scale: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out(1.7)' });

      gsap.to(title, {
        duration: 2,
        text: 'Welcome to LovelyLearn',
        ease: 'none',
        delay: 0.5,
      });

      gsap.to(heartIcon, {
        scale: 1.1,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: 'power1.inOut',
      });

      gsap.to(floatingItems, {
        autoAlpha: 0.5,
        stagger: 0.2,
        duration: 0.5,
        y: 0,
        scale: 1,
        rotate: 0,
        ease: 'back.out(1.7)',
      });

      floatingItems.forEach((item, index) => {
        gsap.to(item, {
          y: `random(-40, 40)`,
          x: `random(-40, 40)`,
          rotation: `random(-30, 30)`,
          repeat: -1,
          yoyo: true,
          duration: gsap.utils.random(3, 6),
          ease: 'sine.inOut',
          delay: index * 0.1,
        });
      });

      ScrollTrigger.create({
        trigger: hero,
        scroller: scrollRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(image, {
            xPercent: progress * 20,
            yPercent: -progress * 20,
            rotation: progress * 10,
            duration: 0.5,
            ease: 'power2.out',
          });
          gsap.to(content, {
            xPercent: -progress * 10,
            duration: 0.5,
            ease: 'power2.out',
          });
        },
      });

      gsap.utils.toArray(button).forEach((btn) => {
        btn.addEventListener('mouseenter', () => {
          gsap.to(btn, { scale: 1.1, duration: 0.3, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
      });

      // Custom cursor animation
      document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2,
          ease: 'power2.out',
        });
      });

      heroRef.current.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
      });

      heroRef.current.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });
      });
    });

    return () => {
      locoScroll.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <div ref={scrollRef} className="smooth-scroll">
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-pink-100 to-red-100">
        <div ref={floatingItemsRef} className="absolute inset-0 z-0">
          {[...Array(20)].map((_, index) => (
            <span
              key={index}
              className="absolute text-3xl opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            >
              {['❤️', '🚀', '📚', '🔥', '😍', '🌟', '🎨', '🔬', '🎵', '🌈', '🌍', '🧠'][Math.floor(Math.random() * 12)]}
            </span>
          ))}
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div ref={contentRef} className="lg:w-1/2 mb-12 lg:mb-0">
              <h1 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-red-800">
                {/* Typewriter effect will be applied here */}
              </h1>
              <p className="text-xl text-red-700 mb-8 animate-pulse">
                Embark on a journey of joyful learning and heartwarming discoveries.
              </p>
              <button
                ref={buttonRef}
                onClick={handleButtonClick}
                className="px-8 py-3 bg-red-500 text-white rounded-full font-bold text-lg hover:bg-red-600 transition duration-300 ease-in-out shadow-xl relative overflow-hidden group"
              >
                <span className="relative z-10">Start Your Adventure</span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </button>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-400 to-red-300 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
              <img
                ref={imageRef}
                src="https://cdn-icons-png.flaticon.com/256/12350/12350489.png"
                alt="Love and Learning"
                className="relative z-10 rounded-3xl shadow-2xl transform hover:rotate-3 transition-transform duration-300"
              />
            </div>
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
      <div ref={cursorRef} className="fixed w-8 h-8 bg-red-500 rounded-full pointer-events-none opacity-0 z-50 mix-blend-difference"></div>
      <Course />
      <Data />
      <AutoScrollingCards />
      <BugReportSection />
      <TestimonialSection />
      <Footer />
    </div>
  );
};

export default Hero;