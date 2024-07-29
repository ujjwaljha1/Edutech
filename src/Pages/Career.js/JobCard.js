import React from 'react';
import { motion } from 'framer-motion';

const JobCard = ({ image, title, description }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-xl overflow-hidden"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-red-800 mb-4">{title}</h3>
        <p className="text-red-700 mb-6">{description}</p>
        <motion.button 
          className="w-full px-4 py-2 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition duration-300 ease-in-out"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          No Jobs Available
        </motion.button>
        <p className="text-sm text-red-600 mt-2 text-center">We will be opening opportunities soon!</p>
      </div>
    </motion.div>
  );
};

const BrowseJobs = () => {
  const jobCategories = [
    {
      image: "https://images.unsplash.com/photo-1531496730074-83b638c0a7ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHN0dWRlbnRzfGVufDB8fDB8fHww",
      title: "Students",
      description: "Exciting opportunities for students looking to kickstart their careers in education technology."
    },
    {
      image: "https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHN0dWRlbnRzfGVufDB8fDB8fHww",
      title: "Freshers",
      description: "Start your professional journey with us and be part of innovative educational solutions."
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1661766386981-1140b7b37193?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww",
      title: "Professionals",
      description: "Bring your expertise to shape the future of learning and advance your career."
    }
  ];

  return (
    <section className="relative min-h-screen py-20 bg-gradient-to-br from-pink-100 to-red-100 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2 
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-16 text-red-800"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Browse Jobs
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobCategories.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default BrowseJobs;