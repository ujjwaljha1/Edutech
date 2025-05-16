// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import DOMPurify from "dompurify";
// import { MathJax, MathJaxContext } from "better-react-mathjax";
// import { motion, AnimatePresence } from "framer-motion";
// import config from '../../Config';
// import { Search, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
// import "tailwindcss/tailwind.css";
// import ReactMarkdown from 'react-markdown';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import rehypeRaw from 'rehype-raw';
// import remarkMath from 'remark-math';
// import rehypeKatex from 'rehype-katex';
// import 'katex/dist/katex.min.css';

// function CategoryPage() {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const [category, setCategory] = useState(null);
//   const [subcategories, setSubcategories] = useState([]);
//   const [content, setContent] = useState([]);
//   const [selectedContent, setSelectedContent] = useState(null);
//   const [error, setError] = useState(null);
//   const [contentSearchTerm, setContentSearchTerm] = useState("");
//   const [quizSearchTerm, setQuizSearchTerm] = useState("");
//   const [userAnswers, setUserAnswers] = useState({});
//   const [quizSubmitted, setQuizSubmitted] = useState(false);
//   const [score, setScore] = useState(0);
//   const [showExplanation, setShowExplanation] = useState({});
//   const [alertMessage, setAlertMessage] = useState(null);
//   const [copiedCode, setCopiedCode] = useState(null);
//   const [expandedSubcategories, setExpandedSubcategories] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const categoryRes = await axios.get(`${config.backendUrl}/api/categories/slug/${slug}`);
//         setCategory(categoryRes.data);
        
//         const subcategoriesRes = await axios.get(`${config.backendUrl}/api/subcategories/category/${categoryRes.data._id}`);
//         setSubcategories(subcategoriesRes.data);
        
//         const contentRes = await axios.get(`${config.backendUrl}/api/content/category/${categoryRes.data._id}`);
//         setContent(contentRes.data);
        
//         document.title = categoryRes.data.title;
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError(error.response?.status === 404 ? "Category not found" : "An error occurred while fetching data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [slug]);

//   const toggleSubcategory = (subcategoryId) => {
//     setExpandedSubcategories(prev => ({
//       ...prev,
//       [subcategoryId]: !prev[subcategoryId]
//     }));
//   };

//   const renderSidebar = () => (
//     <div className="bg-white p-4 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">Content</h2>
//       <div className="mb-4">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search content..."
//             value={contentSearchTerm}
//             onChange={(e) => setContentSearchTerm(e.target.value)}
//             className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//           />
//           <Search className="absolute right-2 top-2.5 text-gray-400" size={18} />
//         </div>
//       </div>
//       <div className="space-y-2">
//         {subcategories.map((subcategory) => (
//           <div key={subcategory._id} className="border-b border-gray-200 pb-2">
//             <button
//               onClick={() => toggleSubcategory(subcategory._id)}
//               className="w-full flex justify-between items-center py-2 text-left text-gray-700 hover:text-blue-600 transition-colors"
//             >
//               <span>{subcategory.title}</span>
//               {expandedSubcategories[subcategory._id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//             </button>
//             <AnimatePresence>
//               {expandedSubcategories[subcategory._id] && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   {content
//                     .filter((item) => item.subcategory === subcategory._id)
//                     .filter((item) => item.title.toLowerCase().includes(contentSearchTerm.toLowerCase()))
//                     .map((item) => (
//                       <button
//                         key={item._id}
//                         onClick={() => handleContentClick(item)}
//                         className={`w-full text-left py-1 px-4 text-sm ${
//                           selectedContent && selectedContent._id === item._id
//                             ? "text-blue-600 font-semibold"
//                             : "text-gray-600 hover:text-blue-600"
//                         }`}
//                       >
//                         {item.title}
//                       </button>
//                     ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
  
//   const mathJaxConfig = {
//     loader: { load: ["input/tex", "output/svg"] },
//     tex: {
//       inlineMath: [['$', '$'], ['\\(', '\\)']],
//       displayMath: [['$$', '$$'], ['\\[', '\\]']],
//       processEscapes: true,
//     },
//   };


//   const showAlert = useCallback((text, type) => {
//     setAlertMessage({ text, type });
//     setTimeout(() => setAlertMessage(null), 3000);
//   }, []);

//   const renderContent = (text) => {
//     const processedText = text.replace(/\\\(/g, '$').replace(/\\\)/g, '$')
//                               .replace(/\\\[/g, '$$').replace(/\\\]/g, '$$');
    
//     return (
//       <MathJaxContext config={mathJaxConfig}>
//         <ReactMarkdown
//           remarkPlugins={[remarkMath]}
//           rehypePlugins={[rehypeRaw, rehypeKatex]}
//           components={{
//           h1: ({node, ...props}) => <h1 className="text-3xl font-bold my-4 text-gray-800" {...props} />,
//           h2: ({node, ...props}) => <h2 className="text-2xl font-bold my-3 text-gray-800" {...props} />,
//           h3: ({node, ...props}) => <h3 className="text-xl font-bold my-2 text-gray-800" {...props} />,
//           h4: ({node, ...props}) => <h4 className="text-lg font-bold my-2 text-gray-800" {...props} />,
//           p: ({node, ...props}) => <p className="my-2 text-gray-700" {...props} />,
//           ul: ({node, ...props}) => <ul className="list-disc list-inside my-2 pl-4" {...props} />,
//           ol: ({node, ...props}) => <ol className="list-decimal list-inside my-2 pl-4" {...props} />,
//           li: ({node, ...props}) => <li className="my-1" {...props} />,
//           a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />,
//           blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic" {...props} />,
//           table: ({node, ...props}) => <table className="w-full border-collapse border border-gray-300 my-4" {...props} />,
//           th: ({node, ...props}) => <th className="border border-gray-300 p-2 bg-gray-100" {...props} />,
//           td: ({node, ...props}) => <td className="border border-gray-300 p-2" {...props} />,
//           code({node, inline, className, children, ...props}) {
//             const match = /language-(\w+)/.exec(className || '');
//             const codeString = String(children).replace(/\n$/, '');
            
//             if (!inline && match) {
//               return (
//                 <div className="relative">
//                   <SyntaxHighlighter style={tomorrow} language={match[1]} PreTag="div" {...props}>
//                     {codeString}
//                   </SyntaxHighlighter>
//                   <button
//                     onClick={() => {
//                       navigator.clipboard.writeText(codeString);
//                       setCopiedCode(codeString);
//                       setTimeout(() => setCopiedCode(null), 3000);
//                     }}
//                     className="absolute top-2 right-2 p-1 bg-gray-800 text-white rounded"
//                   >
//                     {copiedCode === codeString ? <Check size={16} /> : <Copy size={16} />}
//                   </button>
//                 </div>
//               );
//             } else {
//               return <code className={`${className} bg-gray-100 rounded px-1`} {...props}>{children}</code>;
//             }
//           },
//           p: ({children}) => {
//             return <p>{React.Children.map(children, child => 
//               typeof child === 'string' 
//                 ? <MathJax inline={true}>{child}</MathJax>
//                 : child
//             )}</p>
//           },
//         }}
//       >
//         {processedText}
//       </ReactMarkdown>
//     </MathJaxContext>
//   );
// };


//   const handleContentClick = (content) => {
//     setSelectedContent(content);
//     setUserAnswers({});
//     setQuizSubmitted(false);
//     setScore(0);
//     setShowExplanation({});
//   };

//   const handleOptionSelect = (questionIndex, option) => {
//     if (!quizSubmitted) {
//       setUserAnswers((prev) => ({ ...prev, [questionIndex]: option }));
//       const isCorrect = option === selectedContent.questions[questionIndex].correctAnswer;
//       showAlert(isCorrect ? "Correct answer!" : "Wrong answer. Try again!", isCorrect ? "success" : "error");
//     }
//   };

//   const handleQuizSubmit = () => {
//     let newScore = 0;
//     selectedContent.questions.forEach((question, index) => {
//       if (userAnswers[index] === question.correctAnswer) newScore++;
//     });
//     setScore(newScore);
//     setQuizSubmitted(true);
//   };

//   const renderQuizContent = () => {
//     if (!selectedContent || selectedContent.type !== "quiz") return null;
//     const filteredQuestions = selectedContent.questions.filter((question) =>
//       question.question.toLowerCase().includes(quizSearchTerm.toLowerCase())
//     );
//     return (
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">{selectedContent.title}</h2>
//         <div className="mb-6">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search questions..."
//               value={quizSearchTerm}
//               onChange={(e) => setQuizSearchTerm(e.target.value)}
//               className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//             />
//             <Search className="absolute right-2 top-2.5 text-gray-400" size={18} />
//           </div>
//         </div>
//         {filteredQuestions.length > 0 ? (
//           <div>
//             {filteredQuestions.map((question, questionIndex) => (
//               <div key={questionIndex} className="mb-8 p-4 bg-gray-50 rounded-lg">
//                 <p className="text-lg font-semibold text-gray-800 mb-4">
//                   <span className="font-bold">Question {questionIndex + 1}:</span> {renderContent(question.question)}
//                 </p>
//                 {question.image && (
//                   <img src={question.image} alt={`Question ${questionIndex + 1}`} className="mb-4 max-w-full h-auto rounded-lg shadow-sm" />
//                 )}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   {["a", "b", "c", "d"].map((option, optionIndex) => (
//                     <button
//                       key={option}
//                       onClick={() => handleOptionSelect(questionIndex, option)}
//                       className={`p-3 rounded-lg text-left transition-colors ${
//                         userAnswers[questionIndex] === option ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
//                       }`}
//                     >
//                       <span className="font-semibold mr-2">{option.toUpperCase()}.</span>
//                       {renderContent(question.options[optionIndex])}
//                     </button>
//                   ))}
//                 </div>
//                 <button
//                   onClick={() => setShowExplanation((prev) => ({ ...prev, [questionIndex]: !prev[questionIndex] }))}
//                   className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
//                 >
//                   {showExplanation[questionIndex] ? "Hide" : "Show"} Answer
//                 </button>
//                 <AnimatePresence>
//                   {showExplanation[questionIndex] && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       className="mt-4 p-4 bg-white rounded-lg border border-gray-200"
//                     >
//                       <h3 className="text-lg font-semibold text-gray-800 mb-2">Correct Answer: {question.correctAnswer.toUpperCase()}</h3>
//                       <h3 className="text-lg font-semibold text-gray-800 mb-2">Explanation:</h3>
//                       {renderContent(question.explanation)}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-700 text-lg">No matching questions found.</p>
//         )}
//       </div>
//     );
//   };

//   const renderNotesContent = () => {
//     if (!selectedContent || selectedContent.type !== "notes") return null;
//     return (
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">{selectedContent.title}</h2>
//         <div className="prose max-w-none">{renderContent(selectedContent.description)}</div>
//         <p className="mt-8 text-sm text-gray-500"> updated: {new Date(selectedContent.lastUpdated).toLocaleDateString()}</p>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-red-500 text-center mt-8 text-xl">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <MathJaxContext config={mathJaxConfig}>
//       <div className="bg-gray-100 min-h-screen">
//         <div className="container mx-auto px-4 py-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div className="md:col-span-1">
//               {renderSidebar()}
//             </div>
//             <div className="md:col-span-3">
//               <AnimatePresence mode="wait">
//                 {selectedContent ? (
//                   selectedContent.type === "quiz" ? (
//                     renderQuizContent()
//                   ) : (
//                     renderNotesContent()
//                   )
//                 ) : (
//                   <motion.div
//                     key="placeholder"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     className="bg-white p-8 rounded-lg shadow-md text-center"
//                   >
//                     <h1 className="text-2xl font-bold text-gray-800 mb-4">{category.title}</h1>
//                     <p className="text-lg text-gray-600">{category.description}</p>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>
//         <AnimatePresence>
//           {alertMessage && (
//             <motion.div
//               initial={{ opacity: 0, y: -50 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -50 }}
//               className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
//                 alertMessage.type === "success" ? "bg-green-500" : "bg-red-500"
//               } text-white z-50`}
//             >
//               {alertMessage.text}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </MathJaxContext>
//   );
// }

// // export default CategoryPage;

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { motion, AnimatePresence } from "framer-motion";
import config from '../../Config';
import { Search, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import "tailwindcss/tailwind.css";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

function CategoryPage() {
  const { slug,contentSlug } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [content, setContent] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [error, setError] = useState(null);
  const [contentSearchTerm, setContentSearchTerm] = useState("");
  const [quizSearchTerm, setQuizSearchTerm] = useState("");
  const [userAnswers, setUserAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);
  const [expandedSubcategories, setExpandedSubcategories] = useState(() => {
    const saved = localStorage.getItem('expandedSubcategories');
    return saved ? JSON.parse(saved) : {};
  });
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const categoryRes = await axios.get(`${config.backendUrl}/api/categories/slug/${slug}`);
  //       setCategory(categoryRes.data);
        
  //       const subcategoriesRes = await axios.get(`${config.backendUrl}/api/subcategories/category/${categoryRes.data._id}`);
  //       setSubcategories(subcategoriesRes.data);
        
  //       const contentRes = await axios.get(`${config.backendUrl}/api/content/category/${categoryRes.data._id}`);
  //       setContent(contentRes.data);
        
  //       document.title = categoryRes.data.title;
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setError(error.response?.status === 404 ? "Category not found" : "An error occurred while fetching data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [slug]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const categoryRes = await axios.get(`${config.backendUrl}/api/categories/slug/${slug}`);
  //       setCategory(categoryRes.data);
        
  //       const subcategoriesRes = await axios.get(`${config.backendUrl}/api/subcategories/category/${categoryRes.data._id}`);
  //       setSubcategories(subcategoriesRes.data);
        
  //       const contentRes = await axios.get(`${config.backendUrl}/api/content/category/${categoryRes.data._id}`);
  //       setContent(contentRes.data);
        
  //       document.title = categoryRes.data.title;

  //       // If contentSlug is provided, find and set the selected content
  //       if (contentSlug) {
  //         const selectedContent = contentRes.data.find(item => 
  //           item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === contentSlug
  //         );
  //         if (selectedContent) {
  //           setSelectedContent(selectedContent);
  //         } else {
  //           // Handle case when content is not found
  //           setError("Content not found");
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setError(error.response?.status === 404 ? "Category not found" : "An error occurred while fetching data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [slug, contentSlug]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoryRes = await axios.get(`${config.backendUrl}/api/categories/slug/${slug}`);
        setCategory(categoryRes.data);
        
        const subcategoriesRes = await axios.get(`${config.backendUrl}/api/subcategories/category/${categoryRes.data._id}`);
        setSubcategories(subcategoriesRes.data);
        
        const contentRes = await axios.get(`${config.backendUrl}/api/content/category/${categoryRes.data._id}`);
        setContent(contentRes.data);
        
        document.title = categoryRes.data.title;
  
        // Load expanded subcategories from localStorage
        const savedExpanded = localStorage.getItem('expandedSubcategories');
        if (savedExpanded) {
          setExpandedSubcategories(JSON.parse(savedExpanded));
        }
  
        if (contentSlug) {
          const selectedContent = contentRes.data.find(item => 
            item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === contentSlug
          );
          if (selectedContent) {
            setSelectedContent(selectedContent);
            
            // Expand the subcategory containing the selected content
            const subcategory = subcategoriesRes.data.find(sub => sub._id === selectedContent.subcategory);
            if (subcategory) {
              setExpandedSubcategories(prev => ({
                ...prev,
                [subcategory._id]: true
              }));
            }
          } else {
            setError("Content not found");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.response?.status === 404 ? "Category not found" : "An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, contentSlug]);
  const toggleSubcategory = (subcategoryId) => {
    setExpandedSubcategories(prev => {
      const newState = { ...prev, [subcategoryId]: !prev[subcategoryId] };
      localStorage.setItem('expandedSubcategories', JSON.stringify(newState));
      return newState;
    });
  };

  // const renderSidebar = () => (
  //   <div className="bg-white p-4 rounded-lg shadow-md">
  //     <h2 className="text-xl font-semibold mb-4 text-gray-800">Content</h2>
  //     <div className="mb-4">
  //       <div className="relative">
  //         <input
  //           type="text"
  //           placeholder="Search content..."
  //           value={contentSearchTerm}
  //           onChange={(e) => setContentSearchTerm(e.target.value)}
  //           className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
  //         />
  //         <Search className="absolute right-2 top-2.5 text-gray-400" size={18} />
  //       </div>
  //     </div>
  //     <div className="space-y-2">
  //       {subcategories.map((subcategory) => (
  //         <div key={subcategory._id} className="border-b border-gray-200 pb-2">
  //           <button
  //             onClick={() => toggleSubcategory(subcategory._id)}
  //             className="w-full flex justify-between items-center py-2 text-left text-gray-700 hover:text-blue-600 transition-colors"
  //           >
  //             <span>{subcategory.title}</span>
  //             {expandedSubcategories[subcategory._id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
  //           </button>
  //           <AnimatePresence>
  //             {expandedSubcategories[subcategory._id] && (
  //               <motion.div
  //                 initial={{ opacity: 0, height: 0 }}
  //                 animate={{ opacity: 1, height: "auto" }}
  //                 exit={{ opacity: 0, height: 0 }}
  //                 transition={{ duration: 0.3 }}
  //               >
  //                 {content
  //                   .filter((item) => item.subcategory === subcategory._id)
  //                   .filter((item) => item.title.toLowerCase().includes(contentSearchTerm.toLowerCase()))
  //                   .map((item) => (
  //                     <button
  //                       key={item._id}
  //                       onClick={() => handleContentClick(item)}
  //                       className={`w-full text-left py-1 px-4 text-sm ${
  //                         selectedContent && selectedContent._id === item._id
  //                           ? "text-blue-600 font-semibold"
  //                           : "text-gray-600 hover:text-blue-600"
  //                       }`}
  //                     >
  //                       {item.title}
  //                     </button>
  //                   ))}
  //               </motion.div>
  //             )}
  //           </AnimatePresence>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
  
  const renderSidebar = () => (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Content</h2>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search content..."
            value={contentSearchTerm}
            onChange={(e) => setContentSearchTerm(e.target.value)}
            className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <Search className="absolute right-2 top-2.5 text-gray-400" size={18} />
        </div>
      </div>
      <div className="space-y-2">
        {subcategories.map((subcategory) => (
          <div key={subcategory._id} className="border-b border-gray-200 pb-2">
            <button
              onClick={() => toggleSubcategory(subcategory._id)}
              className="w-full flex justify-between items-center py-2 text-left text-gray-700 hover:text-blue-600 transition-colors"
            >
              <span>{subcategory.title}</span>
              {expandedSubcategories[subcategory._id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            <AnimatePresence>
              {expandedSubcategories[subcategory._id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {content
                    .filter((item) => item.subcategory === subcategory._id)
                    .filter((item) => item.title.toLowerCase().includes(contentSearchTerm.toLowerCase()))
                    .map((item) => (
                      <button
                        key={item._id}
                        onClick={() => handleContentClick(item)}
                        className={`w-full text-left py-1 px-4 text-sm ${
                          selectedContent && selectedContent._id === item._id
                            ? "text-blue-600 font-semibold"
                            : "text-gray-600 hover:text-blue-600"
                        }`}
                      >
                        {item.title}
                      </button>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
  const mathJaxConfig = {
    loader: { load: ["input/tex", "output/svg"] },
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']],
      processEscapes: true,
    },
    startup: {
      typeset: false,
    },
  };
  


  const showAlert = useCallback((text, type) => {
    setAlertMessage({ text, type });
    setTimeout(() => setAlertMessage(null), 3000);
  }, []);

//   const renderContent = (text) => {
//     const processedText = text.replace(/\\\(/g, '$').replace(/\\\)/g, '$')
//                               .replace(/\\\[/g, '$$').replace(/\\\]/g, '$$');
    
//     return (
//       <MathJaxContext config={mathJaxConfig}>
//         <ReactMarkdown
//           remarkPlugins={[remarkMath]}
//           rehypePlugins={[rehypeRaw, rehypeKatex]}
//           components={{
//           h1: ({node, ...props}) => <h1 className="text-3xl font-bold my-4 text-gray-800" {...props} />,
//           h2: ({node, ...props}) => <h2 className="text-2xl font-bold my-3 text-gray-800" {...props} />,
//           h3: ({node, ...props}) => <h3 className="text-xl font-bold my-2 text-gray-800" {...props} />,
//           h4: ({node, ...props}) => <h4 className="text-lg font-bold my-2 text-gray-800" {...props} />,
//           p: ({node, ...props}) => <p className="my-2 text-gray-700" {...props} />,
//           ul: ({node, ...props}) => <ul className="list-disc list-inside my-2 pl-4" {...props} />,
//           ol: ({node, ...props}) => <ol className="list-decimal list-inside my-2 pl-4" {...props} />,
//           li: ({node, ...props}) => <li className="my-1" {...props} />,
//           a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />,
//           blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic" {...props} />,
//           table: ({node, ...props}) => <table className="w-full border-collapse border border-gray-300 my-4" {...props} />,
//           th: ({node, ...props}) => <th className="border border-gray-300 p-2 bg-gray-100" {...props} />,
//           td: ({node, ...props}) => <td className="border border-gray-300 p-2" {...props} />,
//           code({node, inline, className, children, ...props}) {
//             const match = /language-(\w+)/.exec(className || '');
//             const codeString = String(children).replace(/\n$/, '');
            
//             if (!inline && match) {
//               return (
//                 <div className="relative">
//                   <SyntaxHighlighter style={tomorrow} language={match[1]} PreTag="div" {...props}>
//                     {codeString}
//                   </SyntaxHighlighter>
//                   <button
//                     onClick={() => {
//                       navigator.clipboard.writeText(codeString);
//                       setCopiedCode(codeString);
//                       setTimeout(() => setCopiedCode(null), 3000);
//                     }}
//                     className="absolute top-2 right-2 p-1 bg-gray-800 text-white rounded"
//                   >
//                     {copiedCode === codeString ? <Check size={16} /> : <Copy size={16} />}
//                   </button>
//                 </div>
//               );
//             } else {
//               return <code className={`${className} bg-gray-100 rounded px-1`} {...props}>{children}</code>;
//             }
//           },
//           p: ({children}) => {
//             return <p>{React.Children.map(children, child => 
//               typeof child === 'string' 
//                 ? <MathJax inline={true}>{child}</MathJax>
//                 : child
//             )}</p>
//           },
//         }}
//       >
//         {processedText}
//       </ReactMarkdown>
//     </MathJaxContext>
//   );
// };


// const renderContent = (text) => {
//   const processedText = text.replace(/\\\(/g, '$').replace(/\\\)/g, '$')
//                             .replace(/\\\[/g, '$$').replace(/\\\]/g, '$$');
  
//   return (
//     <MathJaxContext config={mathJaxConfig}>
//       <ReactMarkdown
//         remarkPlugins={[remarkMath]}
//         rehypePlugins={[rehypeRaw, rehypeKatex]}
//         components={{
//           h1: ({node, ...props}) => <h1 className="text-3xl font-bold my-4 text-gray-800" {...props} />,
//           h2: ({node, ...props}) => <h2 className="text-2xl font-bold my-3 text-gray-800" {...props} />,
//           h3: ({node, ...props}) => <h3 className="text-xl font-bold my-2 text-gray-800" {...props} />,
//           h4: ({node, ...props}) => <h4 className="text-lg font-bold my-2 text-gray-800" {...props} />,
//           p: ({node, ...props}) => <p className="my-2 text-gray-700" {...props} />,
//           ul: ({node, ...props}) => <ul className="list-disc list-inside my-2 pl-4" {...props} />,
//           ol: ({node, ...props}) => <ol className="list-decimal list-inside my-2 pl-4" {...props} />,
//           li: ({node, children, ...props}) => {
//             // Check if the first child is plain text and starts with a number followed by a period
//             if (typeof children[0] === 'string' && /^\d+\.\s/.test(children[0])) {
//               // Split the text into number and content
//               const [number, ...content] = children[0].split(/\s(.+)/);
//               return (
//                 <li className="my-1" {...props}>
//                   <strong>{number}</strong> {content}
//                   {children.slice(1)}
//                 </li>
//               );
//             }
//             return <li className="my-1" {...props}>{children}</li>;
//           },
//           a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />,
//           blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic" {...props} />,
//           table: ({node, ...props}) => <table className="w-full border-collapse border border-gray-300 my-4" {...props} />,
//           th: ({node, ...props}) => <th className="border border-gray-300 p-2 bg-gray-100" {...props} />,
//           td: ({node, ...props}) => <td className="border border-gray-300 p-2" {...props} />,
//           code({node, inline, className, children, ...props}) {
//             const match = /language-(\w+)/.exec(className || '');
//             const codeString = String(children).replace(/\n$/, '');
            
//             if (!inline && match) {
//               return (
//                 <div className="relative">
//                   <SyntaxHighlighter style={tomorrow} language={match[1]} PreTag="div" {...props}>
//                     {codeString}
//                   </SyntaxHighlighter>
//                   <button
//                     onClick={() => {
//                       navigator.clipboard.writeText(codeString);
//                       setCopiedCode(codeString);
//                       setTimeout(() => setCopiedCode(null), 3000);
//                     }}
//                     className="absolute top-2 right-2 p-1 bg-gray-800 text-white rounded"
//                   >
//                     {copiedCode === codeString ? <Check size={16} /> : <Copy size={16} />}
//                   </button>
//                 </div>
//               );
//             } else {
//               return <code className={`${className} bg-gray-100 rounded px-1`} {...props}>{children}</code>;
//             }
//           },
//           p: ({children}) => {
//             return <p>{React.Children.map(children, child => 
//               typeof child === 'string' 
//                 ? <MathJax inline={true}>{child}</MathJax>
//                 : child
//             )}</p>
//           },
//         }}
//       >
//         {processedText}
//       </ReactMarkdown>
//     </MathJaxContext>
//   );
// };


const renderContent = (text) => {
  const processedText = text.replace(/\\\(/g, '$').replace(/\\\)/g, '$')
                            .replace(/\\\[/g, '$$').replace(/\\\]/g, '$$');
  
  return (
    <MathJaxContext config={mathJaxConfig}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          h1: ({node, ...props}) => <h1 className="text-3xl font-bold my-4 text-gray-800" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-2xl font-bold my-3 text-gray-800" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-xl font-bold my-2 text-gray-800" {...props} />,
          h4: ({node, ...props}) => <h4 className="text-lg font-bold my-2 text-gray-800" {...props} />,
          p: ({node, children, ...props}) => {
            // Check if the paragraph starts with a number followed by a period and bold text
            const match = /^(\d+)\.\s+\*\*(.+?)\*\*/.exec(children[0]);
            if (match) {
              return (
                <p className="my-2 text-gray-700" {...props}>
                  <strong>{match[1]}. {match[2]}</strong>
                  {children[0].slice(match[0].length)}
                  {children.slice(1)}
                </p>
              );
            }
            return <p className="my-2 text-gray-700" {...props}>{children}</p>;
          },
          ul: ({node, ...props}) => <ul className="list-disc list-inside my-2 pl-4" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal list-inside my-2 pl-4" {...props} />,
          li: ({node, children, ...props}) => {
            // Check if the first child is plain text and starts with a number followed by a period
            if (typeof children[0] === 'string' && /^\d+\.\s/.test(children[0])) {
              // Split the text into number and content
              const [number, ...content] = children[0].split(/\s(.+)/);
              return (
                <li className="my-1" {...props}>
                  <strong>{number}</strong> {content}
                  {children.slice(1)}
                </li>
              );
            }
            return <li className="my-1" {...props}>{children}</li>;
          },
          a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic" {...props} />,
          table: ({node, ...props}) => <table className="w-full border-collapse border border-gray-300 my-4" {...props} />,
          th: ({node, ...props}) => <th className="border border-gray-300 p-2 bg-gray-100" {...props} />,
          td: ({node, ...props}) => <td className="border border-gray-300 p-2" {...props} />,
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');
            
            if (!inline && match) {
              return (
                <div className="relative">
                  <SyntaxHighlighter style={tomorrow} language={match[1]} PreTag="div" {...props}>
                    {codeString}
                  </SyntaxHighlighter>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(codeString);
                      setCopiedCode(codeString);
                      setTimeout(() => setCopiedCode(null), 3000);
                    }}
                    className="absolute top-2 right-2 p-1 bg-gray-800 text-white rounded"
                  >
                    {copiedCode === codeString ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              );
            } else {
              return <code className={`${className} bg-gray-100 rounded px-1`} {...props}>{children}</code>;
            }
          },
          p: ({children}) => {
            return <p>{React.Children.map(children, child => 
              typeof child === 'string' 
                ? <MathJax inline={true}>{child}</MathJax>
                : child
            )}</p>
          },
        }}
      >
        {processedText}
      </ReactMarkdown>
    </MathJaxContext>
  );
};
const handleContentClick = (content) => {
  setSelectedContent(content);
  setUserAnswers({});
  setQuizSubmitted(false);
  setScore(0);
  setShowExplanation({});
  
  // Update the URL with the content title
  const newContentSlug = content.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  navigate(`/${slug}/${newContentSlug}`, { replace: true });
};



  const handleOptionSelect = (questionIndex, option) => {
    if (!quizSubmitted) {
      setUserAnswers((prev) => ({ ...prev, [questionIndex]: option }));
      const isCorrect = option === selectedContent.questions[questionIndex].correctAnswer;
      showAlert(isCorrect ? "Correct answer!" : "Wrong answer. Try again!", isCorrect ? "success" : "error");
    }
  };

  const handleQuizSubmit = () => {
    let newScore = 0;
    selectedContent.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) newScore++;
    });
    setScore(newScore);
    setQuizSubmitted(true);
  };

  const renderQuizContent = () => {
    if (!selectedContent || selectedContent.type !== "quiz") return null;
    const filteredQuestions = selectedContent.questions.filter((question) =>
      question.question.toLowerCase().includes(quizSearchTerm.toLowerCase())
    );
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{selectedContent.title}</h2>
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              value={quizSearchTerm}
              onChange={(e) => setQuizSearchTerm(e.target.value)}
              className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Search className="absolute right-2 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
        {filteredQuestions.length > 0 ? (
          <div>
            {filteredQuestions.map((question, questionIndex) => (
              <div key={questionIndex} className="mb-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-lg font-semibold text-gray-800 mb-4">
                  <span className="font-bold">Question {questionIndex + 1}:</span> {renderContent(question.question)}
                </p>
                {question.image && (
                  <img src={question.image} alt={`Question ${questionIndex + 1}`} className="mb-4 max-w-full h-auto rounded-lg shadow-sm" />
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {["a", "b", "c", "d"].map((option, optionIndex) => (
                    <button
                      key={option}
                      onClick={() => handleOptionSelect(questionIndex, option)}
                      className={`p-3 rounded-lg text-left transition-colors ${
                        userAnswers[questionIndex] === option ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="font-semibold mr-2">{option.toUpperCase()}.</span>
                      {renderContent(question.options[optionIndex])}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowExplanation((prev) => ({ ...prev, [questionIndex]: !prev[questionIndex] }))}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  {showExplanation[questionIndex] ? "Hide" : "Show"} Answer
                </button>
                <AnimatePresence>
                  {showExplanation[questionIndex] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 p-4 bg-white rounded-lg border border-gray-200"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Correct Answer: {question.correctAnswer.toUpperCase()}</h3>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Explanation:</h3>
                      {renderContent(question.explanation)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 text-lg">No matching questions found.</p>
        )}
      </div>
    );
  };

  const renderNotesContent = () => {
    if (!selectedContent || selectedContent.type !== "notes") return null;
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{selectedContent.title}</h2>
        <div className="prose max-w-none">{renderContent(selectedContent.description)}</div>
        <p className="mt-8 text-sm text-gray-500"> updated: {new Date(selectedContent.lastUpdated).toLocaleDateString()}</p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-8 text-xl">
        {error}
      </div>
    );
  }

  return (
    <MathJaxContext config={mathJaxConfig}>
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              {renderSidebar()}
            </div>
            <div className="md:col-span-3">
              <AnimatePresence mode="wait">
                {selectedContent ? (
                  selectedContent.type === "quiz" ? (
                    renderQuizContent()
                  ) : (
                    renderNotesContent()
                  )
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white p-8 rounded-lg shadow-md text-center"
                  >
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">{category.title}</h1>
                    <p className="text-lg text-gray-600">{category.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {alertMessage && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
                alertMessage.type === "success" ? "bg-green-500" : "bg-red-500"
              } text-white z-50`}
            >
              {alertMessage.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MathJaxContext>
  );
}

export default CategoryPage;