import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(`http://localhost:4000/admin/login`, { email, password });
      Cookies.set('admin', data.userId);
      navigate('/admin/home');
    } catch (error) {
      alert('Invalid email or password. Please try again.');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1,
    }));

    let animationFrameId;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 151, 153, 0.5)';
        ctx.fill();
      });
    }

    animate();

    const admin = Cookies.get('admin');
    if (admin) navigate('/admin/home');

    return () => cancelAnimationFrame(animationFrameId);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] p-4 relative">
      <canvas id="bgCanvas" className="absolute top-0 left-0 w-full h-full" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="rounded-2xl overflow-hidden shadow-2xl bg-white">
          <div className="bg-[#229799] p-8 text-white">
            <h2 className="text-4xl font-bold text-center mb-2">Welcome Back</h2>
            <p className="text-center text-[#F5F5F5]">Log in to your account</p>
          </div>
          <div className="p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-[#424242]">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    className="mt-1 block w-full pl-10 pr-4 py-3 bg-[#F5F5F5] border border-[#48CFCB] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#229799] focus:border-transparent text-[#424242] placeholder-[#424242]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#229799]" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-[#424242]">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="mt-1 block w-full pl-10 pr-10 py-3 bg-[#F5F5F5] border border-[#48CFCB] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#229799] focus:border-transparent text-[#424242] placeholder-[#424242]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                  />
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#229799]" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#229799]"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              <button
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#229799] hover:bg-[#48CFCB] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#48CFCB] transition-colors duration-200"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
