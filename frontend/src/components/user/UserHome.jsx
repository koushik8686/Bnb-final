import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const FOOTER_HEIGHT = '120px';

const UserHome = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [gamesVisible, setGamesVisible] = useState(false);
  const [advertisements, setAdvertisements] = useState([]);

  const fetchAdvertisements = async () => {
    try {
      const response = await axios.get('http://localhost:4000/advertisement/all');
      setAdvertisements(response.data);
    } catch (err) {
      console.error('Error fetching advertisements:', err);
      setError('Failed to fetch advertisements');
    }
  };

  useEffect(() => {
    fetchAdvertisements();
    const interval = setInterval(fetchAdvertisements, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLogoClick = async (id, companyLink) => {
    try {
      await axios.post(`http://localhost:4000/advertisement/Clickup/${id}`);
      window.open(companyLink, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Error sending count request:', err);
    }
  };

  const fetchUserDetails = async () => {
    const userId = Cookies.get('authToken');
    if (!userId) {
      setError('User ID not found');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:4000/user/getuserdetails/${userId}`);
      setUserDetails(response.data);
      setDetailsVisible(true);
      setGamesVisible(false);
    } catch (err) {
      console.error('Error fetching user details:', err);
      setError('Failed to fetch user details');
    }
  };

  const fetchUserGames = async () => {
    const userId = Cookies.get('authToken');
    if (!userId) {
      setError('User ID not found');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:4000/user/getusergames/${userId}`);
      setGames(response.data);
      setGamesVisible(true);
      setDetailsVisible(false);
    } catch (err) {
      console.error('Error fetching user games:', err);
      setError('Failed to fetch user games');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserGames();
      await fetchUserDetails();
      await fetchAdvertisements();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div style={styles.loadingScreen}>Loading...</div>;
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.contentWrapper}>
        <nav style={styles.navBar}>
          <div style={styles.profileIcon} onClick={fetchUserDetails}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <button onClick={fetchUserGames} style={styles.navItem}>My Games</button>
          <a href="/user/chat" style={styles.navItem}>Chat</a>
          <a href="/user/certs" style={styles.navItem}>Certificates</a>
        </nav>

        <main style={styles.mainContent}>
          {error && <p style={styles.error}>{error}</p>}

          {detailsVisible && userDetails && (
            <div style={styles.detailsCard}>
              <h2 style={styles.cardTitle}>User Details</h2>
              <p><strong>Unique Code:</strong> {userDetails.uniquecode}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>Age:</strong> {userDetails.age}</p>

              <h3 style={styles.subTitle}>Points:</h3>
              {userDetails.points && userDetails.points.length > 0 ? (
                <ul style={styles.pointsList}>
                  {userDetails.points.map((point, index) => (
                    <li key={index}>
                      {point.game}: {point.points} points
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No points available.</p>
              )}
            </div>
          )}

          {gamesVisible && (
            <div>
              <h3 style={styles.sectionTitle}>Your Games:</h3>
              <ul style={styles.gamesList}>
                {games.map((game, index) => (
                  <li key={index} style={styles.gameItem}>
                    <h4 style={styles.gameTitle}>{game.eventname}</h4>
                    <p><strong>Location:</strong> {game.Location}</p>
                    <p><strong>Number of Players:</strong> {game.number_of_players}</p>
                    <p><strong>Start Time:</strong> {new Date(game.start_time).toLocaleString()}</p>
                    <p><strong>End Time:</strong> {new Date(game.end_time).toLocaleString()}</p>
                    <p><strong>Status:</strong> {game.status}</p>
                    <p><strong>Single Player:</strong> {game.singleplayer ? "Yes" : "No"}</p>
                    <p><strong>Multiplayer:</strong> {game.multiplayer ? "Yes" : "No"}</p>

                    <h5 style={styles.subTitle}>Judges:</h5>
                    <ul style={styles.subList}>
                      {game.judges.map((judge, judgeIndex) => (
                        <li key={judgeIndex}>{judge.name}</li>
                      ))}
                    </ul>

                    <h5 style={styles.subTitle}>Teams:</h5>
                    <ul style={styles.teamsList}>
                      {game.teams.map((team, teamIndex) => (
                        <li key={teamIndex} style={styles.teamItem}>
                          <p><strong>Team Nickname:</strong> {team.teamNickname}</p>
                          <p><strong>Corporate Code:</strong> {team.corporatecode}</p>
                          <p><strong>Points:</strong> {team.points}</p>
                          <h6 style={styles.playerTitle}>Players:</h6>
                          <ul style={styles.playersList}>
                            {team.players.map((player, playerIndex) => (
                              <li key={playerIndex}>
                                {player.id} (Unique Code: {player.uniquecode})
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
      </div>

      <footer style={styles.footer}>
        {advertisements && (
          <div style={styles.advertisementContainer}>
            <h1 style={styles.advertTitle}>{advertisements.adverCompanyName}</h1>
            <div 
              onClick={() => handleLogoClick(advertisements.adverCompanyId, advertisements.companyLink)}
              style={styles.advertLogo}
            >
              <img 
                src={advertisements.adverCompanyLogoUrl} 
                alt={advertisements.adverCompanyName}
                style={styles.advertImage}
              />
            </div>
          </div>
        )}
      </footer>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    backgroundColor: '#1a1a2e',
    color: '#ffffff',
    position: 'relative',
  },
  contentWrapper: {
    display: 'flex',
    paddingBottom: FOOTER_HEIGHT,
  },
  loadingScreen: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#1a1a2e',
    color: '#ffffff',
  },
  navBar: {
    width: '200px',
    backgroundColor: '#e60000',
    padding: '20px',
    height: '100vh',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileIcon: {
    width: '60px',
    height: '60px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    cursor: 'pointer',
  },
  navItem: {
    cursor: 'pointer',
    margin: '10px 0',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ffffff',
    fontSize: '16px',
    textAlign: 'left',
    width: '100%',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    marginLeft: '200px',
  },
  error: {
    backgroundColor: '#ff4d4d',
    color: '#ffffff',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '15px',
  },
  detailsCard: {
    backgroundColor: '#0f0f1a',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  cardTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#e60000',
  },
  subTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '16px',
    marginBottom: '8px',
    color: '#e60000',
  },
  pointsList: {
    listStyleType: 'disc',
    paddingLeft: '20px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#e60000',
  },
  gamesList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  gameItem: {
    backgroundColor: '#0f0f1a',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  gameTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#e60000',
  },
  subList: {
    listStyleType: 'disc',
    paddingLeft: '20px',
  },
  teamsList: {
    listStyle: 'none',
    padding: 0,
  },
  teamItem: {
    backgroundColor: '#1a1a2e',
    padding: '16px',
    borderRadius: '4px',
    marginBottom: '12px',
  },
  playerTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '12px',
    marginBottom: '8px',
  },
  playersList: {
    listStyleType: 'disc',
    paddingLeft: '20px',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: FOOTER_HEIGHT,
    backgroundColor: '#0f0f1a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  advertisementContainer: {
    textAlign: 'center',
  },
  advertTitle: {
    fontSize: '24px',
    marginBottom: '12px',
    color: '#ffffff',
  },
  advertLogo: {
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
  },
  advertImage: {
    width: '50px',
    height: '50px',
  },
};

export default UserHome;