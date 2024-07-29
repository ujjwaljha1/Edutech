

// // import React, { useState, useEffect } from 'react';
// // import "./App.css";
// // import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
// // import Navbar from "./Pages/Home/Navbar";
// // import Index from "./Pages/Index";
// // import HomePage from "./Pages/Home/HomePage";
// // import CategoryPage from "./Pages/Home/CategoryPage";
// // import Login from "./Pages/Home/LoginPage";
// // import AdminPage from "./AdminPanel/Adminpage";
// // import AdminPanel from "./AdminPanel/AdminPanel";
// // import AddAdminForm from "./AdminPanel/AddAdminForm";
// // import EventsPage from "./Pages/Home/EventsPage";
// // import Signup from "./AdminPanel/SignUpPage";
// // import PlacementPage from "./AdminPanel/PlacementPage";
// // import HackathonPage from "./AdminPanel/Hackathon";
// // import ViewUsers from "./AdminPanel/Users";
// // import AnnouncementForm from "./AdminPanel/AnnouncementForm";
// // import Footer from "./Pages/Home/Footer";
// // import Loader from './Loader';

// // function App() {
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       setLoading(false);
// //     }, 3000);

// //     return () => clearTimeout(timer);
// //   }, []);

// //   if (loading) {
// //     return <Loader />;
// //   }

// //   return (
// //     <Router>
// //       <AppContent />
// //     </Router>
// //   );
// // }

// // function AppContent() {
// //   const [pageLoading, setPageLoading] = useState(false);
// //   const location = useLocation();

// //   useEffect(() => {
// //     setPageLoading(true);
// //     const timer = setTimeout(() => {
// //       setPageLoading(false);
// //     }, 3000);

// //     return () => clearTimeout(timer);
// //   }, [location]);

// //   if (pageLoading) {
// //     return <Loader />;
// //   }

// //   return (
// //     <div className="App">
// //       <Navbar />
// //       <Routes>
// //         <Route path="/" element={<Index />} />
// //         <Route path="/courses" element={<HomePage />} />
// //         <Route path="/:slug" element={<CategoryPage />} />
// //         <Route path="/Login" element={<Login />} />
// //         <Route path="/Adminpage" element={<AdminPage />} /> {/**Admin,ceo */}
// //         <Route path="/Admin" element={<AdminPanel />} /> {/**Admin,ceo */}
// //         <Route path="/ceopanel" element={<AddAdminForm />} /> {/**ceo */}
// //         <Route path="/events" element={<EventsPage />} />
// //         <Route path="/signup" element={<Signup />} />
// //         <Route path="/placement" element={<PlacementPage />} /> {/**Admin,ceo */}
// //         <Route path="/hackathon" element={<HackathonPage />} /> {/**Admin,ceo */}
// //         <Route path="/user" element={<ViewUsers />} />
// //         <Route path="/createAnnouncement" element={<AnnouncementForm />} /> {/**Admin,ceo */}
// //       </Routes>
// //       <Footer/>
// //     </div>
// //   );
// // }

// // export default App;


// import React, { useState, useEffect } from 'react';
// import "./App.css";
// import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
// import Navbar from "./Pages/Home/Navbar";
// import Index from "./Pages/Index";
// import HomePage from "./Pages/Home/HomePage";
// import CategoryPage from "./Pages/Home/CategoryPage";
// import Login from "./Pages/Home/LoginPage";
// import AdminPage from "./AdminPanel/Adminpage";
// import AdminPanel from "./AdminPanel/AdminPanel";
// import AddAdminForm from "./AdminPanel/AddAdminForm";
// import EventsPage from "./Pages/Home/EventsPage";
// import Signup from "./AdminPanel/SignUpPage";
// import PlacementPage from "./AdminPanel/PlacementPage";
// import HackathonPage from "./AdminPanel/Hackathon";
// import ViewUsers from "./AdminPanel/Users";
// import AnnouncementForm from "./AdminPanel/AnnouncementForm";
// import Footer from "./Pages/Home/Footer";
// import Loader from './Loader';

// function App() {
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem('token');
//       const isAdmin = localStorage.getItem('isAdmin') === 'true';
//       const isCEO = localStorage.getItem('isCEO') === 'true';

//       setIsAuthenticated(!!token);
//       if (isCEO) {
//         setUserRole('ceo');
//       } else if (isAdmin) {
//         setUserRole('admin');
//       } else {
//         setUserRole('user');
//       }
//     };

//     checkAuth();
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <Router>
//       <AppContent isAuthenticated={isAuthenticated} userRole={userRole} />
//     </Router>
//   );
// }

// function AppContent({ isAuthenticated, userRole }) {
//   const [pageLoading, setPageLoading] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     setPageLoading(true);
//     const timer = setTimeout(() => {
//       setPageLoading(false);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [location]);

//   if (pageLoading) {
//     return <Loader />;
//   }

//   const ProtectedRoute = ({ element, allowedRoles }) => {
//     if (!isAuthenticated) {
//       return <Navigate to="/Login" />;
//     }
//     if (allowedRoles && !allowedRoles.includes(userRole)) {
//       return <Navigate to="/" />;
//     }
//     return element;
//   };

//   return (
//     <div className="App">
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Index />} />
//         <Route path="/courses" element={<HomePage />} />
//         <Route path="/:slug" element={<CategoryPage />} />
//         <Route path="/Login" element={<Login />} />
//         <Route path="/Adminpage" element={<ProtectedRoute element={<AdminPage />} allowedRoles={['admin', 'ceo']} />} />
//         <Route path="/Admin" element={<ProtectedRoute element={<AdminPanel />} allowedRoles={['admin', 'ceo']} />} />
//         <Route path="/ceopanel" element={<ProtectedRoute element={<AddAdminForm />} allowedRoles={['ceo']} />} />
//         <Route path="/events" element={<EventsPage />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/placement" element={<ProtectedRoute element={<PlacementPage />} allowedRoles={['admin', 'ceo']} />} />
//         <Route path="/hackathon" element={<ProtectedRoute element={<HackathonPage />} allowedRoles={['admin', 'ceo']} />} />
//         <Route path="/user" element={<ViewUsers />} />
//         <Route path="/createAnnouncement" element={<ProtectedRoute element={<AnnouncementForm />} allowedRoles={['admin', 'ceo']} />} />
//       </Routes>
//       <Footer/>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Pages/Home/Navbar";
import Index from "./Pages/Index";
import HomePage from "./Pages/Home/HomePage";
import CategoryPage from "./Pages/Home/CategoryPage";
import Login from "./Pages/Home/LoginPage";
import AdminPage from "./AdminPanel/Adminpage";
import AdminPanel from "./AdminPanel/AdminPanel";
import AddAdminForm from "./AdminPanel/AddAdminForm";
import EventsPage from "./Pages/Home/EventsPage";
import Signup from "./AdminPanel/SignUpPage";
import PlacementPage from "./AdminPanel/PlacementPage";
import HackathonPage from "./AdminPanel/Hackathon";
import ViewUsers from "./AdminPanel/Users";
import AnnouncementForm from "./AdminPanel/AnnouncementForm";
import Footer from "./Pages/Home/Footer";
import Loader from './Loader';
import AboutUs from './Pages/Home/AboutUs';
import CareerPage from './Pages/CareerPage';
import Notification from './hooks/Notification';

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      const isCEO = localStorage.getItem('isCEO') === 'true';

      setIsAuthenticated(!!token);
      if (isCEO) {
        setUserRole('ceo');
      } else if (isAdmin) {
        setUserRole('admin');
      } else {
        setUserRole('user');
      }
    };

    checkAuth();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <AppContent isAuthenticated={isAuthenticated} userRole={userRole} />
    </Router>
  );
}

function AppContent({ isAuthenticated, userRole }) {
  const [pageLoading, setPageLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setPageLoading(true);
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [location]);

  if (pageLoading) {
    return <Loader />;
  }

  const ProtectedRoute = ({ element, allowedRoles }) => {
    if (!isAuthenticated) {
      return <Navigate to="/Login" />;
    }
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return <Navigate to="/" />;
    }
    return element;
  };

  return (
    <div className="App">
      <Navbar />
      <Notification/>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/courses" element={<HomePage />} />
        <Route path="/:slug" element={<CategoryPage />} />
        <Route path='/careers' element={<CareerPage/>}/>
        <Route path="/Login" element={<Login />} />
        <Route path='/about'element={<AboutUs/>}/>
        <Route path="/Adminpage" element={<ProtectedRoute element={<AdminPage />} allowedRoles={['admin', 'ceo']} />} />
        <Route path="/Admin" element={<ProtectedRoute element={<AdminPanel />} allowedRoles={['admin', 'ceo']} />} />
        <Route path="/ceopanel" element={<ProtectedRoute element={<AddAdminForm />} allowedRoles={['ceo']} />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/placement" element={<ProtectedRoute element={<PlacementPage />} allowedRoles={['admin', 'ceo']} />} />
        <Route path="/hackathon" element={<ProtectedRoute element={<HackathonPage />} allowedRoles={['admin', 'ceo']} />} />
        <Route path="/user" element={<ViewUsers />} />
        <Route path="/createAnnouncement" element={<ProtectedRoute element={<AnnouncementForm />} allowedRoles={['admin', 'ceo']} />} />
        {/* Add-Admin page, only accessible by CEO */}
        <Route path="/add-admin" element={<ProtectedRoute element={<AddAdminForm />} allowedRoles={['ceo']} />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;