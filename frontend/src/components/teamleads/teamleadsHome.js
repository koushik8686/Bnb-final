import React from 'react';
import { useNavigate } from 'react-router-dom';
import './teamleadsHome.css';

const Home = () => {
  const navigate = useNavigate();
  const teamCode = localStorage.getItem('teamCode');

  React.useEffect(() => {
    if (!teamCode) {
      navigate('/teamleads/login');
    }
  }, [teamCode, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('teamCode');
    navigate('/teamleads/login');
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome Team {teamCode}</h1>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      {/* Add your dashboard content here */}
    </div>
  );
};

export default Home;