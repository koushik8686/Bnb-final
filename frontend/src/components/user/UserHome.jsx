import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

const UserHome = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [gamesVisible, setGamesVisible] = useState(false); // State to manage games visibility

    // Fetch user details from the backend
    const fetchUserDetails = async () => {
        const userId = Cookies.get('authToken'); // Retrieve the user ID from the cookie
        if (!userId) {
            console.error('User ID not found in cookies');
            setError('User ID not found');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:4000/user/getuserdetails/${userId}`); // Include user ID in the request
            console.log(response.data); // Log user details
            setUserDetails(response.data);
            setDetailsVisible(true); // Show user details after fetching
            setGamesVisible(false); // Hide games when showing user details
        } catch (err) {
            console.error('Error fetching user details:', err);
            setError('Failed to fetch user details');
        }
    };

    // Fetch user's games from the backend
    const fetchUserGames = async () => {
        const userId = Cookies.get('authToken'); // Retrieve the user ID from the cookie
        if (!userId) {
            console.error('User ID not found in cookies');
            setError('User ID not found');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:4000/user/getusergames/${userId}`); // Include user ID in the request
            console.log(response.data);
            setGames(response.data);
            setGamesVisible(true); // Show games after fetching
            setDetailsVisible(false); // Hide user details when showing games
        } catch (err) {
            console.error('Error fetching user games:', err);
            setError('Failed to fetch user games');
        }
    };

    // useEffect to fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            await fetchUserGames(); // Fetch games first to display while loading user details
            await fetchUserDetails(); // Fetch user details
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={styles.container}>
            <nav style={styles.navBar}>
                <div onClick={fetchUserDetails} style={styles.profileIcon}>
                    <img src="data:image/png;base64,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" alt="Profile" style={styles.profileImage} />
                </div>
                <h2 onClick={fetchUserGames} style={styles.navItem}>My Games</h2>
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
                    <>
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
                                    <ul>
                                        {game.judges.map((judge, judgeIndex) => (
                                            <li key={judgeIndex}>{judge.name}</li>
                                        ))}
                                    </ul>
                                    <strong>Teams:</strong>
                                    <ul>
                                        {game.teams.map((team, teamIndex) => (
                                            <li key={teamIndex}>
                                                <strong>Team Nickname:</strong> {team.teamNickname}<br />
                                                <strong>Corporate Code:</strong> {team.corporatecode}<br />
                                                <strong>Points:</strong> {team.points}<br />
                                                <strong>Players:</strong>
                                                <ul>
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
                    </>
                )}
            </div>
        </div>
    );
};

// Inline styles for the component
const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f9f9f9',
    },
    navBar: {
        width: '200px',
        backgroundColor: '#4a90e2',
        padding: '20px',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    profileIcon: {
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        cursor: 'pointer',
    },
    profileImage: {
        width: '100%',
        borderRadius: '50%',
    },
    navItem: {
        cursor: 'pointer',
    },
    mainContent: {
        padding: '20px',
        flexGrow: 1,
    },
    userDetails: {
        marginBottom: '20px',
    },
    gamesList: {
        listStyleType: 'none',
        padding: 0,
    },
    gameItem: {
        padding: '10px',
        backgroundColor: '#fff',
        margin: '5px 0',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    error: {
        color: 'red',
    },
};

export default UserHome;