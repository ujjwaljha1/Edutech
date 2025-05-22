
import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Web Developer",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    text: "LovelyLearn transformed my career. The courses are top-notch and the community is incredibly supportive!"
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Data Scientist",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    text: "I've taken many online courses, but LovelyLearn stands out. The practical projects really solidified my learning."
  },
  {
    id: 3,
    name: "Carol Davis",
    role: "UX Designer",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    text: "The UX design course was exactly what I needed to transition into tech. Thank you, LovelyLearn!"
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Marketing Specialist",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    text: "LovelyLearn's digital marketing course gave me the skills to excel in my role. Highly recommended!"
  },
];

// Modified TestimonialCard component
const TestimonialCard = ({ name, role, image, text }) => (
  <div className="flex-shrink-0 w-80 mx-4 bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="p-6 h-full flex flex-col"> {/* Added h-full and flex flex-col */}
      <div className="flex items-center mb-4">
        <img className="h-12 w-12 rounded-full object-cover mr-4" src={image} alt={name} />
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
          <p className="text-sm text-red-500">{role}</p>
        </div>
      </div>
      <p className="text-gray-600 text-sm flex-grow"> {/* Added flex-grow */}
        {text}
      </p>
    </div>
  </div>
);

const InfiniteScroll = ({ children, direction = 'left', speed = 20 }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-block"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        <div className="flex">
          {children}
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const TestimonialSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-100 to-red-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl h-21 font-bold text-center mb-12 text-red-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          What Our Students Say
        </motion.h2>
        <div className="mb-8">
          <InfiniteScroll direction="left" speed={30}>
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;