
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaGraduationCap, FaBriefcase } from "react-icons/fa";
import OTPVerification from "../hooks/OTPVerification";
import config from "../Config";


const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    alternativeEmail: "",
    country: "",
    state: "",
    city: "",
    highestEducation: "",
    instituteName: "",
    educationStartDate: "",
    workExperiences: [],
  hasWorkExperience: false,
    educationEndDate: "",
    currentGPA: "",
    workExperiences: [{ companyName: "", designation: "", startDate: "", endDate: "", currentlyWorking: false }],
    optInEmailOffers: false,
    shareWithRecruiters: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [showOTPVerification, setShowOTPVerification] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const toggleWorkExperience = () => {
    setFormData(prevState => ({
      ...prevState,
      hasWorkExperience: !prevState.hasWorkExperience,
      workExperiences: prevState.hasWorkExperience ? [] : [{ companyName: "", designation: "", startDate: "", endDate: "", currentlyWorking: false }]
    }));
  };

  const handleBasicSignup = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${config.backendUrl}/api/auth/basic-signup`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );
      if (response.data.success) {
        setUserId(response.data.userId);
      }
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.error ||
          "An error occurred during signup. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  const CustomAlert = ({ message }) => (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
  const handleCompleteSignup = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${config.backendUrl}/api/auth/complete-signup`,
        { ...formData, userId }
      );
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isAdmin", response.data.user.isAdmin);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.error ||
          "An error occurred during signup. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSuccess = () => {
    setStep(2);
  };

  const renderInput = (name, placeholder, icon, type = "text") => (
    <div className="relative mb-4">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
        {icon}
      </span>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        required
        className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
      />
    </div>
  );

  if (userId && step === 1) {
    return (
      <OTPVerification
        userId={userId}
        onVerificationSuccess={handleVerificationSuccess}
      />
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          {step === 1 ? "Join Our Learning Community" : "Complete Your Learner Profile"}
        </h2>
        {error && <CustomAlert message={error} />}
        {step === 1 ? (
          <form onSubmit={handleBasicSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {renderInput("firstName", "First Name", <FaUser className="text-blue-500" />)}
              {renderInput("lastName", "Last Name", <FaUser className="text-blue-500" />)}
            </div>
            {renderInput("username", "Username", <FaUser className="text-blue-500" />)}
            {renderInput("email", "Email", <FaEnvelope className="text-blue-500" />, "email")}
            {renderInput("password", "Password", <FaLock className="text-blue-500" />, "password")}
            {renderInput("confirmPassword", "Confirm Password", <FaLock className="text-blue-500" />, "password")}
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
                  <FaUserPlus className="mr-2" />
                  Start Your Learning Journey
                </>
              )}
            </motion.button>
          </form>
        ) : (
          <form onSubmit={handleCompleteSignup} className="space-y-4">
            {renderInput("phoneNumber", "Phone Number", <FaUser className="text-blue-500" />, "tel")}
            {renderInput("alternativeEmail", "Alternative Email", <FaEnvelope className="text-blue-500" />, "email")}
            <div className="grid grid-cols-3 gap-4">
              {renderInput("country", "Country", <FaUser className="text-blue-500" />)}
              {renderInput("state", "State", <FaUser className="text-blue-500" />)}
              {renderInput("city", "City", <FaUser className="text-blue-500" />)}
            </div>
            {renderInput("highestEducation", "Highest Education", <FaGraduationCap className="text-blue-500" />)}
            {renderInput("instituteName", "Institute Name", <FaGraduationCap className="text-blue-500" />)}
            <div className="grid grid-cols-2 gap-4">
              {renderInput("educationStartDate", "Education Start Date", <FaGraduationCap className="text-blue-500" />, "date")}
              {renderInput("educationEndDate", "Education End Date", <FaGraduationCap className="text-blue-500" />, "date")}
            </div>
            {renderInput("currentGPA", "Current GPA", <FaGraduationCap className="text-blue-500" />, "number")}
            {formData.workExperiences.map((exp, index) => (
              <div key={index} className="border p-4 rounded-md bg-gray-50">
                <h3 className="font-bold mb-2 text-gray-800">Work Experience {index + 1}</h3>
                {renderInput(`workExperiences[${index}].companyName`, "Company Name", <FaBriefcase className="text-blue-500" />)}
                {renderInput(`workExperiences[${index}].designation`, "Designation", <FaBriefcase className="text-blue-500" />)}
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => {
                      const newWorkExperiences = [...formData.workExperiences];
                      newWorkExperiences[index].startDate = e.target.value;
                      setFormData({ ...formData, workExperiences: newWorkExperiences });
                    }}
                    placeholder="Start Date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                  />
                  <input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) => {
                      const newWorkExperiences = [...formData.workExperiences];
                      newWorkExperiences[index].endDate = e.target.value;
                      setFormData({ ...formData, workExperiences: newWorkExperiences });
                    }}
                    placeholder="End Date"
                    disabled={exp.currentlyWorking}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                  />
                </div>
                <label className="flex items-center text-gray-700">
                  <input
                    type="checkbox"
                    checked={exp.currentlyWorking}
                    onChange={(e) => {
                      const newWorkExperiences = [...formData.workExperiences];
                      newWorkExperiences[index].currentlyWorking = e.target.checked;
                      setFormData({ ...formData, workExperiences: newWorkExperiences });
                    }}
                    className="mr-2 form-checkbox text-blue-500"
                  />
                  Currently Working
                </label>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newWorkExperiences = formData.workExperiences.filter((_, i) => i !== index);
                      setFormData({ ...formData, workExperiences: newWorkExperiences });
                    }}
                    className="mt-2 text-red-500 hover:text-red-600 transition duration-300"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setFormData({
                  ...formData,
                  workExperiences: [
                    ...formData.workExperiences,
                    { companyName: "", designation: "", startDate: "", endDate: "", currentlyWorking: false }
                  ]
                });
              }}
              className="text-blue-600 hover:text-blue-700 transition duration-300"
            >
              + Add Work Experience
            </button>
            
            <div className="space-y-2">
              <label className="flex items-center text-gray-700">
                <input
                  type="checkbox"
                  name="optInEmailOffers"
                  checked={formData.optInEmailOffers}
                  onChange={handleChange}
                  className="mr-2 form-checkbox text-blue-500"
                />
                Receive educational offers and updates
              </label>
              <label className="flex items-center text-gray-700">
                <input
                  type="checkbox"
                  name="shareWithRecruiters"
                  checked={formData.shareWithRecruiters}
                  onChange={handleChange}
                  className="mr-2 form-checkbox text-blue-500"
                />
                Share your profile with partner institutions
              </label>
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
                  <FaUserPlus className="mr-2" />
                  Complete Your Profile
                </>
              )}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Signup;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaGraduationCap, FaBriefcase } from "react-icons/fa";
// import OTPVerification from "../hooks/OTPVerification";
// import config from "../Config";

// const Signup = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phoneNumber: "",
//     alternativeEmail: "",
//     country: "",
//     state: "",
//     city: "",
//     highestEducation: "",
//     instituteName: "",
//     educationStartDate: "",
//     educationEndDate: "",
//     currentGPA: "",
//     hasWorkExperience: false,
//     workExperiences: [],
//     optInEmailOffers: false,
//     shareWithRecruiters: false,
//   });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const [tempUserId, setTempUserId] = useState(null);
//   const [showOTPVerification, setShowOTPVerification] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const toggleWorkExperience = () => {
//     setFormData(prevState => ({
//       ...prevState,
//       hasWorkExperience: !prevState.hasWorkExperience,
//       workExperiences: prevState.hasWorkExperience ? [] : [{ companyName: "", designation: "", startDate: "", endDate: "", currentlyWorking: false }]
//     }));
//   };

//   const handleBasicSignup = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${config.backendUrl}/api/auth/basic-signup`,
//         {
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           username: formData.username,
//           email: formData.email,
//           password: formData.password,
//         }
//       );
//       if (response.data.success) {
//         setTempUserId(response.data.tempUserId);
//         setShowOTPVerification(true);
//       }
//     } catch (error) {
//       console.error(error);
//       setError(
//         error.response?.data?.error ||
//           "An error occurred during signup. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerificationSuccess = (token, user) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));
//     setStep(2);
//   };

//   const handleCompleteSignup = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         `${config.backendUrl}/api/auth/complete-signup`,
//         { ...formData, userId: JSON.parse(localStorage.getItem("user")).id },
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//         }
//       );
//       if (response.data.success) {
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       console.error(error);
//       setError(
//         error.response?.data?.error ||
//           "An error occurred during signup. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const renderInput = (name, placeholder, icon, type = "text") => (
//     <div className="relative mb-4">
//       <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
//         {icon}
//       </span>
//       <input
//         type={type}
//         name={name}
//         value={formData[name]}
//         onChange={handleChange}
//         placeholder={placeholder}
//         required
//         className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
//       />
//     </div>
//   );

//   if (showOTPVerification) {
//     return (
//       <OTPVerification
//         tempUserId={tempUserId}
//         onVerificationSuccess={handleVerificationSuccess}
//       />
//     );
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100">
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl"
//       >
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
//           {step === 1 ? "Join Our Learning Community" : "Complete Your Learner Profile"}
//         </h2>
//         {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
//         {step === 1 ? (
//           <form onSubmit={handleBasicSignup} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               {renderInput("firstName", "First Name", <FaUser className="text-blue-500" />)}
//               {renderInput("lastName", "Last Name", <FaUser className="text-blue-500" />)}
//             </div>
//             {renderInput("username", "Username", <FaUser className="text-blue-500" />)}
//             {renderInput("email", "Email", <FaEnvelope className="text-blue-500" />, "email")}
//             {renderInput("password", "Password", <FaLock className="text-blue-500" />, "password")}
//             {renderInput("confirmPassword", "Confirm Password", <FaLock className="text-blue-500" />, "password")}
//             <motion.button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <motion.div
//                   className="w-6 h-6 border-t-2 border-white rounded-full animate-spin"
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                 />
//               ) : (
//                 <>
//                   <FaUserPlus className="mr-2" />
//                   Start Your Learning Journey
//                 </>
//               )}
//             </motion.button>
//           </form>
//         ) : (
//           <form onSubmit={handleCompleteSignup} className="space-y-4">
//             {renderInput("phoneNumber", "Phone Number", <FaUser className="text-blue-500" />, "tel")}
//             {renderInput("alternativeEmail", "Alternative Email", <FaEnvelope className="text-blue-500" />, "email")}
//             <div className="grid grid-cols-3 gap-4">
//               {renderInput("country", "Country", <FaUser className="text-blue-500" />)}
//               {renderInput("state", "State", <FaUser className="text-blue-500" />)}
//               {renderInput("city", "City", <FaUser className="text-blue-500" />)}
//             </div>
//             {renderInput("highestEducation", "Highest Education", <FaGraduationCap className="text-blue-500" />)}
//             {renderInput("instituteName", "Institute Name", <FaGraduationCap className="text-blue-500" />)}
//             <div className="grid grid-cols-2 gap-4">
//               {renderInput("educationStartDate", "Education Start Date", <FaGraduationCap className="text-blue-500" />, "date")}
//               {renderInput("educationEndDate", "Education End Date", <FaGraduationCap className="text-blue-500" />, "date")}
//             </div>
//             {renderInput("currentGPA", "Current GPA", <FaGraduationCap className="text-blue-500" />, "number")}
            
//             <div className="mb-4">
//               <label className="flex items-center text-gray-700 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={formData.hasWorkExperience}
//                   onChange={toggleWorkExperience}
//                   className="mr-2 form-checkbox text-blue-500"
//                 />
//                 I have work experience
//               </label>
//             </div>
            
//             {formData.hasWorkExperience && formData.workExperiences.map((exp, index) => (
//               <div key={index} className="border p-4 rounded-md bg-gray-50">
//                 <h3 className="font-bold mb-2 text-gray-800">Work Experience {index + 1}</h3>
//                 {renderInput(`workExperiences[${index}].companyName`, "Company Name", <FaBriefcase className="text-blue-500" />)}
//                 {renderInput(`workExperiences[${index}].designation`, "Designation", <FaBriefcase className="text-blue-500" />)}
//                 <div className="grid grid-cols-2 gap-4 mb-2">
//                   <input
//                     type="date"
//                     value={exp.startDate}
//                     onChange={(e) => {
//                       const newWorkExperiences = [...formData.workExperiences];
//                       newWorkExperiences[index].startDate = e.target.value;
//                     setFormData({ ...formData, workExperiences: newWorkExperiences });
//                   }}
//                   placeholder="Start Date"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
//                 />
//                 <input
//                   type="date"
//                   value={exp.endDate}
//                   onChange={(e) => {
//                     const newWorkExperiences = [...formData.workExperiences];
//                     newWorkExperiences[index].endDate = e.target.value;
//                     setFormData({ ...formData, workExperiences: newWorkExperiences });
//                   }}
//                   placeholder="End Date"
//                   disabled={exp.currentlyWorking}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
//                 />
//               </div>
//               <label className="flex items-center text-gray-700">
//                 <input
//                   type="checkbox"
//                   checked={exp.currentlyWorking}
//                   onChange={(e) => {
//                     const newWorkExperiences = [...formData.workExperiences];
//                     newWorkExperiences[index].currentlyWorking = e.target.checked;
//                     setFormData({ ...formData, workExperiences: newWorkExperiences });
//                   }}
//                   className="mr-2 form-checkbox text-blue-500"
//                 />
//                 Currently Working
//               </label>
//               {index > 0 && (
//                 <button
//                   type="button"
//                   onClick={() => {
//                     const newWorkExperiences = formData.workExperiences.filter((_, i) => i !== index);
//                     setFormData({ ...formData, workExperiences: newWorkExperiences });
//                   }}
//                   className="mt-2 text-red-500 hover:text-red-600 transition duration-300"
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>
//           ))}
//           {formData.hasWorkExperience && (
//             <button
//               type="button"
//               onClick={() => {
//                 setFormData({
//                   ...formData,
//                   workExperiences: [
//                     ...formData.workExperiences,
//                     { companyName: "", designation: "", startDate: "", endDate: "", currentlyWorking: false }
//                   ]
//                 });
//               }}
//               className="text-blue-600 hover:text-blue-700 transition duration-300"
//             >
//               + Add Work Experience
//             </button>
//           )}
          
//           <div className="space-y-2">
//             <label className="flex items-center text-gray-700">
//               <input
//                 type="checkbox"
//                 name="optInEmailOffers"
//                 checked={formData.optInEmailOffers}
//                 onChange={handleChange}
//                 className="mr-2 form-checkbox text-blue-500"
//               />
//               Receive educational offers and updates
//             </label>
//             <label className="flex items-center text-gray-700">
//               <input
//                 type="checkbox"
//                 name="shareWithRecruiters"
//                 checked={formData.shareWithRecruiters}
//                 onChange={handleChange}
//                 className="mr-2 form-checkbox text-blue-500"
//               />
//               Share your profile with partner institutions
//             </label>
//           </div>
//           <motion.button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
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
//                 <FaUserPlus className="mr-2" />
//                 Complete Your Profile
//               </>
//             )}
//           </motion.button>
//         </form>
//       )}
//     </motion.div>
//   </div>
//   );
// };

// export default Signup;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaGraduationCap, FaBriefcase, FaEye, FaEyeSlash } from "react-icons/fa";
// import OTPVerification from "../hooks/OTPVerification";
// import config from "../Config";

// const Signup = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//     password: "",
//     phoneNumber: "",
//     alternativeEmail: "",
//     country: "",
//     state: "",
//     city: "",
//     highestEducation: "",
//     instituteName: "",
//     educationStartDate: "",
//     educationEndDate: "",
//     currentGPA: "",
//     workExperiences: [],
//     optInEmailOffers: false,
//     shareWithRecruiters: false,
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const [userId, setUserId] = useState(null);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleNextStep = () => {
//     setStep(prevStep => prevStep + 1);
//   };

//   const handlePreviousStep = () => {
//     setStep(prevStep => prevStep - 1);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       const response = await axios.post(`${config.backendUrl}/api/auth/signup`, formData);
//       if (response.data.success) {
//         setUserId(response.data.userId);
//         handleNextStep(); // Move to OTP verification step
//       }
//     } catch (error) {
//       console.error(error);
//       setError(error.response?.data?.error || "An error occurred during signup. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerificationSuccess = () => {
//     // Handle successful verification (e.g., redirect to dashboard)
//     navigate("/dashboard");
//   };

//   const renderStep = () => {
//     switch(step) {
//       case 1:
//         return (
//           <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
//             {renderInput("firstName", "First Name", <FaUser />)}
//             {renderInput("lastName", "Last Name", <FaUser />)}
//             {renderInput("username", "Username", <FaUser />)}
//             {renderInput("email", "Email", <FaEnvelope />, "email")}
//             <div className="relative">
//               {renderInput("password", "Password", <FaLock />, showPassword ? "text" : "password")}
//               <button
//                 type="button"
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//             <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
//               Next
//             </button>
//           </form>
//         );
//       case 2:
//         return (
//           <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
//             {renderInput("phoneNumber", "Phone Number", <FaUser />, "tel")}
//             {renderInput("alternativeEmail", "Alternative Email", <FaEnvelope />, "email")}
//             {renderInput("country", "Country", <FaUser />)}
//             {renderInput("state", "State", <FaUser />)}
//             {renderInput("city", "City", <FaUser />)}
//             {renderInput("highestEducation", "Highest Education", <FaGraduationCap />)}
//             <div className="flex justify-between">
//               <button type="button" onClick={handlePreviousStep} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300">
//                 Previous
//               </button>
//               <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
//                 Next
//               </button>
//             </div>
//           </form>
//         );
//       case 3:
//         return (
//           <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
//             <h3 className="text-lg font-semibold mb-2">Work Experience (Optional)</h3>
//             {formData.workExperiences.map((exp, index) => (
//               <div key={index} className="mb-4">
//                 {renderInput(`workExperiences[${index}].companyName`, "Company Name", <FaBriefcase />)}
//                 {renderInput(`workExperiences[${index}].designation`, "Designation", <FaBriefcase />)}
//                 {renderInput(`workExperiences[${index}].startDate`, "Start Date", null, "date")}
//                 {renderInput(`workExperiences[${index}].endDate`, "End Date", null, "date")}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => setFormData(prev => ({
//                 ...prev,
//                 workExperiences: [...prev.workExperiences, { companyName: "", designation: "", startDate: "", endDate: "" }]
//               }))}
//               className="text-blue-600 hover:text-blue-700 transition duration-300 mb-4"
//             >
//               + Add Work Experience
//             </button>
//             <div className="flex justify-between">
//               <button type="button" onClick={handlePreviousStep} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300">
//                 Previous
//               </button>
//               <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
//                 Next
//               </button>
//             </div>
//           </form>
//         );
//       case 4:
//         return <OTPVerification userId={userId} onVerificationSuccess={handleVerificationSuccess} />;
//       default:
//         return null;
//     }
//   };

//   const renderInput = (name, placeholder, icon, type = "text") => (
//     <div className="relative mb-4">
//       <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
//         {icon}
//       </span>
//       <input
//         type={type}
//         name={name}
//         value={formData[name]}
//         onChange={handleChange}
//         placeholder={placeholder}
//         required
//         className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
//       />
//     </div>
//   );

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
//       >
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
//           {step === 4 ? "Verify Your Account" : "Join Our Learning Community"}
//         </h2>
//         {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
//         {renderStep()}
//       </motion.div>
//     </div>
//   );
// };

// export default Signup;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaGraduationCap, FaBriefcase, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
// import OTPVerification from "../hooks/OTPVerification";
// import config from "../Config";

// const Signup = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phoneNumber: "",
//     alternativeEmail: "",
//     country: "",
//     state: "",
//     city: "",
//     highestEducation: "",
//     instituteName: "",
//     educationStartDate: "",
//     educationEndDate: "",
//     currentGPA: "",
//     hasWorkExperience: false,
//     workExperiences: [],
//     optInEmailOffers: false,
//     shareWithRecruiters: false,
//   });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const [userId, setUserId] = useState(null);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const toggleWorkExperience = () => {
//     setFormData(prevState => ({
//       ...prevState,
//       hasWorkExperience: !prevState.hasWorkExperience,
//       workExperiences: prevState.hasWorkExperience ? [] : [{ companyName: "", designation: "", startDate: "", endDate: "", currentlyWorking: false }]
//     }));
//   };

//   const handleBasicSignup = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${config.backendUrl}/api/auth/basic-signup`,
//         {
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           username: formData.username,
//           email: formData.email,
//           password: formData.password,
//         }
//       );
//       if (response.data.success) {
//         setUserId(response.data.userId);
//         setStep(2);
//       }
//     } catch (error) {
//       console.error(error);
//       setError(
//         error.response?.data?.error ||
//           "An error occurred during signup. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCompleteSignup = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       const signupData = { ...formData };
//       if (!signupData.hasWorkExperience) {
//         delete signupData.workExperiences;
//       }
//       delete signupData.hasWorkExperience;

//       const response = await axios.post(
//         `${config.backendUrl}/api/auth/complete-signup`,
//         { ...signupData, userId }
//       );
//       if (response.data.success) {
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("isAdmin", response.data.user.isAdmin);
//         navigate("/");
//       }
//     } catch (error) {
//       console.error(error);
//       setError(
//         error.response?.data?.error ||
//           "An error occurred during signup. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const CustomAlert = ({ message }) => (
//     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
//       <strong className="font-bold">Error: </strong>
//       <span className="block sm:inline">{message}</span>
//     </div>
//   );

//   const renderInput = (name, placeholder, icon, type = "text") => (
//     <div className="relative mb-4">
//       <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
//         {icon}
//       </span>
//       <input
//         type={type}
//         name={name}
//         value={formData[name]}
//         onChange={handleChange}
//         placeholder={placeholder}
//         required
//         className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
//       />
//     </div>
//   );

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl"
//       >
//         <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
//           {step === 1 ? "Join Our Learning Community" : "Complete Your Learner Profile"}
//         </h2>
//         {error && <CustomAlert message={error} />}
//         {step === 1 ? (
//           <form onSubmit={handleBasicSignup} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               {renderInput("firstName", "First Name", <FaUser className="text-blue-600" />)}
//               {renderInput("lastName", "Last Name", <FaUser className="text-blue-600" />)}
//             </div>
//             {renderInput("username", "Username", <FaUser className="text-blue-600" />)}
//             {renderInput("email", "Email", <FaEnvelope className="text-blue-600" />, "email")}
//             {renderInput("password", "Password", <FaLock className="text-blue-600" />, "password")}
//             {renderInput("confirmPassword", "Confirm Password", <FaLock className="text-blue-600" />, "password")}
//             <motion.button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <motion.div
//                   className="w-6 h-6 border-t-2 border-white rounded-full animate-spin"
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                 />
//               ) : (
//                 <>
//                   <FaUserPlus className="mr-2" />
//                   Start Your Learning Journey
//                 </>
//               )}
//             </motion.button>
//           </form>
//         ) : (
//           <form onSubmit={handleCompleteSignup} className="space-y-4">
//             {renderInput("phoneNumber", "Phone Number", <FaPhone className="text-blue-600" />, "tel")}
//             {renderInput("alternativeEmail", "Alternative Email", <FaEnvelope className="text-blue-600" />, "email")}
//             <div className="grid grid-cols-3 gap-4">
//               {renderInput("country", "Country", <FaMapMarkerAlt className="text-blue-600" />)}
//               {renderInput("state", "State", <FaMapMarkerAlt className="text-blue-600" />)}
//               {renderInput("city", "City", <FaMapMarkerAlt className="text-blue-600" />)}
//             </div>
//             {renderInput("highestEducation", "Highest Education", <FaGraduationCap className="text-blue-600" />)}
//             {renderInput("instituteName", "Institute Name", <FaGraduationCap className="text-blue-600" />)}
//             <div className="grid grid-cols-2 gap-4">
//               {renderInput("educationStartDate", "Education Start Date", <FaGraduationCap className="text-blue-600" />, "date")}
//               {renderInput("educationEndDate", "Education End Date", <FaGraduationCap className="text-blue-600" />, "date")}
//             </div>
//             {renderInput("currentGPA", "Current GPA", <FaGraduationCap className="text-blue-600" />, "number")}
            
//             <div className="mb-4">
//               <label className="flex items-center text-gray-700">
//                 <input
//                   type="checkbox"
//                   checked={formData.hasWorkExperience}
//                   onChange={toggleWorkExperience}
//                   className="mr-2 form-checkbox text-blue-600"
//                 />
//                 I have work experience
//               </label>
//             </div>

//             {formData.hasWorkExperience && (
//               <>
//                 {formData.workExperiences.map((exp, index) => (
//                   <div key={index} className="border p-4 rounded-md bg-blue-50">
//                     <h3 className="font-bold mb-2 text-blue-800">Work Experience {index + 1}</h3>
//                     {renderInput(`workExperiences[${index}].companyName`, "Company Name", <FaBriefcase className="text-blue-600" />)}
//                     {renderInput(`workExperiences[${index}].designation`, "Designation", <FaBriefcase className="text-blue-600" />)}
//                     <div className="grid grid-cols-2 gap-4 mb-2">
//                       <input
//                         type="date"
//                         value={exp.startDate}
//                         onChange={(e) => {
//                           const newWorkExperiences = [...formData.workExperiences];
//                           newWorkExperiences[index].startDate = e.target.value;
//                           setFormData({ ...formData, workExperiences: newWorkExperiences });
//                         }}
//                         placeholder="Start Date"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
//                       />
//                       <input
//                         type="date"
//                         value={exp.endDate}
//                         onChange={(e) => {
//                           const newWorkExperiences = [...formData.workExperiences];
//                           newWorkExperiences[index].endDate = e.target.value;
//                           setFormData({ ...formData, workExperiences: newWorkExperiences });
//                         }}
//                         placeholder="End Date"
//                         disabled={exp.currentlyWorking}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
//                       />
//                     </div>
//                     <label className="flex items-center text-gray-700">
//                       <input
//                         type="checkbox"
//                         checked={exp.currentlyWorking}
//                         onChange={(e) => {
//                           const newWorkExperiences = [...formData.workExperiences];
//                           newWorkExperiences[index].currentlyWorking = e.target.checked;
//                           setFormData({ ...formData, workExperiences: newWorkExperiences });
//                         }}
//                         className="mr-2 form-checkbox text-blue-600"
//                       />
//                       Currently Working
//                     </label>
//                     {index > 0 && (
//                       <button
//                         type="button"
//                         onClick={() => {
//                           const newWorkExperiences = formData.workExperiences.filter((_, i) => i !== index);
//                           setFormData({ ...formData, workExperiences: newWorkExperiences });
//                         }}
//                         className="mt-2 text-red-500 hover:text-red-600 transition duration-300"
//                       >
//                         Remove
//                       </button>
//                     )}
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setFormData({
//                       ...formData,
//                       workExperiences: [
//                         ...formData.workExperiences,
//                         { companyName: "", designation: "", startDate: "", endDate: "", currentlyWorking: false }
//                       ]
//                     });
//                   }}
//                   className="text-blue-600 hover:text-blue-700 transition duration-300"
//                 >
//                   + Add Work Experience
//                 </button>
//               </>
//             )}
            
//             <div className="space-y-2">
//               <label className="flex items-center text-gray-700">
//                 <input
//                   type="checkbox"
//                   name="optInEmailOffers"
//                   checked={formData.optInEmailOffers}
//                   onChange={handleChange}
//                   className="mr-2 form-checkbox text-blue-600"
//                 />
//                 Receive educational offers and updates
//               </label>
//               <label className="flex items-center text-gray-700">
//                 <input
//                   type="checkbox"
//                   name="shareWithRecruiters"
//                   checked={formData.shareWithRecruiters}
//                   onChange={handleChange}
//                   className="mr-2 form-checkbox text-blue-600"
//                 />
//                 Share your profile with partner institutions
//               </label>
//             </div>
//             <motion.button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <motion.div
//                   className="w-6 h-6 border-t-2 border-white rounded-full animate-spin"
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                 />
//               ) : (
//                 <>
//                   <FaUserPlus className="mr-2" />
//                   Complete Your Profile
//                 </>
//               )}
//             </motion.button>
//           </form>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default Signup;
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaGraduationCap, FaBriefcase } from "react-icons/fa";
// import OTPVerification from "../hooks/OTPVerification";
// import config from "../Config";

// const Signup = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phoneNumber: "",
//     alternativeEmail: "",
//     country: "",
//     state: "",
//     city: "",
//     highestEducation: "",
//     instituteName: "",
//     educationStartDate: "",
//     educationEndDate: "",
//     currentGPA: "",
//     workExperiences: [{ companyName: "", designation: "", startDate: "", endDate: "", currentlyWorking: false }],
//     optInEmailOffers: false,
//     shareWithRecruiters: false,
//   });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const [userId, setUserId] = useState(null);
//   const [showOTPVerification, setShowOTPVerification] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleBasicSignup = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${config.backendUrl}/api/auth/basic-signup`,
//         {
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           username: formData.username,
//           email: formData.email,
//           password: formData.password,
//         }
//       );
//       if (response.data.success) {
//         setUserId(response.data.userId); // Store the userId
//         setShowOTPVerification(true);
//       }
//     } catch (error) {
//       console.error(error);
//       setError(
//         error.response?.data?.error ||
//           "An error occurred during signup. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // const handleOTPVerification = async (otp) => {
//   //   try {
//   //     const response = await axios.post(
//   //       `${config.backendUrl}/api/auth/verify-otp`,
//   //       { otp }
//   //     );
//   //     if (response.data.success) {
//   //       setUserId(response.data.user.id);
//   //       setStep(2);
//   //     }
//   //   } catch (error) {
//   //     console.error(error);
//   //     setError(
//   //       error.response?.data?.error ||
//   //         "An error occurred during OTP verification. Please try again."
//   //     );
//   //   }
//   // };
//   const handleOTPVerification = async (token) => {
//     try {
//       // Store the token in localStorage
//       localStorage.setItem("token", token);
      
//       // Fetch user data using the token
//       const response = await axios.get(`${config.backendUrl}/api/auth/user`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       if (response.data.success) {
//         setUserId(response.data.user.id);
//         localStorage.setItem("isAdmin", response.data.user.isAdmin);
//         setStep(2);
//       }
//     } catch (error) {
//       console.error(error);
//       setError(
//         error.response?.data?.error ||
//           "An error occurred during OTP verification. Please try again."
//       );
//     }
//   };

//   const handleCompleteSignup = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         `${config.backendUrl}/api/auth/complete-signup`,
//         { ...formData, userId }
//       );
//       if (response.data.success) {
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("isAdmin", response.data.user.isAdmin);
//         navigate("/");
//       }
//     } catch (error) {
//       console.error(error);
//       setError(
//         error.response?.data?.error ||
//           "An error occurred during signup. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const CustomAlert = ({ message }) => (
//     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
//       <strong className="font-bold">Error: </strong>
//       <span className="block sm:inline">{message}</span>
//     </div>
//   );

//   const renderInput = (name, placeholder, icon, type = "text") => (
//     <div className="relative mb-4">
//       <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
//         {icon}
//       </span>
//       <input
//         type={type}
//         name={name}
//         value={formData[name]}
//         onChange={handleChange}
//         placeholder={placeholder}
//         required
//         className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
//       />
//     </div>
//   );

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl"
//       >
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
//           {showOTPVerification ? "Verify OTP" : (step === 1 ? "Join Our Learning Community" : "Complete Your Learner Profile")}
//         </h2>
//         {error && <CustomAlert message={error} />}
//         {showOTPVerification ? (
//          <OTPVerification userId={userId} onVerificationSuccess={handleOTPVerification} />
//         ) : step === 1 ? (
//           <form onSubmit={handleBasicSignup} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               {renderInput("firstName", "First Name", <FaUser className="text-blue-500" />)}
//               {renderInput("lastName", "Last Name", <FaUser className="text-blue-500" />)}
//             </div>
//             {renderInput("username", "Username", <FaUser className="text-blue-500" />)}
//             {renderInput("email", "Email", <FaEnvelope className="text-blue-500" />, "email")}
//             {renderInput("password", "Password", <FaLock className="text-blue-500" />, "password")}
//             {renderInput("confirmPassword", "Confirm Password", <FaLock className="text-blue-500" />, "password")}
//             <motion.button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <motion.div
//                   className="w-6 h-6 border-t-2 border-white rounded-full animate-spin"
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                 />
//               ) : (
//                 <>
//                   <FaUserPlus className="mr-2" />
//                   Start Your Learning Journey
//                 </>
//               )}
//             </motion.button>
//           </form>
//         ) : (
//           <form onSubmit={handleCompleteSignup} className="space-y-4">
//             {renderInput("phoneNumber", "Phone Number", <FaUser className="text-blue-500" />, "tel")}
//             {renderInput("alternativeEmail", "Alternative Email", <FaEnvelope className="text-blue-500" />, "email")}
//             <div className="grid grid-cols-3 gap-4">
//               {renderInput("country", "Country", <FaUser className="text-blue-500" />)}
//               {renderInput("state", "State", <FaUser className="text-blue-500" />)}
//               {renderInput("city", "City", <FaUser className="text-blue-500" />)}
//             </div>
//             {renderInput("highestEducation", "Highest Education", <FaGraduationCap className="text-blue-500" />)}
//             {renderInput("instituteName", "Institute Name", <FaGraduationCap className="text-blue-500" />)}
//             <div className="grid grid-cols-2 gap-4">
//               {renderInput("educationStartDate", "Education Start Date", <FaGraduationCap className="text-blue-500" />, "date")}
//               {renderInput("educationEndDate", "Education End Date", <FaGraduationCap className="text-blue-500" />, "date")}
//             </div>
//             {renderInput("currentGPA", "Current GPA", <FaGraduationCap className="text-blue-500" />, "number")}
            
//             {formData.workExperiences.map((exp, index) => (
//               <div key={index} className="border p-4 rounded-md bg-gray-50">
//                 <h3 className="font-bold mb-2 text-gray-800">Work Experience {index + 1}</h3>
//                 {renderInput(`workExperiences[${index}].companyName`, "Company Name", <FaBriefcase className="text-blue-500" />)}
//                 {renderInput(`workExperiences[${index}].designation`, "Designation", <FaBriefcase className="text-blue-500" />)}
//                 <div className="grid grid-cols-2 gap-4 mb-2">
//                   <input
//                     type="date"
//                     value={exp.startDate}
//                     onChange={(e) => {
//                       const newWorkExperiences = [...formData.workExperiences];
//                       newWorkExperiences[index].startDate = e.target.value;
//                       setFormData({ ...formData, workExperiences: newWorkExperiences });
//                     }}
//                     placeholder="Start Date"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
//                   />
//                   <input
//                     type="date"
//                     value={exp.endDate}
//                     onChange={(e) => {
//                       const newWorkExperiences = [...formData.workExperiences];
//                       newWorkExperiences[index].endDate = e.target.value;
//                       setFormData({ ...formData, workExperiences: newWorkExperiences });
//                     }}
//                     placeholder="End Date"
//                     disabled={exp.currentlyWorking}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
//                   />
//                 </div>
//                 <label className="flex items-center text-gray-700">
//                   <input
//                     type="checkbox"
//                     checked={exp.currentlyWorking}
//                     onChange={(e) => {
//                       const newWorkExperiences = [...formData.workExperiences];
//                       newWorkExperiences[index].currentlyWorking = e.target.checked;
//                       setFormData({ ...formData, workExperiences: newWorkExperiences });
//                     }}
//                     className="mr-2 form-checkbox text-blue-500"
//                   />
//                   Currently Working
//                 </label>
//                 {index > 0 && (
//                   <button
//                     type="button"
//                     onClick={() => {
//                       const newWorkExperiences = formData.workExperiences.filter((_, i) => i !== index);
//                       setFormData({ ...formData, workExperiences: newWorkExperiences });
//                     }}
//                     className="mt-2 text-red-500 hover:text-red-600 transition duration-300"
//                   >
//                     Remove
//                   </button>
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => {
//                 setFormData({
//                   ...formData,
//                   workExperiences: [
//                     ...formData.workExperiences,
//                     { companyName: "", designation: "", startDate: "", endDate: "", currentlyWorking: false }
//                   ]
//                 });
//               }}
//               className="text-blue-600 hover:text-blue-700 transition duration-300"
//             >
//               + Add Work Experience
//             </button>
            
//             <div className="space-y-2">
//               <label className="flex items-center text-gray-700">
//                 <input
//                   type="checkbox"
//                   name="optInEmailOffers"
//                   checked={formData.optInEmailOffers}
//                   onChange={handleChange}
//                   className="mr-2 form-checkbox text-blue-500"
//                 />
//                 Receive educational offers and updates
//               </label>
//               <label className="flex items-center text-gray-700">
//                 <input
//                   type="checkbox"
//                   name="shareWithRecruiters"
//                   checked={formData.shareWithRecruiters}
//                   onChange={handleChange}
//                   className="mr-2 form-checkbox text-blue-500"
//                 />
//                 Share your profile with partner institutions
//               </label>
//             </div>
//             <motion.button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <motion.div
//                   className="w-6 h-6 border-t-2 border-white rounded-full animate-spin"
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                 />
//               ) : (
//                 <>
//                   <FaUserPlus className="mr-2" />
//                   Complete Your Profile
//                 </>
//               )}
//             </motion.button>
//           </form>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default Signup;