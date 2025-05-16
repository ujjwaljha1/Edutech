

// import React, { useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
// import config from '../../Config'
// import OTPVerification from '../../hooks/OTPVerification';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const [userId, setUserId] = useState(null);

//   // client/src/pages/LoginPage.js

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setIsLoading(true);
    // try {
    //   const response = await axios.post(`${config.backendUrl}/api/auth/login`, { email, password });
    //   if (response.data.success) {
    //     if (response.data.userId) {
    //       setUserId(response.data.userId);
    //     } else {
    //       const token = response.data.token;
    //       localStorage.setItem('token', token);
    //       localStorage.setItem('isAdmin', response.data.user.isAdmin);
    //       localStorage.setItem('isCEO', response.data.user.isCEO);
          
    //       // Set the token as the default Authorization header for future requests
    //       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
    //       window.location.href = '/';
    //     }
    //   }
    // } catch (error) {
    //   console.error(error);
    //   setError('Invalid email or password. Please try again.');
    // } finally {
    //   setIsLoading(false);
    // }
  // };

  // const handleVerificationSuccess = () => {
  //   window.location.href = '/';
  // };

  // if (userId) {
  //   return <OTPVerification userId={userId} onVerificationSuccess={handleVerificationSuccess} />;
  // }
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600">
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white p-8 rounded-lg shadow-2xl w-96"
//       >
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
//         {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
//         <form onSubmit={handleLogin} className="space-y-6">
//           <div>
//             <label className="block text-gray-700 mb-2" htmlFor="email">
//               <FaEnvelope className="inline mr-2" />
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 mb-2" htmlFor="password">
//               <FaLock className="inline mr-2" />
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
//             />
//           </div>
//           <motion.button
//             type="submit"
//             className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300 flex items-center justify-center"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <motion.div
//                 className="w-6 h-6 border-t-2 border-white rounded-full animate-spin"
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//               />
//             ) : (
//               <>
//                 <FaSignInAlt className="mr-2" />
//                 Login
//               </>
//             )}
//           </motion.button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;




import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import config from '../../Config'
import OTPVerification from '../../hooks/OTPVerification';
import axios from 'axios';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    // Simulating API call
    try {
      const response = await axios.post(`${config.backendUrl}/api/auth/login`, { email, password });
      if (response.data.success) {
        if (response.data.userId) {
          setUserId(response.data.userId);
        } else {
          const token = response.data.token;
          localStorage.setItem('token', token);
          localStorage.setItem('isAdmin', response.data.user.isAdmin);
          localStorage.setItem('isCEO', response.data.user.isCEO);
          
          // Set the token as the default Authorization header for future requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          window.location.href = '/';
        }
      }
    } catch (error) {
      console.error(error);
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
    setTimeout(() => {
      setIsLoading(false);
      setError('Invalid email or password. Please try again.');
    }, 2000);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url("https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp")' }}>
      </div>
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-2xl w-96"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                <FaEnvelope className="inline mr-2" />
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="password">
                <FaLock className="inline mr-2" />
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <motion.button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  className="w-6 h-6 border-t-2 border-white rounded-full animate-spin"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  <FaSignInAlt className="mr-2" />
                  Sign In
                </>
              )}
            </motion.button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;