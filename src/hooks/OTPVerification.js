// import React, { useState } from 'react';
// import axios from 'axios';

// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'; // Use ExclamationTriangleIcon instead of ExclamationTriangleIcon

// import config from '../Config'
// const OTPVerification = ({ userId, onVerificationSuccess }) => {
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   // const handleVerify = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   setError('');
//   //   try {
//   //     const response = await axios.post(`${config.backendUrl}/api/auth/verify-otp`, { userId, otp });
//   //     if (response.data.success) {
//   //       localStorage.setItem('token', response.data.token);
//   //       localStorage.setItem('isAdmin', response.data.user.isAdmin);
//   //       onVerificationSuccess();
//   //     } else {
//   //       setError('Invalid OTP. Please try again.');
//   //     }
//   //   } catch (error) {
//   //     setError('Invalid OTP. Please try again.');
//   //   }
//   //   setLoading(false);
//   // };
//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     try {
//       console.log('Sending OTP verification request:', { userId, otp });
//       const response = await axios.post(`${config.backendUrl}/api/auth/verify-otp`, { userId, otp });
//       console.log('OTP verification response:', response.data);
//       if (response.data.success) {
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('isAdmin', response.data.user.isAdmin);
//         onVerificationSuccess();
//       } else {
//         setError('Invalid OTP. Please try again.');
//       }
//     } catch (error) {
//       console.error('OTP verification error:', error.response?.data || error.message);
//       setError('Invalid OTP. Please try again.');
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Verify Your Account</h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Enter the OTP sent to your email to verify your account.
//           </p>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleVerify}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="otp" className="sr-only">OTP</label>
//               <input
//                 id="otp"
//                 name="otp"
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 placeholder="Enter OTP"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//               />
//             </div>
//           </div>
//           {error && (
//             <div className="flex items-center justify-center text-red-500 text-sm">
//               <ExclamationTriangleIcon className="h-5 w-5 mr-1" aria-hidden="true" />
//               {error}
//             </div>
//           )}
//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-gray-600' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
//             >
//               {loading ? 'Verifying...' : 'Verify OTP'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default OTPVerification;

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import config from '../Config';

const OTPVerification = ({ userId, onVerificationSuccess }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    }
  };

  // Update the handleVerify function
const handleVerify = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  const otpString = otp.join('');
  try {
    console.log('Sending OTP verification request:', { userId, otp: otpString });
    const response = await axios.post(`${config.backendUrl}/api/auth/verify-otp`, { userId, otp: otpString });
    console.log('OTP verification response:', response.data);
    if (response.data.success) {
      onVerificationSuccess(response.data.token);
    } else {
      setError('Invalid OTP. Please try again.');
    }
  } catch (error) {
    console.error('OTP verification error:', error.response?.data || error.message);
    setError(error.response?.data?.error || 'An error occurred during OTP verification. Please try again.');
  }
  setLoading(false);
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Verify Your Account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the 6-digit OTP sent to your email.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleVerify}>
          <div className="flex justify-center space-x-2">
            {otp.map((data, index) => {
              return (
                <input
                  key={index}
                  type="text"
                  ref={el => inputRefs.current[index] = el}
                  name="otp"
                  maxLength="1"
                  value={data}
                  onChange={e => handleChange(e.target, index)}
                  onKeyDown={e => handleBackspace(e, index)}
                  onFocus={e => e.target.select()}
                  className="w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl border-gray-400 focus:border-blue-500 focus:shadow-outline"
                />
              );
            })}
          </div>
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center text-red-500 text-sm"
            >
              <ExclamationTriangleIcon className="h-5 w-5 mr-1" aria-hidden="true" />
              {error}
            </motion.div>
          )}
          <div>
            <motion.button
              type="submit"
              disabled={loading || otp.some(digit => digit === '')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading || otp.some(digit => digit === '') 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              {loading ? (
                <motion.div
                  className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                'Verify OTP'
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default OTPVerification;