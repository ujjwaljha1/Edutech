
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '../../hooks/useAuth';
import config from '../../Config'
import {
  Bell,
  Search,
  User,
  LogOut,
  Settings,
  Home,
  Briefcase,
  Info,
  Menu,
  X,
  ChevronDown,
  AlertTriangle,
  Calendar,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
    { path: "/", icon: <Home className="w-5 h-5" />, label: "Home" },
    { path: "/careers", icon: <Briefcase className="w-5 h-5" />, label: "Careers" },
    { path: "/about", icon: <Info className="w-5 h-5" />, label: "About" },
    { path: "/events", icon: <Calendar className="w-5 h-5" />, label: "Events" },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  const mobileMenuVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { x: "-100%", transition: { duration: 0.3 } }
  };

  return (
    <nav className="bg-gradient-to-r from-pink-100 to-red-100 p-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center transition-transform duration-300 hover:scale-105">
            <img src="/path-to-your-logo.png" alt="LearnHub Logo" className="w-10 h-10 mr-2" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500">
              knowfinity
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center hover:text-red-600 transition duration-300 ${
                  location.pathname === item.path ? "text-red-600" : "text-red-800"
                }`}
              >
                {item.icon}
                <span className="ml-1">{item.label}</span>
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
                className="rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300 bg-white text-gray-800"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            </form>

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-red-800 hover:text-red-600 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-500 transition duration-300 shadow-md"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <div
                  className="relative"
                  onMouseEnter={() => setShowNotifications(true)}
                  onMouseLeave={() => setShowNotifications(false)}
                  ref={notificationsRef}
                >
                  <motion.button
                    className="text-xl focus:outline-none relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Bell className="w-6 h-6 text-red-800" />
                    {notifications.some((n) => !n.read) && (
                      <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
                    )}
                  </motion.button>
                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-md shadow-lg py-2 max-h-80 overflow-y-auto"
                      >
                        {notifications.length > 0 ? (
                          notifications.map((notification, index) => (
                            <div
                              key={notification._id}
                              className={`px-4 py-2 ${
                                notification.read ? "opacity-50" : ""
                              } ${
                                index > 0 ? "border-t border-gray-300" : ""
                              } hover:bg-gray-100 transition duration-300`}
                            >
                              <h3
                                className="font-semibold"
                                dangerouslySetInnerHTML={{
                                  __html: notification.title,
                                }}
                              />
                              <p
                                className="text-sm"
                                dangerouslySetInnerHTML={{
                                  __html: notification.description,
                                }}
                              />
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-center">
                            No notifications
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div
                  className="relative"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                  ref={dropdownRef}
                >
                  <motion.button
                    className="flex items-center space-x-2 focus:outline-none"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={user?.profilePicture || "https://via.placeholder.com/40"}
                      alt="Profile Avatar"
                      className="w-10 h-10 rounded-full border-2 border-red-600 object-cover"
                    />
                    <span className="text-red-800">{user?.name}</span>
                    <ChevronDown className="w-4 h-4 text-red-800" />
                  </motion.button>
                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-2 overflow-hidden"
                      >
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-100 transition duration-300 flex items-center"
                        >
                          <User className="w-4 h-4 mr-2" /> Profile
                        </Link>
                        {user?.isAdmin && (
                          <Link
                            to="/adminpage"
                            className="block px-4 py-2 hover:bg-gray-100 transition duration-300 flex items-center"
                          >
                            <Settings className="w-4 h-4 mr-2" /> Admin Panel
                          </Link>
                        )}
                        {user?.isCEO && (
                          <Link
                            to="/ceopanel"
                            className="block px-4 py-2 hover:bg-gray-100 transition duration-300 flex items-center"
                          >
                            <AlertTriangle className="w-4 h-4 mr-2" /> CEO Panel
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left block px-4 py-2 hover:bg-gray-100 transition duration-300 flex items-center"
                        >
                          <LogOut className="w-4 h-4 mr-2" /> Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden focus:outline-none"
          >
            {showMobileMenu ? (
              <X className="w-6 h-6 text-red-800" />
            ) : (
              <Menu className="w-6 h-6 text-red-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            className="md:hidden bg-gradient-to-r from-pink-100 to-red-100 shadow-md"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col p-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center hover:text-red-600 transition duration-300 ${
                    location.pathname === item.path ? "text-red-600" : "text-red-800"
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  {item.icon}
                  <span className="ml-1">{item.label}</span>
                </Link>
              ))}
              <form
                onSubmit={handleSearch}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300 w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              </form>
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="text-red-800 hover:text-red-600 transition duration-300"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-500 transition duration-300 shadow-md"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <img
                      src={user?.profilePicture || "https://via.placeholder.com/40"}
                      alt="Profile Avatar"
                      className="w-10 h-10 rounded-full border-2 border-red-600 object-cover"
                    />
                    <span className="text-red-800">{user?.name}</span>
                  </div>
                  <Link
                    to="/profile"
                    className="block py-2 hover:text-red-600 transition duration-300 flex items-center"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <User className="w-4 h-4 mr-2" /> Profile
                  </Link>
                  {user?.isAdmin && (
                    <Link
                      to="/adminpage"
                      className="block py-2 hover:text-red-600 transition duration-300 flex items-center"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <Settings className="w-4 h-4 mr-2" /> Admin Panel
                    </Link>
                  )}
                  {user?.isCEO && (
                    <Link
                      to="/ceopanel"
                      className="block py-2 hover:text-red-600 transition duration-300 flex items-center"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" /> CEO Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowMobileMenu(false);
                    }}
                    className="w-full text-left block py-2 hover:text-red-600 transition duration-300 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    );
  };
  
  export default Navbar;
  