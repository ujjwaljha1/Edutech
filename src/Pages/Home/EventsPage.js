
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FaMapMarkerAlt, FaBuilding, FaCode, FaFilter, FaGraduationCap, FaBriefcase, FaGlobe, FaSearch, FaTimes } from 'react-icons/fa';
import EventDetails from '../../AdminPanel/EventDetails'
import { useMediaQuery } from 'react-responsive';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import config from '../../Config'
import Loader from '../../Loader';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState('hackathons');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    jobType: '',
    jobLocation: '',
    eventType: '',
    graduationYear: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const containerRef = useRef(null);

  useEffect(() => {
    fetchEvents();
  }, [activeTab]);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${config.backendUrl}/api/${activeTab}`);
      setEvents(response.data);
    } catch (error) {
      console.error(`Error fetching ${activeTab}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterName]: value }));
  };

  const filteredEvents = events.filter(event => {
    const searchableText = activeTab === 'hackathons' 
      ? `${event.instituteOrCompany || ''} ${event.description || ''}`
      : `${event.companyName || ''} ${event.jobTitle || ''} ${event.description || ''}`;
    
    const matchesSearch = searchableText.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesJobType = activeTab === 'placements' ? (filters.jobType === '' || event.jobType === filters.jobType) : true;
    const matchesJobLocation = activeTab === 'placements' ? (filters.jobLocation === '' || event.jobLocation === filters.jobLocation) : true;
    const matchesEventType = activeTab === 'hackathons' ? (filters.eventType === '' || event.eventType === filters.eventType) : true;
    const matchesGraduationYear = filters.graduationYear === '' || event.graduationYear === filters.graduationYear;

    return matchesSearch && matchesJobType && matchesJobLocation && matchesEventType && matchesGraduationYear;
  });

  const renderFilterOptions = () => (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {activeTab === 'placements' && (
          <>
            <motion.select
              whileTap={{ scale: 0.95 }}
              className="p-2 border rounded bg-[#FEF3E2] text-[#8B4513]"
              value={filters.jobType}
              onChange={(e) => handleFilterChange('jobType', e.target.value)}
            >
              <option value="">All Job Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
            </motion.select>
            <motion.select
              whileTap={{ scale: 0.95 }}
              className="p-2 border rounded bg-[#FEF3E2] text-[#8B4513]"
              value={filters.jobLocation}
              onChange={(e) => handleFilterChange('jobLocation', e.target.value)}
            >
              <option value="">All Locations</option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </motion.select>
          </>
        )}
        {activeTab === 'hackathons' && (
          <motion.select
            whileTap={{ scale: 0.95 }}
            className="p-2 border rounded bg-[#FEF3E2] text-[#8B4513]"
            value={filters.eventType}
            onChange={(e) => handleFilterChange('eventType', e.target.value)}
          >
            <option value="">All Event Types</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </motion.select>
        )}
        <motion.select
          whileTap={{ scale: 0.95 }}
          className="p-2 border rounded bg-[#FEF3E2] text-[#8B4513]"
          value={filters.graduationYear}
          onChange={(e) => handleFilterChange('graduationYear', e.target.value)}
        >
          <option value="">All Graduation Years</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </motion.select>
      </div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <Loader/>
      
    );
  }

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        lerp: 0.1,
        multiplier: 1,
        smartphone: {
          smooth: true
        },
        tablet: {
          smooth: true
        }
      }}
      containerRef={containerRef}
    >
      <div className="flex h-screen bg-[#FEF3E2]" data-scroll-container ref={containerRef}>
        {/* Sidebar */}
        <motion.div
          className={`${
            sidebarOpen ? 'w-full md:w-1/3' : 'w-0'
          } bg-white shadow-lg overflow-hidden transition-all duration-300`}
          initial={{ x: isMobile ? -300 : 0 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 120, damping: 20 }}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-[#8B4513]">Events</h2>
              {isMobile && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSidebarOpen(false)}
                  className="text-[#8B4513]"
                >
                  <FaTimes size={24} />
                </motion.button>
              )}
            </div>
            <div className="flex mb-6 space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 py-3 rounded-lg transition-colors ${
                  activeTab === 'hackathons' ? 'bg-[#8B4513] text-white' : 'bg-[#FEF3E2] text-[#8B4513] hover:bg-[#F4DEB3]'
                }`}
                onClick={() => setActiveTab('hackathons')}
              >
                <FaCode className="inline mr-2" /> Hackathons
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 py-3 rounded-lg transition-colors ${
                  activeTab === 'placements' ? 'bg-[#8B4513] text-white' : 'bg-[#FEF3E2] text-[#8B4513] hover:bg-[#F4DEB3]'
                }`}
                onClick={() => setActiveTab('placements')}
              >
                <FaBuilding className="inline mr-2" /> Placements
              </motion.button>
            </div>
            <div className="flex mb-4">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                placeholder="Search events..."
                className="flex-1 p-3 border border-[#8B4513] rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513] bg-[#FEF3E2] text-[#8B4513]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#8B4513] text-white p-3 rounded-r-lg hover:bg-[#6B3E0A] transition-colors"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? <FaTimes /> : <FaFilter />}
              </motion.button>
            </div>
            {renderFilterOptions()}
            <ul className="space-y-4 overflow-y-auto max-h-[calc(100vh-380px)]">
              <AnimatePresence>
                {filteredEvents.map((event) => (
                  <motion.li
                    key={event._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left p-4 rounded-lg transition-colors ${
                        selectedEvent && selectedEvent._id === event._id
                          ? 'bg-[#F4DEB3] border-2 border-[#8B4513]'
                          : 'bg-white hover:bg-[#FEF3E2] border border-[#8B4513]'
                      }`}
                      onClick={() => handleEventClick(event)}
                    >
                      <h3 className="font-bold text-lg text-[#8B4513] mb-2">
                        {activeTab === 'hackathons' ? (event.instituteOrCompany || 'Untitled Event') : (event.jobTitle || 'Untitled Job')}
                      </h3>
                      <p className="text-[#6B3E0A] mb-1">
                        <FaBuilding className="inline mr-2" />
                        {activeTab === 'hackathons' ? (event.instituteOrCompany || 'Unknown Organization') : (event.companyName || 'Unknown Company')}
                      </p>
                      {activeTab === 'placements' && (
                        <>
                          <p className="text-[#8B4513] text-sm mb-1">
                            <FaBriefcase className="inline mr-2" />
                            {event.jobType || 'Job Type Not Specified'}
                          </p>
                          <p className="text-[#8B4513] text-sm mb-1">
                            <FaMapMarkerAlt className="inline mr-2" />
                            {event.jobLocation || 'Location Not Specified'}
                          </p>
                        </>
                      )}
                      {activeTab === 'hackathons' && (
                        <p className="text-[#8B4513] text-sm mb-1">
                          <FaGlobe className="inline mr-2" />
                          {event.eventType || 'Event Type Not Specified'}
                        </p>
                      )}
                      <p className="text-[#8B4513] text-sm">
                        <FaGraduationCap className="inline mr-2" />
                        Graduation Year: {event.graduationYear || 'Not Specified'}
                      </p>
                    </motion.button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="flex-1 p-8 overflow-y-auto" data-scroll-section>
          {isMobile && !sidebarOpen && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSidebarOpen(true)}
              className="mb-4 text-[#8B4513]"
            >
              <FaFilter size={24} />
            </motion.button>
          )}
          <AnimatePresence mode="wait">
            {selectedEvent ? (
              <motion.div
                key={selectedEvent._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                data-scroll
                data-scroll-speed="1"
              >
                <EventDetails event={selectedEvent} eventType={activeTab} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-full"
                data-scroll
                data-scroll-speed="1"
              >
                <p className="text-2xl text-[#8B4513]">Select an event to view details</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </LocomotiveScrollProvider>
  );
};

export default EventsPage;