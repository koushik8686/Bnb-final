import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

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
        Cookies.set('company', response.data.company);
        navigate('/teamleads/dashboard');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        setError(`Login failed: ${error.response.data.message || 'Unknown error'}`);
      } else {
        console.error('Error:', error.message);
        setError('Login failed. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginCard}>
        <h2 style={styles.loginTitle}>Team Leader Login</h2>
        <form onSubmit={handleSubmit} style={styles.loginForm}>
          <div style={styles.formGroup}>
            <label htmlFor="TeamCode" style={styles.label}>Team Code</label>
            <input
              id="TeamCode"
              name="TeamCode"
              type="text"
              value={formData.TeamCode}
              onChange={handleChange}
              required
              placeholder="Enter team code"
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
              style={styles.input}
            />
          </div>

          {error && (
            <div style={styles.errorMessage}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            style={loading ? {...styles.submitButton, ...styles.submitButtonDisabled} : styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
      <div style={styles.squidMask}></div>
    </div>
  );
};

const styles = {
  loginContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a2e',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  },
  loginCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
    width: '100%',
    maxWidth: '400px',
    backdropFilter: 'blur(10px)',
    border: '2px solid #e60000',
    zIndex: 2,
  },
  loginTitle: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#e60000',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#ffffff',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
  },
  input: {
    padding: '0.75rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid #e60000',
    borderRadius: '4px',
    fontSize: '1rem',
    width: '100%',
    color: '#ffffff',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  errorMessage: {
    backgroundColor: 'rgba(220, 38, 38, 0.8)',
    color: '#ffffff',
    padding: '0.75rem',
    borderRadius: '4px',
    fontSize: '0.875rem',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  submitButton: {
    backgroundColor: '#e60000',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '4px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    fontSize: '1rem',
    transition: 'background-color 0.3s, transform 0.1s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
  },
  submitButtonDisabled: {
    backgroundColor: '#7f1d1d',
    cursor: 'not-allowed',
    opacity: 0.7,
  },
  squidMask: {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ffueVFwDYpCC7itHWjdUO4xU5vqAURw3HQ&s")',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    opacity: 0.1,
    zIndex: 1,
    animation: 'rotate 60s linear infinite',
  },
  '@keyframes rotate': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
};

export default TeamleadsLogin;