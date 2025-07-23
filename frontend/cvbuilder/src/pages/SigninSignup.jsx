// src/pages/SigninSignup.js
import { useState } from 'react';
import { useSignIn, useSignUp } from '../api/useAuth';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import cvAnimation from '../assets/cvAnimation.json';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const SignInSignUpPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();
 const { login } = useAuth();

  const signInMutation = useSignIn();
  const signUpMutation = useSignUp();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const payload = isSignUp
      ? {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }
      : {
          email: formData.email,
          password: formData.password,
        };

    const mutation = isSignUp ? signUpMutation : signInMutation;

    mutation.mutate(payload, {
      onSuccess: (data) => {
        console.log('✅ Auth success', data);
   login(data.token, data.role);
  navigate(data.role === 'ADMIN' ? '/' : '/');      },
      onError: (error) => {
        console.error('❌ Auth error:', error.response?.data || error.message);
        alert(error.response?.data?.message || "Authentication failed.");
      },
    });
  };

  const benefits = [
    { title: "Smart CV Analysis", desc: "Get structure & content insights" },
    { title: "Job Matching", desc: "Match percentage & missing skills" },
    { title: "PDF Export", desc: "Download polished, ATS-ready CVs" },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full lg:w-1/2 bg-blue-50 flex flex-col items-center justify-center px-8 py-12 text-center"
      >
        <Lottie animationData={cvAnimation} loop className="w-3/4 max-w-md mb-6" />
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-2">{benefits[slide].title}</h2>
          <p className="text-gray-600 mb-4">{benefits[slide].desc}</p>
          <div className="flex justify-center space-x-2">
            {benefits.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`w-3 h-3 rounded-full transition ${
                  i === slide ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Section - Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 bg-white"
      >
        <div className="w-full max-w-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            {isSignUp ? "Sign Up to CVAI" : "Welcome Back"}
          </h3>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  minLength={6}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={signInMutation.isLoading || signUpMutation.isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-70"
            >
              {isSignUp 
                ? (signUpMutation.isLoading ? 'Creating Account...' : 'Sign Up')
                : (signInMutation.isLoading ? 'Signing In...' : 'Sign In')}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignInSignUpPage;