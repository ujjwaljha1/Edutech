
// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAuth } from '../../hooks/useAuth';
// import config from '../../Config'
// import {
//   Bell,
//   Search,
//   User,
//   LogOut,
//   Settings,
//   Home,
//   Briefcase,
//   Info,
//   Menu,
//   X,
//   ChevronDown,
//   AlertTriangle,
//   Calendar,
// } from "lucide-react";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dropdownRef = useRef(null);
//   const notificationsRef = useRef(null);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get(`${config.backendUrl}/api/announcements`);
//         setNotifications(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target) &&
//         !notificationsRef.current.contains(event.target)
//       ) {
//         setShowDropdown(false);
//         setShowNotifications(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?query=${searchQuery}`);
//       setSearchQuery("");
//     }
//   };

//   const navItems = [
//     { path: "/", icon: <Home className="w-5 h-5" />, label: "Home" },
//     { path: "/careers", icon: <Briefcase className="w-5 h-5" />, label: "Careers" },
//     { path: "/about", icon: <Info className="w-5 h-5" />, label: "About" },
//     { path: "/events", icon: <Calendar className="w-5 h-5" />, label: "Events" },
//   ];

//   const dropdownVariants = {
//     hidden: { opacity: 0, y: -10 },
//     visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
//     exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
//   };

//   const mobileMenuVariants = {
//     hidden: { x: "-100%" },
//     visible: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
//     exit: { x: "-100%", transition: { duration: 0.3 } }
//   };

//   return (
//     <nav className="bg-gradient-to-r from-pink-100 to-red-100 p-4 sticky top-0 z-50 shadow-lg">
//       <div className="container mx-auto">
//         <div className="flex justify-between items-center">
//           <Link to="/" className="text-2xl font-bold flex items-center transition-transform duration-300 hover:scale-105">
//             <img src="/path-to-your-logo.png" alt="LearnHub Logo" className="w-10 h-10 mr-2" />
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500">
//               knowfinity
//             </span>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-6">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`flex items-center hover:text-red-600 transition duration-300 ${
//                   location.pathname === item.path ? "text-red-600" : "text-red-800"
//                 }`}
//               >
//                 {item.icon}
//                 <span className="ml-1">{item.label}</span>
//               </Link>
//             ))}
//           </div>

//           <div className="hidden md:flex items-center space-x-4">
//             <form onSubmit={handleSearch} className="relative">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300 bg-white text-gray-800"
//               />
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//             </form>

//             {!user ? (
//               <>
//                 <Link
//                   to="/login"
//                   className="text-red-800 hover:text-red-600 transition duration-300"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-500 transition duration-300 shadow-md"
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             ) : (
//               <div className="flex items-center space-x-4">
//                 <div
//                   className="relative"
//                   onMouseEnter={() => setShowNotifications(true)}
//                   onMouseLeave={() => setShowNotifications(false)}
//                   ref={notificationsRef}
//                 >
//                   <motion.button
//                     className="text-xl focus:outline-none relative"
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <Bell className="w-6 h-6 text-red-800" />
//                     {notifications.some((n) => !n.read) && (
//                       <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
//                     )}
//                   </motion.button>
//                   <AnimatePresence>
//                     {showNotifications && (
//                       <motion.div
//                         variants={dropdownVariants}
//                         initial="hidden"
//                         animate="visible"
//                         exit="exit"
//                         className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-md shadow-lg py-2 max-h-80 overflow-y-auto"
//                       >
//                         {notifications.length > 0 ? (
//                           notifications.map((notification, index) => (
//                             <div
//                               key={notification._id}
//                               className={`px-4 py-2 ${
//                                 notification.read ? "opacity-50" : ""
//                               } ${
//                                 index > 0 ? "border-t border-gray-300" : ""
//                               } hover:bg-gray-100 transition duration-300`}
//                             >
//                               <h3
//                                 className="font-semibold"
//                                 dangerouslySetInnerHTML={{
//                                   __html: notification.title,
//                                 }}
//                               />
//                               <p
//                                 className="text-sm"
//                                 dangerouslySetInnerHTML={{
//                                   __html: notification.description,
//                                 }}
//                               />
//                             </div>
//                           ))
//                         ) : (
//                           <div className="px-4 py-2 text-center">
//                             No notifications
//                           </div>
//                         )}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//                 <div
//                   className="relative"
//                   onMouseEnter={() => setShowDropdown(true)}
//                   onMouseLeave={() => setShowDropdown(false)}
//                   ref={dropdownRef}
//                 >
//                   <motion.button
//                     className="flex items-center space-x-2 focus:outline-none"
//                     whileHover={{ scale: 1.05 }}
//                   >
//                     <img
//                       src={user?.profilePicture || "https://via.placeholder.com/40"}
//                       alt="Profile Avatar"
//                       className="w-10 h-10 rounded-full border-2 border-red-600 object-cover"
//                     />
//                     <span className="text-red-800">{user?.name}</span>
//                     <ChevronDown className="w-4 h-4 text-red-800" />
//                   </motion.button>
//                   <AnimatePresence>
//                     {showDropdown && (
//                       <motion.div
//                         variants={dropdownVariants}
//                         initial="hidden"
//                         animate="visible"
//                         exit="exit"
//                         className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-2 overflow-hidden"
//                       >
//                         <Link
//                           to="/profile"
//                           className="block px-4 py-2 hover:bg-gray-100 transition duration-300 flex items-center"
//                         >
//                           <User className="w-4 h-4 mr-2" /> Profile
//                         </Link>
//                         {user?.isAdmin && (
//                           <Link
//                             to="/adminpage"
//                             className="block px-4 py-2 hover:bg-gray-100 transition duration-300 flex items-center"
//                           >
//                             <Settings className="w-4 h-4 mr-2" /> Admin Panel
//                           </Link>
//                         )}
//                         {user?.isCEO && (
//                           <Link
//                             to="/ceopanel"
//                             className="block px-4 py-2 hover:bg-gray-100 transition duration-300 flex items-center"
//                           >
//                             <AlertTriangle className="w-4 h-4 mr-2" /> CEO Panel
//                           </Link>
//                         )}
//                         <button
//                           onClick={handleLogout}
//                           className="w-full text-left block px-4 py-2 hover:bg-gray-100 transition duration-300 flex items-center"
//                         >
//                           <LogOut className="w-4 h-4 mr-2" /> Logout
//                         </button>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setShowMobileMenu(!showMobileMenu)}
//             className="md:hidden focus:outline-none"
//           >
//             {showMobileMenu ? (
//               <X className="w-6 h-6 text-red-800" />
//             ) : (
//               <Menu className="w-6 h-6 text-red-800" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {showMobileMenu && (
//           <motion.div
//             className="md:hidden bg-gradient-to-r from-pink-100 to-red-100 shadow-md"
//             variants={mobileMenuVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             <div className="flex flex-col p-4 space-y-4">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className={`flex items-center hover:text-red-600 transition duration-300 ${
//                     location.pathname === item.path ? "text-red-600" : "text-red-800"
//                   }`}
//                   onClick={() => setShowMobileMenu(false)}
//                 >
//                   {item.icon}
//                   <span className="ml-1">{item.label}</span>
//                 </Link>
//               ))}
//               <form
//                 onSubmit={handleSearch}
//                 className="relative flex items-center"
//               >
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="bg-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300 w-full"
//                 />
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
//               </form>
//               {!user ? (
//                 <>
//                   <Link
//                     to="/login"
//                     className="text-red-800 hover:text-red-600 transition duration-300"
//                     onClick={() => setShowMobileMenu(false)}
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/signup"
//                     className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-500 transition duration-300 shadow-md"
//                     onClick={() => setShowMobileMenu(false)}
//                   >
//                     Sign Up
//                   </Link>
//                 </>
//               ) : (
//                 <div className="flex flex-col space-y-2">
//                   <div className="flex items-center space-x-2">
//                     <img
//                       src={user?.profilePicture || "https://via.placeholder.com/40"}
//                       alt="Profile Avatar"
//                       className="w-10 h-10 rounded-full border-2 border-red-600 object-cover"
//                     />
//                     <span className="text-red-800">{user?.name}</span>
//                   </div>
//                   <Link
//                     to="/profile"
//                     className="block py-2 hover:text-red-600 transition duration-300 flex items-center"
//                     onClick={() => setShowMobileMenu(false)}
//                   >
//                     <User className="w-4 h-4 mr-2" /> Profile
//                   </Link>
//                   {user?.isAdmin && (
//                     <Link
//                       to="/adminpage"
//                       className="block py-2 hover:text-red-600 transition duration-300 flex items-center"
//                       onClick={() => setShowMobileMenu(false)}
//                     >
//                       <Settings className="w-4 h-4 mr-2" /> Admin Panel
//                     </Link>
//                   )}
//                   {user?.isCEO && (
//                     <Link
//                       to="/ceopanel"
//                       className="block py-2 hover:text-red-600 transition duration-300 flex items-center"
//                       onClick={() => setShowMobileMenu(false)}
//                     >
//                       <AlertTriangle className="w-4 h-4 mr-2" /> CEO Panel
//                     </Link>
//                   )}
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setShowMobileMenu(false);
//                     }}
//                     className="w-full text-left block py-2 hover:text-red-600 transition duration-300 flex items-center"
//                     >
//                       <LogOut className="w-4 h-4 mr-2" /> Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </nav>
//     );
//   };
  
//   export default Navbar;
  

// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAuth } from '../../hooks/useAuth';
// import config from '../../Config'
// import {
//   Bell,
//   Search,
//   User,
//   LogOut,
//   Settings,
//   Home,
//   BookOpen,
//   Info,
//   Menu,
//   X,
//   ChevronDown,
//   Shield,
//   Calendar,
// } from "lucide-react";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dropdownRef = useRef(null);
//   const notificationsRef = useRef(null);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get(`${config.backendUrl}/api/announcements`);
//         setNotifications(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target) &&
//         !notificationsRef.current.contains(event.target)
//       ) {
//         setShowDropdown(false);
//         setShowNotifications(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?query=${searchQuery}`);
//       setSearchQuery("");
//     }
//   };

//   const navItems = [
//     { path: "/", icon: <Home className="w-5 h-5" />, label: "Home" },
//     { path: "/courses", icon: <BookOpen className="w-5 h-5" />, label: "Courses" },
//     { path: "/about", icon: <Info className="w-5 h-5" />, label: "About" },
//     { path: "/events", icon: <Calendar className="w-5 h-5" />, label: "Events" },
//   ];

//   const dropdownVariants = {
//     hidden: { opacity: 0, y: -10 },
//     visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
//     exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
//   };

//   const mobileMenuVariants = {
//     hidden: { x: "-100%" },
//     visible: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
//     exit: { x: "-100%", transition: { duration: 0.3 } }
//   };

//   return (
//     <nav className="bg-white p-4 sticky top-0 z-50 shadow-md">
//       <div className="container mx-auto">
//         <div className="flex justify-between items-center">
//           <Link to="/" className="text-2xl font-bold flex items-center transition-transform duration-300 hover:scale-105">
//             <img src="/path-to-your-logo.png" alt="EduHub Logo" className="w-10 h-10 mr-2" />
//             <span className="text-blue-600">
//               EduHub
//             </span>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden lg:flex items-center space-x-6">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`flex items-center hover:text-blue-600 transition duration-300 ${
//                   location.pathname === item.path ? "text-blue-600" : "text-gray-700"
//                 }`}
//               >
//                 {item.icon}
//                 <span className="ml-1">{item.label}</span>
//               </Link>
//             ))}
//           </div>

//           <div className="hidden lg:flex items-center space-x-4">
//             <form onSubmit={handleSearch} className="relative">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 bg-gray-100 text-gray-800"
//               />
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//             </form>

//             {!user ? (
//               <>
//                 <Link
//                   to="/login"
//                   className="text-blue-600 hover:text-blue-700 transition duration-300"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 shadow-md"
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             ) : (
//               <div className="flex items-center space-x-4">
//                 <div
//                   className="relative"
//                   onMouseEnter={() => setShowNotifications(true)}
//                   onMouseLeave={() => setShowNotifications(false)}
//                   ref={notificationsRef}
//                 >
//                   <motion.button
//                     className="text-xl focus:outline-none relative"
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <Bell className="w-6 h-6 text-gray-700" />
//                     {notifications.some((n) => !n.read) && (
//                       <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
//                     )}
//                   </motion.button>
//                   <AnimatePresence>
//                     {showNotifications && (
//                       <motion.div
//                         variants={dropdownVariants}
//                         initial="hidden"
//                         animate="visible"
//                         exit="exit"
//                         className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-md shadow-lg py-2 max-h-80 overflow-y-auto"
//                       >
//                         {notifications.length > 0 ? (
//                           notifications.map((notification, index) => (
//                             <div
//                               key={notification._id}
//                               className={`px-4 py-2 ${
//                                 notification.read ? "opacity-50" : ""
//                               } ${
//                                 index > 0 ? "border-t border-gray-200" : ""
//                               } hover:bg-gray-100 transition duration-300`}
//                             >
//                               <h3
//                                 className="font-semibold"
//                                 dangerouslySetInnerHTML={{
//                                   __html: notification.title,
//                                 }}
//                               />
//                               <p
//                                 className="text-sm"
//                                 dangerouslySetInnerHTML={{
//                                   __html: notification.description,
//                                 }}
//                               />
//                             </div>
//                           ))
//                         ) : (
//                           <div className="px-4 py-2 text-center">
//                             No notifications
//                           </div>
//                         )}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//                 <div
//                   className="relative"
//                   onMouseEnter={() => setShowDropdown(true)}
//                   onMouseLeave={() => setShowDropdown(false)}
//                   ref={dropdownRef}
//                 >
//                   <motion.button
//                     className="flex items-center space-x-2 focus:outline-none"
//                     whileHover={{ scale: 1.05 }}
//                   >
//                     <img
//                       src={user?.profilePicture || "https://via.placeholder.com/40"}
//                       alt="Profile Avatar"
//                       className="w-10 h-10 rounded-full border-2 border-blue-600 object-cover"
//                     />
//                     <span className="text-gray-700">{user?.name}</span>
//                     <ChevronDown className="w-4 h-4 text-gray-700" />
//                   </motion.button>
//                   <AnimatePresence>
//                     {showDropdown && (
//                       <motion.div
//                         variants={dropdownVariants}
//                         initial="hidden"
//                         animate="visible"
//                         exit="exit"
//                         className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-2 overflow-hidden"
//                       >
//                         <Link
//                           to="/profile"
//                           className="block px-4 py-2 hover:bg-gray-100 transition duration-300 flex items-center"
//                         >
//                           <User className="w-4 h-4 mr-2" /> Profile
//                         </Link>
//                         {user?.isAdmin && (
//                           <Link
//                             to="/adminpage"
//                             className="block px-4 py-2 hover:bg-gray-100 transition duration-300 flex items-center"
//                           >
//                             <Settings className="w-4 h-4 mr-2" /> Admin Panel
//                           </Link>
//                         )}
//                         {user?.isCEO && (
//                           <Link
//                             to="/ceopanel"
//                             className="block px-4 py-2 hover:bg-gray-100 transition duration-300 flex items-center"
//                           >
//                             <Shield className="w-4 h-4 mr-2" /> CEO Panel
//                           </Link>
//                         )}
//                         <button
//                           onClick={handleLogout}
//                           className="w-full text-left block px-4 py-2 hover:bg-gray-100 transition duration-300 flex items-center"
//                         >
//                           <LogOut className="w-4 h-4 mr-2" /> Logout
//                         </button>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setShowMobileMenu(!showMobileMenu)}
//             className="lg:hidden focus:outline-none"
//           >
//             {showMobileMenu ? (
//               <X className="w-6 h-6 text-gray-700" />
//             ) : (
//               <Menu className="w-6 h-6 text-gray-700" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {showMobileMenu && (
//           <motion.div
//             className="lg:hidden bg-white shadow-md"
//             variants={mobileMenuVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             <div className="flex flex-col p-4 space-y-4">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className={`flex items-center hover:text-blue-600 transition duration-300 ${
//                     location.pathname === item.path ? "text-blue-600" : "text-gray-700"
//                   }`}
//                   onClick={() => setShowMobileMenu(false)}
//                 >
//                   {item.icon}
//                   <span className="ml-1">{item.label}</span>
//                 </Link>
//               ))}
//               <form
//                 onSubmit={handleSearch}
//                 className="relative flex items-center"
//               >
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 w-full"
//                 />
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
//               </form>
//               {!user ? (
//                 <>
//                   <Link
//                     to="/login"
//                     className="text-blue-600 hover:text-blue-700 transition duration-300"
//                     onClick={() => setShowMobileMenu(false)}
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/signup"
//                     className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 shadow-md"
//                     onClick={() => setShowMobileMenu(false)}
//                   >
//                     Sign Up
//                   </Link>
//                 </>
//               ) : (
//                 <div className="flex flex-col space-y-2">
//                   <div className="flex items-center space-x-2">
//                     <img
//                       src={user?.profilePicture || "https://via.placeholder.com/40"}
//                       alt="Profile Avatar"
//                       className="w-10 h-10 rounded-full border-2 border-blue-600 object-cover"
//                     />
//                     <span className="text-gray-700">{user?.name}</span>
//                   </div>
//                   <Link
//                     to="/profile"
//                     className="block py-2 hover:text-blue-600 transition duration-300 flex items-center"
//                     onClick={() => setShowMobileMenu(false)}
//                   >
//                     <User className="w-4 h-4 mr-2" /> Profile
//                   </Link>
//                   {user?.isAdmin && (
//                     <Link
//                       to="/adminpage"
//                       className="block py-2 hover:text-blue-600 transition duration-300 flex items-center"
//                       onClick={() => setShowMobileMenu(false)}
//                     >
//                       <Settings className="w-4 h-4 mr-2" /> Admin Panel
//                     </Link>
//                   )}
//                   {user?.isCEO && (
//                     <Link
//                       to="/ceopanel"
//                       className="block py-2 hover:text-blue-600 transition duration-300 flex items-center"
//                       onClick={() => setShowMobileMenu(false)}
//                     >
//                       <Shield className="w-4 h-4 mr-2" /> CEO Panel
//                     </Link>
//                   )}
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setShowMobileMenu(false);
//                     }}
//                     className="w-full text-left block py-2 hover:text-blue-600 transition duration-300 flex items-center"
//                   >
//                    <LogOut className="w-4 h-4 mr-2" /> Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from '../../hooks/useAuth';
// import config from '../../Config'
// import {
//   Bell,
//   Search,
//   User,
//   LogOut,
//   Settings,
//   Menu,
//   X,
//   ChevronDown,
//   Shield,
// } from "lucide-react";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get(`${config.backendUrl}/api/announcements`);
//         setNotifications(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?query=${searchQuery}`);
//       setSearchQuery("");
//     }
//   };

//   const navItems = [
//     { path: "/", label: "Home" },
//     { path: "/courses", label: "Courses" },
//     { path: "/about", label: "About" },
//   ];

//   return (
//     <nav className="bg-white shadow-sm">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           <Link to="/" className="text-xl font-semibold text-blue-600">
//             EduHub
//           </Link>

//           <div className="hidden md:flex items-center space-x-4">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`text-sm ${
//                   location.pathname === item.path ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
//                 }`}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </div>

//           <div className="hidden md:flex items-center space-x-4">
//             <form onSubmit={handleSearch} className="relative">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="rounded-full py-1 px-3 pl-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 bg-gray-100"
//               />
//               <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//             </form>

//             {!user ? (
//               <>
//                 <Link to="/login" className="text-sm text-gray-700 hover:text-blue-600">
//                   Login
//                 </Link>
//                 <Link to="/signup" className="text-sm bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700">
//                   Sign Up
//                 </Link>
//               </>
//             ) : (
//               <div className="relative">
//                 <button
//                   onClick={() => setShowDropdown(!showDropdown)}
//                   className="flex items-center space-x-1 text-sm focus:outline-none"
//                 >
//                   <img
//                     src={user?.profilePicture || "https://via.placeholder.com/32"}
//                     alt="Profile"
//                     className="w-8 h-8 rounded-full object-cover"
//                   />
//                   <ChevronDown className="w-4 h-4 text-gray-700" />
//                 </button>
//                 {showDropdown && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
//                     <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                       Profile
//                     </Link>
//                     {user?.isAdmin && (
//                       <Link to="/adminpage" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                         Admin Panel
//                       </Link>
//                     )}
//                     {user?.isCEO && (
//                       <Link to="/ceopanel" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                         CEO Panel
//                       </Link>
//                     )}
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           <button
//             onClick={() => setShowMobileMenu(!showMobileMenu)}
//             className="md:hidden focus:outline-none"
//           >
//             {showMobileMenu ? (
//               <X className="w-6 h-6 text-gray-700" />
//             ) : (
//               <Menu className="w-6 h-6 text-gray-700" />
//             )}
//           </button>
//         </div>
//       </div>

//       {showMobileMenu && (
//         <div className="md:hidden bg-white border-t border-gray-200 py-2">
//           <div className="container mx-auto px-4 space-y-2">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`block text-sm ${
//                   location.pathname === item.path ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
//                 }`}
//                 onClick={() => setShowMobileMenu(false)}
//               >
//                 {item.label}
//               </Link>
//             ))}
//             {!user ? (
//               <>
//                 <Link to="/login" className="block text-sm text-gray-700 hover:text-blue-600">
//                   Login
//                 </Link>
//                 <Link to="/signup" className="block text-sm text-blue-600 hover:underline">
//                   Sign Up
//                 </Link>
//               </>
//             ) : (
//               <>
//                 <Link to="/profile" className="block text-sm text-gray-700 hover:text-blue-600">
//                   Profile
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="block w-full text-left text-sm text-gray-700 hover:text-blue-600"
//                 >
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../../hooks/useAuth';
import config from '../../Config'
import {
  Bell,
  Search,
  User,
  LogOut,
  Settings,
  Menu,
  X,
  ChevronDown,
  Shield,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/api/announcements`);
        setNotifications(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
      setSearchQuery("");
    }
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/courses", label: "Courses" },
    { path: "/about", label: "About" },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            EduHub
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium ${
                  location.pathname === item.path ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-full py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-100"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            </form>

            {!user ? (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link to="/signup" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-sm focus:outline-none"
                >
                  <img
                    src={user?.profilePicture || "https://via.placeholder.com/32"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-700">{user.name}</span>
                  <ChevronDown className="w-4 h-4 text-gray-700" />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    {user?.isAdmin && (
                      <Link to="/adminpage" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Admin Panel
                      </Link>
                    )}
                    {user?.isCEO && (
                      <Link to="/ceopanel" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        CEO Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden focus:outline-none"
          >
            {showMobileMenu ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {showMobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4">
          <div className="container mx-auto px-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block text-sm font-medium ${
                  location.pathname === item.path ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                {item.label}
              </Link>
            ))}
            {!user ? (
              <>
                <Link to="/login" className="block text-sm font-medium text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link to="/signup" className="block text-sm font-medium text-blue-600 hover:underline">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="block text-sm font-medium text-gray-700 hover:text-blue-600">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from '../../hooks/useAuth';
// import config from '../../Config'
// import {
//   Bell,
//   Search,
//   User,
//   LogOut,
//   Settings,
//   Menu,
//   X,
//   ChevronDown,
//   Shield,
// } from "lucide-react";
// import { Dialog, Transition } from '@headlessui/react'
// import { Fragment } from 'react'
// import Signup from "../../AdminPanel/SignUpPage";
// import Login from "../../AdminPanel/LoginPage"
// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isSignupOpen, setIsSignupOpen] = useState(false);
//   const [isLoginOpen, setIsLoginOpen] = useState(false);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get(`${config.backendUrl}/api/announcements`);
//         setNotifications(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?query=${searchQuery}`);
//       setSearchQuery("");
//     }
//   };

//   const navItems = [
//     { path: "/", label: "Home" },
//     { path: "/courses", label: "Courses" },
//     { path: "/about", label: "About" },
//   ];

//   const openSignupDialog = () => {
//     setIsSignupOpen(true);
//   };

//   const closeSignupDialog = () => {
//     setIsSignupOpen(false);
//   };

//   const openLoginDialog = () => {
//     setIsLoginOpen(true);
//   };

//   const closeLoginDialog = () => {
//     setIsLoginOpen(false);
//   };

//   return (
//     <nav className="bg-white shadow-md">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           <a href="/" className="text-2xl font-bold text-blue-600">
//             EduHub
//           </a>

//           <div className="hidden md:flex items-center space-x-6">
//             {navItems.map((item) => (
//               <a
//                 key={item.path}
//                 href={item.path}
//                 className={`text-sm font-medium ${
//                   location.pathname === item.path ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
//                 }`}
//               >
//                 {item.label}
//               </a>
//             ))}
//           </div>

//           <div className="hidden md:flex items-center space-x-4">
//             <form onSubmit={handleSearch} className="relative">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="rounded-full py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-100"
//               />
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//             </form>

//             {!user ? (
//               <>
//                 <button onClick={openLoginDialog} className="text-sm font-medium text-gray-700 hover:text-blue-600">
//                   Login
//                 </button>
//                 <button onClick={openSignupDialog} className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
//                   Sign Up
//                 </button>
//               </>
//             ) : (
//               <div className="relative">
//                 <button
//                   onClick={() => setShowDropdown(!showDropdown)}
//                   className="flex items-center space-x-2 text-sm focus:outline-none"
//                 >
//                   <img
//                     src={user?.profilePicture || "https://via.placeholder.com/32"}
//                     alt="Profile"
//                     className="w-8 h-8 rounded-full object-cover"
//                   />
//                   <span className="font-medium text-gray-700">{user.name}</span>
//                   <ChevronDown className="w-4 h-4 text-gray-700" />
//                 </button>
//                 {showDropdown && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
//                     <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                       Profile
//                     </a>
//                     {user?.isAdmin && (
//                       <a href="/adminpage" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                         Admin Panel
//                       </a>
//                     )}
//                     {user?.isCEO && (
//                       <a href="/ceopanel" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                         CEO Panel
//                       </a>
//                     )}
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           <button
//             onClick={() => setShowMobileMenu(!showMobileMenu)}
//             className="md:hidden focus:outline-none"
//           >
//             {showMobileMenu ? (
//               <X className="w-6 h-6 text-gray-700" />
//             ) : (
//               <Menu className="w-6 h-6 text-gray-700" />
//             )}
//           </button>
//         </div>
//       </div>

//       {showMobileMenu && (
//         <div className="md:hidden bg-white border-t border-gray-200 py-4">
//           <div className="container mx-auto px-4 space-y-4">
//             {navItems.map((item) => (
//               <a
//                 key={item.path}
//                 href={item.path}
//                 className={`block text-sm font-medium ${
//                   location.pathname === item.path ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
//                 }`}
//                 onClick={() => setShowMobileMenu(false)}
//               >
//                 {item.label}
//               </a>
//             ))}
//             {!user ? (
//               <>
//                 <button onClick={openLoginDialog} className="block text-sm font-medium text-gray-700 hover:text-blue-600">
//                   Login
//                 </button>
//                 <button onClick={openSignupDialog} className="block text-sm font-medium text-blue-600 hover:underline">
//                   Sign Up
//                 </button>
//               </>
//             ) : (
//               <>
//                 <a href="/profile" className="block text-sm font-medium text-gray-700 hover:text-blue-600">
//                   Profile
//                 </a>
//                 <button
//                   onClick={handleLogout}
//                   className="block w-full text-left text-sm font-medium text-gray-700 hover:text-blue-600"
//                 >
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       <Transition appear show={isSignupOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeSignupDialog}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                   <Dialog.Title
//                     as="h3"
//                     className="text-lg font-medium leading-6 text-gray-900"
//                   >
//                     Sign Up
//                   </Dialog.Title>
//                   <div className="mt-2">
//                     <Signup onClose={closeSignupDialog} />
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>

//       <Transition appear show={isLoginOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeLoginDialog}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                   <Dialog.Title
//                     as="h3"
//                     className="text-lg font-medium leading-6 text-gray-900"
//                   >
//                     Login
//                   </Dialog.Title>
//                   <div className="mt-2">
//                     <Login onClose={closeLoginDialog} />
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </nav>
//   );
// };

// export default Navbar;