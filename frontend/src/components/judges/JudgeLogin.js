import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { motion, useAnimation } from 'framer-motion';

const JudgeLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const controls = useAnimation();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/judge/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set('Judge', data.id);
        navigate('/judges/home'); // Navigate to the judges home page
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error occurred');
    }
  };

  // Animation controls for tug of war effect
  useEffect(() => {
    const startAnimation = () => {
      controls.start({
        x: ['-10%', '10%'],
        transition: {
          duration: 1,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        },
      });
    };
    startAnimation();
  }, [controls]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative">
      <motion.div
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="max-w-md w-full space-y-8 p-8 bg-pink-600 rounded-xl shadow-lg relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <div className="relative z-10">
          <motion.h2
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-center text-white mb-8"
          >
            Judge Login
          </motion.h2>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white text-center bg-red-500 p-2 rounded-md mb-4"
            >
              {error}
            </motion.div>
          )}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-pink-700 border border-pink-300 rounded-md shadow-sm text-white placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="Enter your email"
                />
              </motion.div>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-pink-700 border border-pink-300 rounded-md shadow-sm text-white placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="Enter your password"
                />
              </motion.div>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Sign In
            </motion.button>
          </form>
        </div>

        {/* Tug of war effect with ropes */}
        <motion.div
          className="absolute -bottom-16 left-0 w-64 h-10 bg-blue-500"
          animate={controls}
        />
        <motion.div
          className="absolute -bottom-16 right-0 w-64 h-10 bg-blue-500"
          animate={controls}
        />
      </motion.div>
    </div>
  );
};

export default JudgeLogin;
