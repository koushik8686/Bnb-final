import React from 'react';
import { useNavigate } from 'react-router-dom';
import './teamleadsHome.css';
import Cookies from 'js-cookie'

const Home = () => {
  const navigate = useNavigate();
  const teamCode = Cookies.get('company');

  React.useEffect(() => {
    if (!teamCode) {
      navigate('/teamleads/login');
    }
  }, [teamCode, navigate]);

  const handleLogout = () => {
    Cookies.remove('company');
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