import React, { useState, useEffect } from 'react';

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
};

export default function JudgeHome() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Fetch games for the current judge
    // This is a placeholder. Replace with actual API call
    const fetchGames = async () => {
      // const response = await fetch('/api/judge/games');
      // const data = await response.json();
      // setGames(data);

      // Placeholder data
      setGames([
        {
          _id: '1',
          eventname: 'Chess Tournament',
          description: 'Annual chess championship for corporate teams',
          status: 'In Progress',
          amount: 250000,
          Location: 'Main Hall',
          number_of_players: 16,
        },
        {
          _id: '2',
          eventname: 'Debate Competition',
          description: 'Inter-corporate debate on business ethics',
          status: 'Upcoming',
          amount: 300000,
          Location: 'Auditorium',
          number_of_players: 12,
        },
        {
          _id: '3',
          eventname: 'Coding Challenge',
          description: 'Hackathon for innovative tech solutions',
          status: 'Completed',
          amount: 400000,
          Location: 'Tech Lab',
          number_of_players: 20,
        },
        {
          _id: '4',
          eventname: 'Business Case Study',
          description: 'Analysis and presentation of real-world business scenarios',
          status: 'Applied',
          amount: 500000,
          Location: 'Conference Center',
          number_of_players: 8,
        },
      ]);
    };

    fetchGames();
  }, []);

  const handleGiveJudgment = (gameId) => {
    // Implement judgment logic here
    console.log(`Give judgment for game ${gameId}`);
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
                <p><strong>Participants:</strong> {game.number_of_players}</p>
              </div>
              <div style={styles.cardFooter}>
                <div style={styles.amount}>${game.amount.toLocaleString()}</div>
                <div
                  style={{
                    ...styles.badge,
                    backgroundColor:
                      game.status === 'In Progress'
                        ? colors.success
                        : game.status === 'Upcoming'
                        ? colors.warning
                        : game.status === 'Completed'
                        ? colors.secondary
                        : colors.primary,
                    color: '#ffffff',
                  }}
                >
                  {game.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}