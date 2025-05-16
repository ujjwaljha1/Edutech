import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lottie from 'react-lottie';
import animationData from './Animation - 1722190040736.json';
import { FaLinkedin } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const lottieRef = useRef(null);

  const teamMembers = [
    {
      name: 'John Doe',
      aim: 'Empowering learners through technology',
      email: 'john@example.com',
      linkedin: 'https://linkedin.com/in/johndoe',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      name: 'Jane Smith',
      aim: 'Creating innovative learning experiences',
      email: 'jane@example.com',
      linkedin: 'https://linkedin.com/in/janesmith',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    // Add more team members as needed
  ];

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

      gsap.from(contentRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(lottieRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        delay: 1,
        scrollTrigger: {
          trigger: lottieRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <section ref={sectionRef} className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-red-800 mb-12">
          About Us
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div ref={contentRef} className="lg:w-1/2 mb-12 lg:mb-0">
            <p className="text-xl text-red-700 mb-6">
              At LovelyLearn, we're passionate about providing advanced learning resources for professionals and students. Our mission is to empower learners with cutting-edge knowledge and skills to excel in their careers and studies.
            </p>
            <p className="text-xl text-red-700">
              With a team of expert educators and industry professionals, we create comprehensive courses that blend theoretical knowledge with practical applications, ensuring our learners are well-prepared for the challenges of the modern world.
            </p>
          </div>
          <div ref={lottieRef} className="lg:w-1/2">
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        </div>

        <h3 className="text-3xl font-bold text-center text-red-800 mt-20 mb-12">Our Team</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-xl p-6 transform transition duration-300 hover:scale-105"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-red-500"
              />
              <h4 className="text-xl font-bold text-red-800 text-center mb-2">{member.name}</h4>
              <p className="text-red-700 text-center mb-2">{member.aim}</p>
              <p className="text-red-600 text-center mb-4">{member.email}</p>
              <div className="flex justify-center">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-red-500 hover:text-red-600 transition duration-300"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
