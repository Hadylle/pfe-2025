// UserNavbar.jsx
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

const routeColors = {
  '/analyze': '#0091e3',
  '/improve': '#0091e3',
  '/match': '#0091e3',
  '/tailor': '#0091e3',
  '/build': '#0091e3',
  '/feedback': '#0091e3',
  '/storage': '#0091e3',
  '/login': '#3B82F6',
  '/': '#0091e3'
};

const UserNavbar = () => {
  const location = useLocation();
  const [bgColor, setBgColor] = useState(routeColors['/']);
  const { user, logout } = useAuth();

  useEffect(() => {
    setBgColor(routeColors[location.pathname] || '#3B82F6');
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.nav
      animate={{ backgroundColor: bgColor }}
      transition={{ duration: 0.6 }}
      className="text-white shadow-lg sticky top-0 z-50 w-full px-2"
    >
      <div className="max-w-full mx-auto">
        <div className="flex justify-between h-20 items-center">

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="text-2xl font-bold flex items-center">
              <FontAwesomeIcon icon={faBriefcase} style={{ color: "#ffffff" }} />
              <span className="hover:text-[#F3F4F6] transition-colors">HireMatch</span>
            </Link>
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center space-x-5 text-base font-medium">
            <Link to="/build" className="hover:text-[#F3F4F6] transition-colors px-2 py-1">Build CV</Link>
            <Link to="/match" className="hover:text-[#F3F4F6] transition-colors px-2 py-1">Match</Link>
            <Link to="/improve" className="hover:text-[#F3F4F6] transition-colors px-2 py-1">Improve CV</Link>
            <Link to="/tailor" className="hover:text-[#F3F4F6] transition-colors px-2 py-1">Tailor</Link>
            <Link to="/feedback" className="hover:text-[#F3F4F6] transition-colors px-2 py-1">Feedback</Link>
          </div>

          {/* Auth + Profile Icon */}
          <div className="flex items-center space-x-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="text-base font-medium hover:text-[#F3F4F6] transition-colors"
              >
                Log Out
              </button>
            ) : (
              <Link
                to="/login"
                className="text-base font-medium hover:text-[#F3F4F6] transition-colors"
              >
                Sign In
              </Link>
            )}

            {/* Profile Icon */}
            <Link to="/profile">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full p-1 hover:bg-white/20 transition"
                title="Profile"
              >
                <UserCircleIcon className="h-8 w-8 text-white" />
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default UserNavbar;
