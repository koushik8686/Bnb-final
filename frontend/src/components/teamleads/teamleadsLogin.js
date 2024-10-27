import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './teamleadsLogin.css';
import Cookies from 'js-cookie'

const TeamleadsLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    TeamCode: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/teamleads/login', formData);
      
      if (response.data) {
       Cookies.set('company' , response.data.company)
        // Use get() to retrieve from FormData
        navigate('/teamleads/dashboard');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      // Log error details
      if (error.response) {
        console.error('Error response:', error.response.data);
        setError(`Login failed: ${error.response.data.message || 'Unknown error'}`);
      } else {
        console.error('Error:', error.message);
        setError('Login failed. Please try again later.');
      }
    }
    
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Team Leader Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="TeamCode">Team Code</label>
            <input
              id="TeamCode"
              name="TeamCode"
              type="text"
              value={formData.TeamCode}
              onChange={handleChange}
              required
              placeholder="Enter team code"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
              className="form-input"
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeamleadsLogin;