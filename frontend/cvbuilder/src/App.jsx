import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import AdminNavbar from './components/dashboard/AdminNavbar';
import UserNavbar from './components/UserNavbar';
import Sidebar from './components/dashboard/Sidebar';

import SignInSignUpPage from './pages/SigninSignup';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Analytics from './pages/admin/Analytics';

import Home from './pages/home';
import BuildResume from './pages/build-resume';
import CvMatchingPage from './pages/cv-matching';
import CvTailoringPage from './pages/cv-tailoring';
import CvFeedbackPage from './pages/cv-feedback';
import CvImprovePage from './pages/cv-improve';
import ProfilePage from './pages/ProfilePage';
import ProgressBarOverlay from './components/ProgressBarOverlay';
import Footer from './components/footer';

function App() {
  const { user, loading } = useAuth();
  console.log('App user:', user, 'loading:', loading);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      {!user ? (
        <Routes>
          <Route path="/login" element={<SignInSignUpPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : user.role === 'ADMIN' ? (
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <AdminNavbar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <>
          <UserNavbar />
          <ProgressBarOverlay />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/build" element={<BuildResume />} />
            <Route path="/match" element={<CvMatchingPage />} />
            <Route path="/tailor" element={<CvTailoringPage />} />
            <Route path="/improve" element={<CvImprovePage />} />
            <Route path="/feedback" element={<CvFeedbackPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer/>
        </>
      )}
    </Router>
  );
}

export default App;
