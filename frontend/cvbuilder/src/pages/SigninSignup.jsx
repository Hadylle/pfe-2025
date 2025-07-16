import { useState } from 'react';
import { useSignIn, useSignUp } from '../api/useAuth';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import cvAnimation from '../assets/cvAnimation.json';
import { motion } from 'framer-motion';

const SignInSignUpPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const navigate = useNavigate();

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
        navigate('/home'); // token is already handled in the hook
      },
      onError: (error) => {
        console.error('❌ Auth error:', error.response?.data || error.message);
        alert("Authentication failed.");
      },
    });
  };

  const benefits = [
    { title: "Smart CV Analysis", desc: "Get structure & content insights" },
    { title: "Job Matching", desc: "Match percentage & missing skills" },
    { title: "PDF Export", desc: "Download polished, ATS-ready CVs" },
  ];

  const [slide, setSlide] = useState(0);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left */}
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

      {/* Right */}
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

          <form className="space-y-5" onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input name="firstName" type="text" value={formData.firstName} onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input name="lastName" type="text" value={formData.lastName} onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input name="password" type="password" value={formData.password} onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            )}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              {isSignUp ? "Create Account" : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            {isSignUp ? (
              <>Already have an account?{" "}
                <button onClick={() => setIsSignUp(false)} className="text-blue-600 font-medium underline">Sign In</button>
              </>
            ) : (
              <>Don’t have an account?{" "}
                <button onClick={() => setIsSignUp(true)} className="text-blue-600 font-medium underline">Sign Up</button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignInSignUpPage;
