
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, Menu, X, CheckCircle, XCircle, Briefcase, Code, BookOpen, Award } from "lucide-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "tailwindcss/tailwind.css";
import { TailSpin } from "react-loader-spinner";
import confetti from "canvas-confetti";
import config from "../../Config";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import LocomotiveScroll from "locomotive-scroll";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [content, setContent] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [error, setError] = useState(null);
  const [contentSearchTerm, setContentSearchTerm] = useState("");
  const [quizSearchTerm, setQuizSearchTerm] = useState("");
  const [placements, setPlacements] = useState([]);
  const [hackathons, setHackathons] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const quizContainerRef = useRef(null);
  const [showExplanation, setShowExplanation] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 15;

  const scrollRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) {
      console.error('scrollRef is null');
      return;
    }
  
    const locoScroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      class: 'is-revealed',
    });
  
    ScrollTrigger.scrollerProxy(scrollRef.current, {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });
  
    locoScroll.on('scroll', ScrollTrigger.update);
  
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }
  
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.5,
        });
  
        ScrollTrigger.create({
          trigger: contentRef.current,
          scroller: scrollRef.current,
          start: "top bottom",
          end: "bottom top",
          animation: gsap.from(contentRef.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          }),
          once: true,
        });
      }
    });
  
    return () => {
      locoScroll.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, placementsRes, hackathonsRes] = await Promise.all([
          axios.get(`${config.backendUrl}/api/categories/slug/${slug}`),
          axios.get(`${config.backendUrl}/api/placements`),
          axios.get(`${config.backendUrl}/api/hackathons`),
        ]);
        setCategory(categoryRes.data);
        const contentRes = await axios.get(
          `${config.backendUrl}/api/content/category/${categoryRes.data._id}`
        );
        setContent(contentRes.data);
        setPlacements(placementsRes.data);
        setHackathons(hackathonsRes.data);
        document.title = categoryRes.data.title;
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          error.response?.status === 404
            ? "Category not found"
            : "An error occurred while fetching data"
        );
      }
    };
    fetchData();
  }, [slug]);

  const showAlert = useCallback((text, type) => {
    setAlertMessage({ text, type });
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  }, []);

  const sanitizeAndRenderContent = (htmlContent) => ({
    __html: DOMPurify.sanitize(htmlContent, {
      ADD_TAGS: ["math", "mrow", "mi", "mo", "mn", "msup", "mfrac", "img", "pre", "code"],
      ADD_ATTR: ["display", "xmlns", "src", "alt", "class", "style"],
    }),
  });

  const renderContent = (text) => {
    const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$|<pre[\s\S]*?<\/pre>)/);
    return parts.map((part, index) => {
      if (part.startsWith("$$") && part.endsWith("$$")) {
        return <MathJax key={index}>{`\\[${part.slice(2, -2)}\\]`}</MathJax>;
      } else if (part.startsWith("$") && part.endsWith("$")) {
        return <MathJax key={index}>{`\\(${part.slice(1, -1)}\\)`}</MathJax>;
      } else if (part.startsWith("<pre") && part.endsWith("</pre>")) {
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={sanitizeAndRenderContent(part)}
          />
        );
      } else {
        return (
          <span key={index}>
            {part.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                <span
                  dangerouslySetInnerHTML={sanitizeAndRenderContent(line)}
                />
              </React.Fragment>
            ))}
          </span>
        );
      }
    });
  };
  const handleContentClick = (content) => {
    setSelectedContent(content);
    setUserAnswers({});
    setQuizSubmitted(false);
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowExplanation({});
    setSidebarOpen(false);
  };

  const handleOptionSelect = (questionIndex, option) => {
    if (!quizSubmitted) {
      setUserAnswers((prev) => ({ ...prev, [questionIndex]: option }));
      const isCorrect = option === selectedContent.questions[questionIndex].correctAnswer;
      showAlert(
        isCorrect ? "Correct answer!" : "Wrong answer. Try again!",
        isCorrect ? "success" : "error"
      );
    }
  };

  const handleQuizSubmit = () => {
    let newScore = 0;
    selectedContent.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore);
    setQuizSubmitted(true);
    if (newScore === selectedContent.questions.length) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const renderQuizContent = () => {
    if (!selectedContent || selectedContent.type !== "quiz") return null;
    const filteredQuestions = selectedContent.questions.filter((question) =>
      question.question.toLowerCase().includes(quizSearchTerm.toLowerCase())
    );
  
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white p-6 rounded-lg shadow-lg"
        ref={quizContainerRef}
      >
        <h2 className="text-3xl font-bold mb-6 text-red-800">
          <BookOpen className="inline-block mr-2" />
          {selectedContent.title}
        </h2>
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              value={quizSearchTerm}
              onChange={(e) => setQuizSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pr-10 border-2 border-red-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors bg-red-50"
            />
            <Search className="absolute right-3 top-3 text-red-500" />
          </div>
        </div>
        {currentQuestions.length > 0 ? (
          <div>
            {currentQuestions.map((question, questionIndex) => (
              <motion.div
                key={questionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: questionIndex * 0.1 }}
                className="mb-8 p-4 bg-red-50 rounded-lg shadow-md"
              >
                <p className="text-xl font-semibold text-red-800 mb-4">
                  <span className="font-bold">
                    Question {indexOfFirstQuestion + questionIndex + 1}:
                  </span>{" "}
                  <MathJaxContext>
                    {renderContent(question.question)}
                  </MathJaxContext>
                </p>
                {question.image && (
                  <img
                    src={question.image}
                    alt={`Question ${indexOfFirstQuestion + questionIndex + 1}`}
                    className="mb-4 max-w-full h-auto rounded-lg shadow-md"
                  />
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {["a", "b", "c", "d"].map((option, optionIndex) => (
                    <motion.button
                      key={option}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleOptionSelect(indexOfFirstQuestion + questionIndex, option)}
                      className={`p-4 rounded-lg text-left transition-colors relative ${
                        userAnswers[indexOfFirstQuestion + questionIndex] === option
                          ? "bg-red-500 text-white"
                          : "bg-white text-red-800 hover:bg-red-100"
                      }`}
                    >
                      <span className="font-semibold mr-2">
                        {option.toUpperCase()}.
                      </span>
                      <MathJaxContext>
                        {renderContent(question.options[optionIndex])}
                      </MathJaxContext>
                    </motion.button>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setShowExplanation((prevState) => ({
                      ...prevState,
                      [indexOfFirstQuestion + questionIndex]: !prevState[indexOfFirstQuestion + questionIndex],
                    }))
                  }
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  {showExplanation[indexOfFirstQuestion + questionIndex] ? "Hide" : "Show"} Answer
                </motion.button>
                <AnimatePresence>
                  {showExplanation[indexOfFirstQuestion + questionIndex] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 p-4 bg-red-100 rounded-lg"
                    >
                      <h3 className="text-lg font-semibold text-red-800 mb-2">
                        Correct Answer: {question.correctAnswer.toUpperCase()}
                      </h3>
                      <h3 className="text-lg font-semibold text-red-800 mb-2">
                        Explanation:
                      </h3>
                      <MathJaxContext>
                        {renderContent(question.explanation)}
                      </MathJaxContext>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-red-800 text-lg">
            No matching questions found.
          </p>
        )}
  
        {/* Pagination controls */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-red-800">
            Page {currentPage} of {Math.ceil(filteredQuestions.length / questionsPerPage)}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredQuestions.length / questionsPerPage)))}
            disabled={currentPage === Math.ceil(filteredQuestions.length / questionsPerPage)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </motion.div>
    );
  };

  const renderNotesContent = () => {
    if (!selectedContent || selectedContent.type !== "notes") return null;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-red-800">
          <BookOpen className="inline-block mr-2" />
          {selectedContent.title}
        </h2>
        <div className="prose prose-lg max-w-none text-red-900">
          <MathJaxContext>
            {renderContent(selectedContent.description)}
          </MathJaxContext>
        </div>
        <p className="mt-8 text-sm text-red-600">
          Last updated:{" "}
          {new Date(selectedContent.lastUpdated).toLocaleDateString()}
        </p>
      </motion.div>
    );
  };

  const renderCarousel = (items, type) => (
    <Carousel
      showArrows={true}
      showStatus={false}
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={3000}
      className="mb-8"
    >
      {items.map((item) => (
        <motion.div
          key={item._id}
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
          onClick={() => navigate("/events", { state: { type, item } })}
        >
          <img
            src={type === "placement" ? item.logo : item.bannerLogoLink}
            alt={
              type === "placement"
                ? `${item.companyName} Logo`
                : `${item.instituteOrCompany} Banner`
            }
            className="w-full h-48 object-contain mb-4"
          />
          <h3 className="text-xl font-semibold text-red-800">
            {type === "placement" ? item.companyName : item.instituteOrCompany}
          </h3>
          <p className="text-red-600">
            {type === "placement" ? item.jobTitle :`${item.eventType} Event`}
          </p>
        </motion.div>
      ))}
    </Carousel>
  );

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-red-500 text-center mt-8 text-xl"
      >
        {error}
      </motion.div>
    );
  }

  if (!category) {
    return (
      <div className="flex justify-center items-center mt-16">
        <TailSpin height="80" width="80" color="#EF4444" ariaLabel="loading" />
      </div>
    );
  }

  const filteredContent = Array.isArray(content)
    ? content.filter(item => 
        item.title.toLowerCase().includes(contentSearchTerm.toLowerCase())
      )
    : [];

  return (
    <div ref={scrollRef} className="smooth-scroll">
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100">
        <div className="container mx-auto px-4 py-8">
          <motion.h1
            ref={titleRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-red-800 mb-8"
          >
            {category.title}
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <AnimatePresence>
              {(sidebarOpen || window.innerWidth >= 768) && (
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="md:col-span-1 p-6 rounded-lg shadow-lg sticky top-20 bg-white"
                >
                  <h2 className="text-2xl font-semibold mb-4 text-red-800">
                    <BookOpen className="inline-block mr-2" />
                    Content
                  </h2>
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search content..."
                        value={contentSearchTerm}
                        onChange={(e) => setContentSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 pr-10 border-2 border-red-300 rounded-md focus:outline-none focus:border-red-500 transition-colors bg-red-50"
                      />
                      <Search className="absolute right-3 top-3 text-red-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    {filteredContent.map((item, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleContentClick(item)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                          selectedContent && selectedContent._id === item._id
                            ? "bg-red-500 text-white"
                            : "bg-red-50 text-red-800 hover:bg-red-100"
                        }`}
                      >
                        {item.title}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Main Content */}
            <div ref={contentRef} className="md:col-span-2">
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
                    className="bg-white p-8 rounded-lg shadow-lg text-center"
                  >
                    <motion.p
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="text-xl text-red-700 mt-4"
                    >
                      {category.description}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Right Sidebar */}
            <div className="md:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-lg shadow-lg mb-8"
              >
                <h2 className="text-2xl font-semibold mb-4 text-red-800 flex items-center">
                  <Briefcase className="mr-2" />
                  Placements
                </h2>
                {renderCarousel(placements, "placement")}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <h2 className="text-2xl font-semibold mb-4 text-red-800 flex items-center">
                  <Code className="mr-2" />
                  Hackathons
                </h2>
                {renderCarousel(hackathons, "hackathon")}
              </motion.div>
            </div>
          </div>
        </div>
        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden fixed bottom-4 right-4 text-white p-4 rounded-full shadow-lg z-50 bg-red-500"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {sidebarOpen ? <X /> : <Menu />}
        </motion.button>
        {/* Alert Message */}
        <AnimatePresence>
          {alertMessage && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
                alertMessage.type === "success" ? "bg-green-500" : "bg-red-500"
              } text-white z-50 flex items-center`}
            >
              {alertMessage.type === "success" ? (
                <CheckCircle className="mr-2" />
              ) : (
                <XCircle className="mr-2" />
              )}
              {alertMessage.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CategoryPage;