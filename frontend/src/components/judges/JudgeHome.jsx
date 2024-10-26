import React, { useState, useEffect } from 'react';

const colors = {
  primary: '#4a90e2',
  secondary: '#50e3c2',
  background: '#f5f7fa',
  text: '#333',
  cardBg: '#ffffff',
  success: '#5cb85c',
  warning: '#f0ad4e'
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: colors.background,
    minHeight: '100vh',
  },
  header: {
    fontSize: '2.5rem',
    color: colors.primary,
    marginBottom: '2rem',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease',
  },
  cardHover: {
    transform: 'translateY(-5px)',
  },
  cardHeader: {
    backgroundColor: colors.primary,
    color: colors.cardBg,
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
  },
  badge: {
    display: 'inline-block',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  button: {
    backgroundColor: colors.secondary,
    color: colors.text,
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    width: '100%',
  },
  buttonHover: {
    backgroundColor: colors.primary,
    color: colors.cardBg,
  },
};

export default function JudgeHome() {
  const [games, setGames] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

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
          singleplayer: true,
          multiplayer: false,
          Date: '2023-07-15',
          start_time: '2023-07-15T10:00:00',
          end_time: '2023-07-15T18:00:00',
          status: 'In Progress',
          Location: 'Main Hall',
          number_of_players: 16,
          teams: [
            { corporatecode: 'CORP1', teamNickname: 'Chess Masters' },
            { corporatecode: 'CORP2', teamNickname: 'Knight Riders' },
          ],
        },
        {
          _id: '2',
          eventname: 'Debate Competition',
          singleplayer: false,
          multiplayer: true,
          Date: '2023-07-16',
          start_time: '2023-07-16T14:00:00',
          end_time: '2023-07-16T17:00:00',
          status: 'Upcoming',
          Location: 'Auditorium',
          number_of_players: 12,
          teams: [
            { corporatecode: 'CORP3', teamNickname: 'Wordsmiths' },
            { corporatecode: 'CORP4', teamNickname: 'Eloquent Speakers' },
          ],
        },
        {
          _id: '3',
          eventname: 'Coding Challenge',
          singleplayer: true,
          multiplayer: false,
          Date: '2023-07-17',
          start_time: '2023-07-17T09:00:00',
          end_time: '2023-07-17T13:00:00',
          status: 'Completed',
          Location: 'Tech Lab',
          number_of_players: 20,
          teams: [
            { corporatecode: 'CORP5', teamNickname: 'Code Ninjas' },
            { corporatecode: 'CORP6', teamNickname: 'Binary Bosses' },
          ],
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
      <h1 style={styles.header}>My Games as Judge</h1>
      <div style={styles.grid}>
        {games.map((game) => (
          <div
            key={game._id}
            style={{
              ...styles.card,
              ...(hoveredCard === game._id ? styles.cardHover : {}),
            }}
            onMouseEnter={() => setHoveredCard(game._id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={styles.cardHeader}>
              <div>{game.eventname}</div>
              <div
                style={{
                  ...styles.badge,
                  backgroundColor:
                    game.status === 'In Progress'
                      ? colors.success
                      : game.status === 'Upcoming'
                      ? colors.warning
                      : colors.secondary,
                  color: colors.cardBg,
                }}
              >
                {game.status}
              </div>
            </div>
            <div style={styles.cardContent}>
              <p>
                <strong>Date:</strong> {new Date(game.Date).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong>{' '}
                {`${new Date(game.start_time).toLocaleTimeString()} - ${new Date(
                  game.end_time
                ).toLocaleTimeString()}`}
              </p>
              <p>
                <strong>Location:</strong> {game.Location}
              </p>
              <p>
                <strong>Players:</strong> {game.number_of_players}
              </p>
              <p>
                <strong>Teams:</strong> {game.teams.length}
              </p>
              <ul>
                {game.teams.map((team) => (
                  <li key={team.corporatecode}>
                    {team.teamNickname} ({team.corporatecode})
                  </li>
                ))}
              </ul>
            </div>
            <div style={styles.cardFooter}>
              <button
                onClick={() => handleGiveJudgment(game._id)}
                style={{
                  ...styles.button,
                  ...(hoveredButton === game._id ? styles.buttonHover : {}),
                }}
                onMouseEnter={() => setHoveredButton(game._id)}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Give Judgment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}