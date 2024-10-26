import axios from 'axios';
import Cookies from 'js-cookie'; // Importing js-cookie
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [uniquecode, setUniquecode] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [imageVisible, setImageVisible] = useState(false); // For image visibility
    const [slideDirection, setSlideDirection] = useState(''); // For slide direction
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setImageVisible(true); // Show the image on login

        try {
            const response = await axios.post('http://localhost:4000/user/login', {
                uniquecode,
                password,
            });

            const { userId } = response.data; // Get token from response
            Cookies.set('authToken', userId); // Set the token in cookies
            setSlideDirection('right'); // Set slide direction for success

            setTimeout(() => {
                navigate('/user/home');
            }, 1000); // Delay for animation before redirecting

        } catch (err) {
            setError('Invalid login credentials. Please try again.');
            setSlideDirection('left'); // Set slide direction for failure

            // Reset image visibility after animation
            setTimeout(() => {
                setImageVisible(false);
                setSlideDirection(''); // Reset slide direction
            }, 1000); // Delay for animation
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="uniquecode">Unique Code:</label>
                    <input
                        type="text"
                        id="uniquecode"
                        value={uniquecode}
                        onChange={(e) => setUniquecode(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            {/* Conditional rendering of the image */}
            {imageVisible && (
                <img
                    src="https://images-cdn.ubuy.co.in/633ff9de5b90de67d82ee14e-squid-game-masked-man-mask-reality.jpg"
                    alt="Login Animation"
                    className={`animated-image ${slideDirection}`}
                />
            )}

            {/* Inline CSS */}
            <style jsx>{`
                body {
                    margin: 0;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #282c34;
                    position: relative; /* Ensure body can contain absolutely positioned elements */
                    overflow: hidden; /* Prevent overflow from image sliding */
                }

                .login-container {
                    background-color: rgba(0, 0, 0, 0.7);
                    border-radius: 10px;
                    padding: 30px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                    width: 300px;
                    text-align: center;
                    position: relative; /* To position the image correctly */
                    z-index: 10; /* Keep login form above the image */
                }

                h2 {
                    font-size: 24px;
                    margin-bottom: 20px;
                    color: #e60000;
                }

                label {
                    display: block;
                    margin-bottom: 5px;
                    font-size: 14px;
                    color: #e6e600;
                }

                input {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 15px;
                    border: 2px solid #e60000;
                    border-radius: 5px;
                    font-size: 16px;
                    background-color: #1f1f1f;
                    color: #fff;
                    outline: none;
                    transition: border 0.3s;
                }

                input:focus {
                    border-color: #e6e600;
                }

                .error {
                    color: #ff4d4d;
                    margin-bottom: 15px;
                }

                button {
                    width: 100%;
                    padding: 10px;
                    background-color: #e60000;
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                button:hover {
                    background-color: #cc0000;
                }

                button:disabled {
                    background-color: #666;
                    cursor: not-allowed;
                }

                /* Image styles */
                .animated-image {
                    position: fixed; /* Use fixed to cover entire viewport */
                    top: 0; /* Start from the top */
                    left: 50%;
                    transform: translateX(-50%); /* Center horizontally */
                    transition: transform 1s ease; /* Smooth transition */
                    width: 100vw; /* Full width of viewport */
                    height: 100vh; /* Full height of viewport */
                    object-fit: cover; /* Maintain aspect ratio while covering */
                    z-index: 5; /* Place below the form */
                }

                .animated-image.left {
                    transform: translate(-150%, 0); /* Slide left */
                }

                .animated-image.right {
                    transform: translate(150%, 0); /* Slide right */
                }
            `}</style>
        </div>
    );
};

export default Login;
