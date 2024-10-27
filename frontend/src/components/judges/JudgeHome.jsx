import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const colors = {
  primary: '#1e3a8a',
  secondary: '#3b82f6',
  background: '#f3f4f6',
  text: '#1f2937',
  cardBg: '#ffffff',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
};

const styles = {
  container: {
    backgroundColor: colors.background,
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    backgroundColor: colors.primary,
    color: '#ffffff',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: '1rem',
  },
  navItem: {
    color: '#ffffff',
    textDecoration: 'none',
  },
  logoutButton: {
    backgroundColor: colors.danger,
    color: '#ffffff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    cursor: 'pointer',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  pageTitle: {
    fontSize: '2rem',
    color: colors.text,
    marginBottom: '1rem',
  },
  applyButton: {
    backgroundColor: colors.success,
    color: '#ffffff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    float: 'right',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
  },
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: colors.secondary,
    color: '#ffffff',
    padding: '1rem',
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  cardContent: {
    padding: '1rem',
  },
  cardFooter: {
    padding: '1rem',
    borderTop: `1px solid ${colors.background}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    display: 'inline-block',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  amount: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: colors.primary,
  },
  dropdown: {
    marginTop: '1rem',
  },
  judgeButton: {
    backgroundColor: colors.secondary,
    color: '#ffffff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
};

export default function JudgeHome() {
const navigate = useNavigate()
    const [games, setGames] = useState([]);
  const judgeid = Cookies.get('Judge');

  useEffect(() => {
    // Fetch games for the current judge
    const fetchGames = async () => {
      try {
        const response = await fetch(`http://localhost:4000/judge/getgames/${judgeid}`); // Adjust the endpoint as needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, [judgeid]);

  const handleGiveJudgment = (gameId) => {
    // Implement judgment logic here
    console.log(`Give judgment for game ${gameId}`);
  };

  const navigateToGame = (gameId) => {
   navigate(`/judge/${gameId}`); // Navigate to the game page
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>JudgeX</div>
        <nav style={styles.nav}>
          <a href="#" style={styles.navItem}>Dashboard</a>
          <a href="#" style={styles.navItem}>Events</a>
          <a href="#" style={styles.navItem}>Profile</a>
        </nav>
        <button style={styles.logoutButton}>Log Out</button>
      </header>
      <main style={styles.main}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={styles.pageTitle}>Event Judging Portal</h1>
          <button style={styles.applyButton}>Apply for Event</button>
        </div>
        <div style={styles.grid}>
          {games.map((game) => (
            <div key={game._id} style={styles.card}>
              <div style={styles.cardHeader}>{game.eventname}</div>
              <div style={styles.cardContent}>
                <p>{game.description}</p>
                <p><strong>Location:</strong> {game.Location}</p>
                <p><strong>Participants:</strong></p>             
                  <button 
                    style={styles.judgeButton} 
                    onClick={() => navigateToGame(game._id)}
                  >
                    Judge this game
                  </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
