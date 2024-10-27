import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

const FOOTER_HEIGHT = '120px'; // Defining a constant for footer height

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
            console.log("Fetching Advertisements");
            const response = await axios.get('http://localhost:4000/advertisement/all');
            console.log(response.data);
            setAdvertisements(response.data);
        } catch (err) {
            console.error('Error fetching advertisements:', err);
            setError('Failed to fetch advertisements');
        }
    };

    useEffect(() => {
        fetchAdvertisements();
    
        const interval = setInterval(() => {
            fetchAdvertisements();
        }, 2000);
    
        return () => clearInterval(interval);
    }, []);

    const handleLogoClick = async (id, companyLink) => {
        try {
            // Send a POST request to the server
            console.log("hi");
            await axios.post(`http://localhost:4000/advertisement/Clickup/${id}`);
            
            // Redirect to the corresponding company link
            window.open(companyLink, '_blank', 'noopener,noreferrer');
        } catch (err) {
            console.error('Error sending count request:', err);
            // You might want to handle the error, e.g., showing a message to the user
        }
    };
    
    const fetchUserDetails = async () => {
        const userId = Cookies.get('authToken');
        if (!userId) {
            console.error('User ID not found in cookies');
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
            console.error('User ID not found in cookies');
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
        return <p>Loading...</p>;
    }

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.contentWrapper}>
                <nav style={styles.navBar}>
                    <div onClick={fetchUserDetails} style={styles.profileIcon}>
                        <img src="" alt="Profile" style={styles.profileImage} />
                    </div>
                    <h2 onClick={fetchUserGames} style={styles.navItem}>My Games</h2>
                    <a href='/user/chat' style={styles.navItem}>Chat</a>
                    <a href='/user/certs' style={styles.navItem}>Certificates</a>
                    
                </nav>
                
                <div style={styles.mainContent}>
                    {error && <p style={styles.error}>{error}</p>}
                    
                    {detailsVisible && userDetails && (
                        <div style={styles.detailsCard}>
                            <h2>User Details</h2>
                            <p><strong>Unique Code:</strong> {userDetails.uniquecode}</p>
                            <p><strong>Email:</strong> {userDetails.email}</p>
                            <p><strong>Age:</strong> {userDetails.age}</p>

                            <h3>Points:</h3>
                            {userDetails.points && userDetails.points.length > 0 ? (
                                <ul>
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
                        <div style={styles.gamesContainer}>
                            <h3>Your Games:</h3>
                            <ul style={styles.gamesList}>
                                {games.map((game, index) => (
                                    <li key={index} style={styles.gameItem}>
                                        <strong>Event Name:</strong> {game.eventname}<br />
                                        <strong>Location:</strong> {game.Location}<br />
                                        <strong>Number of Players:</strong> {game.number_of_players}<br />
                                        <strong>Start Time:</strong> {new Date(game.start_time).toLocaleString()}<br />
                                        <strong>End Time:</strong> {new Date(game.end_time).toLocaleString()}<br />
                                        <strong>Status:</strong> {game.status}<br />
                                        <strong>Single Player:</strong> {game.singleplayer ? "Yes" : "No"}<br />
                                        <strong>Multiplayer:</strong> {game.multiplayer ? "Yes" : "No"}<br />
                                        
                                        <strong>Judges:</strong>
                                        <ul style={styles.subList}>
                                            {game.judges.map((judge, judgeIndex) => (
                                                <li key={judgeIndex}>{judge.name}</li>
                                            ))}
                                        </ul>
                                        
                                        <strong>Teams:</strong>
                                        <ul style={styles.subList}>
                                            {game.teams.map((team, teamIndex) => (
                                                <li key={teamIndex} style={styles.teamItem}>
                                                    <strong>Team Nickname:</strong> {team.teamNickname}<br />
                                                    <strong>Corporate Code:</strong> {team.corporatecode}<br />
                                                    <strong>Points:</strong> {team.points}<br />
                                                    <strong>Players:</strong>
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
                </div>
            </div>

            <footer style={styles.footer}>
    {advertisements && (
        <div style={styles.advertisementContainer}>
            <h1 style={styles.advertTitle}>{advertisements.adverCompanyName}</h1>
            <div 
                onClick={() => handleLogoClick(advertisements.adverCompanyId, advertisements.companyLink)} // Use your actual ID field
                style={{ cursor: 'pointer' }} // Change cursor to pointer to indicate it's clickable
            >
                <img 
                    src={advertisements.adverCompanyLogoUrl} 
                    alt={advertisements.adverCompanyName}
                    style={{ width: '50px', height: '50px' }} // Adjust width as needed
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
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative',
    },
    contentWrapper: {
        display: 'flex',
        flex: '1 0 auto',
        paddingBottom: FOOTER_HEIGHT, // Use the constant footer height
    },
    navBar: {
        width: '200px',
        backgroundColor: '#4a90e2',
        padding: '20px',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100%',
    },
    profileIcon: {
        width: '60px',
        height: '60px',
        backgroundColor: '#fff',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        cursor: 'pointer',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        objectFit: 'cover',
    },
    navItem: {
        cursor: 'pointer',
        margin: '10px 0',
        padding: '8px 16px',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
        ':hover': {
            backgroundColor: '#357abd',
        },
    },
    mainContent: {
        flex: 1,
        padding: '20px',
        backgroundColor: '#f9f9f9',
        overflowY: 'auto',
    },
    detailsCard: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px',
    },
    gamesContainer: {
        marginTop: '20px',
    },
    gamesList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    gameItem: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '15px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    subList: {
        listStyle: 'none',
        padding: '10px 0 10px 20px',
    },
    teamItem: {
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px',
    },
    playersList: {
        listStyle: 'none',
        padding: '5px 0 5px 15px',
    },
    error: {
        color: '#dc3545',
        padding: '10px',
        backgroundColor: '#f8d7da',
        borderRadius: '4px',
        marginBottom: '15px',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: FOOTER_HEIGHT, // Fixed footer height
        backgroundColor: '#2c3e50',
        display: 'flex',
        alignItems: 'center', // Center content vertically
        justifyContent: 'center', // Center content horizontally
        zIndex: 10,
    },
    advertisementContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#ffffff',
    },
    advertTitle: {
        fontSize: '24px',
        marginBottom: '15px',
        color: '#ffffff',
        textAlign: 'center',
    },
    advertLink: {
        display: 'block',
        transition: 'transform 0.3s ease',
        ':hover': {
            transform: 'scale(1.05)',
        },
    },
    advertImage: {
        maxWidth: '200px',
        height: 'auto',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    },
};

export default UserHome;