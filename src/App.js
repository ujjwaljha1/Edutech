import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import PremiumMembership from './PremiumMembership';
import CouponGenerator from './CouponGenerator';
import PremiumContentManager from './PremiumContentManager';
import PremiumCategories from './PaidCategoryContent';
import ChatSystem from './Pages/Chat/ChatSystem';
import NoteAnnouncement from './Pages/NoteAnnouncement';

axios.defaults.withCredentials = true;

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

  // if (loading) {
  //   return <Loader />;
  // }

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

  // if (pageLoading) {
  //   return <Loader />;
  // }

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
      <NoteAnnouncement/>
      <Navbar />
      <Notification/>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/courses" element={<HomePage />} />
        <Route path="/:slug" element={<CategoryPage />} />
        <Route path='/careers' element={<CareerPage/>}/>
        <Route path="/Login" element={<Login />} />
        <Route path='/about' element={<AboutUs/>}/>
        <Route path="/Adminpage" element={<ProtectedRoute element={<AdminPage />} allowedRoles={['admin', 'ceo']} />} />
        <Route path="/Admin" element={<ProtectedRoute element={<AdminPanel />} allowedRoles={['admin', 'ceo']} />} />
        <Route path="/ceopanel" element={<ProtectedRoute element={<AddAdminForm />} allowedRoles={['ceo']} />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/placement" element={<ProtectedRoute element={<PlacementPage />} allowedRoles={['admin', 'ceo']} />} />
        <Route path="/hackathon" element={<ProtectedRoute element={<HackathonPage />} allowedRoles={['admin', 'ceo']} />} />
        <Route path="/user" element={<ViewUsers />} />
        <Route path="/createAnnouncement" element={<ProtectedRoute element={<AnnouncementForm />} allowedRoles={['admin', 'ceo']} />} />
        <Route path="/add-admin" element={<ProtectedRoute element={<AddAdminForm />} allowedRoles={['ceo']} />} />
        <Route path="/premium-membership" element={<PremiumMembership/>} />
        <Route path="/my-course" element={<PremiumCategories/>}/>
        <Route path="/coupon-generator" element={<CouponGenerator/>} />
        <Route path="/premium-content-manager" element={<PremiumContentManager/>} />
      </Routes>
      <Footer/>
      <ChatSystem userRole={userRole} />
    </div>
  );
}

export default App;