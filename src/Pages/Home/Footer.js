// import React from 'react';
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// const Footer = () => {
//   const socialIcons = [
//     { icon: FaFacebook, link: 'https://facebook.com' },
//     { icon: FaTwitter, link: 'https://twitter.com' },
//     { icon: FaInstagram, link: 'https://instagram.com' },
//     { icon: FaLinkedin, link: 'https://linkedin.com' },
//   ];

//   return (
//     <footer className="bg-gradient-to-br from-pink-100 to-red-100 text-red-800 py-12">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           <div>
//             <h3 className="text-2xl font-bold mb-4">Careers</h3>
//             <ul>
//               <li><a href="#" className="hover:text-red-600 transition-colors duration-300">Job Openings</a></li>
//               <li><a href="#" className="hover:text-red-600 transition-colors duration-300">Internships</a></li>
//               <li><a href="#" className="hover:text-red-600 transition-colors duration-300">Why Join Us</a></li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-2xl font-bold mb-4">Jobs</h3>
//             <ul>
//               <li><a href="#" className="hover:text-red-600 transition-colors duration-300">Full-time Positions</a></li>
//               <li><a href="#" className="hover:text-red-600 transition-colors duration-300">Part-time Opportunities</a></li>
//               <li><a href="#" className="hover:text-red-600 transition-colors duration-300">Remote Work</a></li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-2xl font-bold mb-4">Popular Courses</h3>
//             <ul>
//               <li><a href="#" className="hover:text-red-600 transition-colors duration-300">Web Development</a></li>
//               <li><a href="#" className="hover:text-red-600 transition-colors duration-300">Data Science</a></li>
//               <li><a href="#" className="hover:text-red-600 transition-colors duration-300">Digital Marketing</a></li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
//             <p>123 Learning Street, Education City, 12345</p>
//             <div className="mt-4">
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.8302682623216!2d-73.98633448508246!3d40.74844397932757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1659123456789!5m2!1sen!2sus"
//                 width="100%"
//                 height="150"
//                 style={{ border: 0 }}
//                 allowFullScreen=""
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//               ></iframe>
//             </div>
//           </div>
//         </div>
//         <div className="mt-12 flex justify-center">
//           {socialIcons.map((item, index) => (
//             <motion.a
//               key={index}
//               href={item.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="mx-2 text-red-800 hover:text-red-600"
//               whileHover={{ y: -5, scale: 1.1 }}
//               transition={{ type: "spring", stiffness: 400, damping: 10 }}
//             >
//               <item.icon size={24} />
//             </motion.a>
//           ))}
//         </div>
//         <div className="mt-8 text-center text-sm">
//           <p>&copy; 2024 LovelyLearn. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialIcons = [
    { icon: FaFacebook, link: 'https://facebook.com' },
    { icon: FaTwitter, link: 'https://twitter.com' },
    { icon: FaInstagram, link: 'https://instagram.com' },
    { icon: FaLinkedin, link: 'https://linkedin.com' },
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-50 to-white text-blue-800 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Careers</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-300">Job Openings</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-300">Internships</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-300">Why Join Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Opportunities</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-300">Full-time Positions</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-300">Part-time Roles</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-300">Remote Work</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Popular Courses</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-300">Web Development</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-300">Data Science</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-300">Digital Marketing</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="mb-2">123 Learning Street, Education City, 12345</p>
            <p className="mb-4">support@eduhub.com</p>
            <div className="w-full h-40 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.8302682623216!2d-73.98633448508246!3d40.74844397932757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1659123456789!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          {socialIcons.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 text-blue-800 hover:text-blue-600"
              whileHover={{ y: -5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <item.icon size={24} />
            </motion.a>
          ))}
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2024 EduHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;