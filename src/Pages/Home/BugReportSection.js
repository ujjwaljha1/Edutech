// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { TextPlugin } from 'gsap/TextPlugin';
// import Lottie from 'lottie-react';
// import animationData from './Animation - 1722160135173.json';
// import { Bug, AlertTriangle, Lightbulb, Send } from 'lucide-react';

// gsap.registerPlugin(TextPlugin);

// const BugReportSection = () => {
//   const sectionRef = useRef(null);
//   const textRef = useRef(null);
//   const reportItemsRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

//       tl.fromTo(sectionRef.current, 
//         { opacity: 0, y: 50 }, 
//         { opacity: 1, y: 0, duration: 1 }
//       );

//       gsap.to(textRef.current, {
//         duration: 4,
//         text: "Your feedback is crucial in making LovelyLearn even better. Help us improve by reporting any issues you encounter!",
//         ease: "none",
//         delay: 0.5,
//       });

//       const reportItems = reportItemsRef.current.children;
//       gsap.from(reportItems, {
//         opacity: 0,
//         y: 20,
//         stagger: 0.2,
//         duration: 0.5,
//         delay: 4.5,
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   const handleReportClick = () => {
//     const subject = encodeURIComponent('Bug Report for LovelyLearn');
//     const body = encodeURIComponent('Dear LovelyLearn Team,\n\nI would like to report the following issue:\n\n[Please describe the bug or issue here]\n\nSteps to reproduce:\n1.\n2.\n3.\n\nExpected behavior:\n\nActual behavior:\n\nAdditional information:\n\nThank you for your attention to this matter.\n\nBest regards,\n[Your Name]');
//     const mailtoLink = `mailto:ujjwaljha744@gmail.com?cc=pratimesh2004@gmail.com&subject=${subject}&body=${body}`;
//     window.location.href = mailtoLink;
//   };

//   return (
//     <section ref={sectionRef} className="min-h-screen flex items-center bg-gradient-to-br from-pink-100 to-red-100 overflow-hidden py-16">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col lg:flex-row items-center justify-between">
//           <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
//             <Lottie 
//               animationData={animationData} 
//               className="w-full max-w-md mx-auto"
//             />
//           </div>
//           <div className="w-full lg:w-1/2">
//             <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-red-800 mb-6">
//               Help Us Improve
//             </h2>
//             <p ref={textRef} className="text-xl text-red-700 mb-8 min-h-[6rem]">
//               {/* Text will be animated here */}
//             </p>
//             <div ref={reportItemsRef} className="space-y-4 mb-8">
//               <div className="flex items-center space-x-4 bg-white bg-opacity-50 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
//                 <Bug className="text-red-500" size={24} />
//                 <span className="text-lg text-red-700">Report bugs or errors in the platform</span>
//               </div>
//               <div className="flex items-center space-x-4 bg-white bg-opacity-50 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
//                 <AlertTriangle className="text-yellow-500" size={24} />
//                 <span className="text-lg text-red-700">Notify us about incorrect solutions or information</span>
//               </div>
//               <div className="flex items-center space-x-4 bg-white bg-opacity-50 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
//                 <Lightbulb className="text-blue-500" size={24} />
//                 <span className="text-lg text-red-700">Suggest improvements or new features</span>
//               </div>
//             </div>
//             <button 
//               onClick={handleReportClick}
//               className="flex items-center justify-center px-8 py-3 bg-red-500 text-white rounded-full font-bold text-lg hover:bg-red-600 transition duration-300 ease-in-out shadow-xl w-full sm:w-auto"
//             >
//               <Send className="mr-2" size={20} />
//               Send Report
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BugReportSection;

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import Lottie from 'lottie-react';
import animationData from './Animation - 1722160135173.json';
import { Bug, AlertTriangle, Lightbulb, Send } from 'lucide-react';

gsap.registerPlugin(TextPlugin);

const BugReportSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const reportItemsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(sectionRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1 }
      );

      gsap.to(textRef.current, {
        duration: 4,
        text: "Your feedback is crucial in making EduHub even better. Help us improve by reporting any issues you encounter!",
        ease: "none",
        delay: 0.5,
      });

      const reportItems = reportItemsRef.current.children;
      gsap.from(reportItems, {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.5,
        delay: 4.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleReportClick = () => {
    const subject = encodeURIComponent('Feedback for EduHub');
    const body = encodeURIComponent('Dear EduHub Team,\n\nI would like to report the following:\n\n[Please describe your feedback, bug, or suggestion here]\n\nIf reporting a bug, please include:\nSteps to reproduce:\n1.\n2.\n3.\n\nExpected behavior:\n\nActual behavior:\n\nAdditional information:\n\nThank you for your attention to this matter.\n\nBest regards,\n[Your Name]');
    const mailtoLink = `mailto:support@eduhub.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-white overflow-hidden py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <Lottie 
              animationData={animationData} 
              className="w-full max-w-md mx-auto"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
              Help Us Improve
            </h2>
            <p ref={textRef} className="text-lg sm:text-xl text-blue-700 mb-8 min-h-[6rem]">
              {/* Text will be animated here */}
            </p>
            <div ref={reportItemsRef} className="space-y-4 mb-8">
              <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                <Bug className="text-blue-500 flex-shrink-0" size={24} />
                <span className="text-base sm:text-lg text-blue-700">Report bugs or errors in the platform</span>
              </div>
              <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                <AlertTriangle className="text-yellow-500 flex-shrink-0" size={24} />
                <span className="text-base sm:text-lg text-blue-700">Notify us about incorrect information</span>
              </div>
              <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                <Lightbulb className="text-green-500 flex-shrink-0" size={24} />
                <span className="text-base sm:text-lg text-blue-700">Suggest improvements or new features</span>
              </div>
            </div>
            <button 
              onClick={handleReportClick}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-full font-bold text-base sm:text-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-xl w-full sm:w-auto"
            >
              <Send className="mr-2" size={20} />
              Send Feedback
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BugReportSection;