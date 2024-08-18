
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { Book, ChevronRight, Lock, Code, Coffee, Atom } from 'lucide-react';
// import config from '../../Config';

// function HomePage() {
//   const [categories, setCategories] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(`${config.backendUrl}/api/categories`);
//         setCategories(response.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//         setIsLoading(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const comingSoonCourses = [
//     { title: "Interview Prep", icon: Book, color: "text-blue-500" },
//     { title: "JavaScript Interview", icon: Code, color: "text-yellow-500" },
//     { title: "Java Interview", icon: Coffee, color: "text-red-500" },
//     { title: "React Job Ready", icon: Atom, color: "text-cyan-500" },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 py-20">
//       <div className="container mx-auto px-4">
        
//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {categories.map((category) => (
//               <Card key={category._id} to={`/${category.slug}`}>
//                 <Book className="w-8 h-8 text-red-600" />
//                 <h2 className="text-2xl font-semibold mb-2 text-gray-800">{category.title}</h2>
//                 <p className="text-gray-600">{category.description}</p>
//                 <ChevronRight className="w-6 h-6 text-gray-600 mt-4" />
//               </Card>
//             ))}
//             {comingSoonCourses.map((course, index) => (
//               <Card key={index} disabled>
//                 <course.icon className={`w-8 h-8 ${course.color}`} />
//                 <h2 className="text-2xl font-semibold mb-2 text-gray-800">{course.title}</h2>
//                 <p className="text-gray-600">Coming Soon</p>
//                 <Lock className="w-6 h-6 text-gray-600 mt-4" />
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// const Card = ({ children, to, disabled }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const cardVariants = {
//     hidden: { y: 50, opacity: 0 },
//     visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
//     hover: { scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' },
//   };

//   const sparkleVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
//   };

//   const sparkleItemVariants = {
//     hidden: { opacity: 0, scale: 0 },
//     visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 10 } },
//   };

//   const Sparkles = () => (
//     <motion.div
//       className="absolute inset-0 pointer-events-none"
//       variants={sparkleVariants}
//       initial="hidden"
//       animate={isHovered ? 'visible' : 'hidden'}
//     >
//       {[...Array(12)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-2 h-2 bg-yellow-300 rounded-full"
//           variants={sparkleItemVariants}
//           style={{
//             top: `${Math.random() * 100}%`,
//             left: `${Math.random() * 100}%`,
//           }}
//         />
//       ))}
//     </motion.div>
//   );

//   const CardContent = (
//     <motion.div
//       className={`relative overflow-hidden rounded-lg p-6 ${
//         disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white cursor-pointer'
//       }`}
//       variants={cardVariants}
//       initial="hidden"
//       animate="visible"
//       whileHover={disabled ? {} : 'hover'}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//     >
//       <Sparkles />
//       <div className="relative z-10">{children}</div>
//     </motion.div>
//   );

//   return to ? <Link to={to}>{CardContent}</Link> : CardContent;
// };

// export default HomePage;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Book, ChevronRight, Lock, Code, Coffee, Atom } from 'lucide-react';
import config from '../../Config';

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/api/categories`);
        setCategories(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const comingSoonCourses = [
    { title: "Interview Prep", icon: Book, color: "text-blue-600" },
    { title: "JavaScript Interview", icon: Code, color: "text-yellow-600" },
    { title: "Java Interview", icon: Coffee, color: "text-red-600" },
    { title: "React Job Ready", icon: Atom, color: "text-cyan-600" },
  ];

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Explore Our Courses</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Card key={category._id} to={`/${category.slug}`}>
                <Book className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">{category.title}</h2>
                <p className="text-gray-600">{category.description}</p>
                <ChevronRight className="w-6 h-6 text-blue-600 mt-4" />
              </Card>
            ))}
            {comingSoonCourses.map((course, index) => (
              <Card key={index} disabled>
                <course.icon className={`w-8 h-8 ${course.color}`} />
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">{course.title}</h2>
                <p className="text-gray-600">Coming Soon</p>
                <Lock className="w-6 h-6 text-gray-600 mt-4" />
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const Card = ({ children, to, disabled }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
    hover: { scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' },
  };

  const sparkleVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const sparkleItemVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 10 } },
  };

  const Sparkles = () => (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      variants={sparkleVariants}
      initial="hidden"
      animate={isHovered ? 'visible' : 'hidden'}
    >
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-200 rounded-full"
          variants={sparkleItemVariants}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </motion.div>
  );

  const CardContent = (
    <motion.div
      className={`relative overflow-hidden rounded-lg p-6 ${
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white cursor-pointer'
      } border border-gray-200 shadow-sm`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={disabled ? {} : 'hover'}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Sparkles />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );

  return to ? <Link to={to}>{CardContent}</Link> : CardContent;
};

export default HomePage;