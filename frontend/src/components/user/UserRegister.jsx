import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserRegister = () => {
    const [uniqueId, setUniqueId] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [corporateCode, setCorporateCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isBreaking, setIsBreaking] = useState(false);
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            setIsLoading(false);
            return;
        }

        try {
            await axios.post('http://localhost:4000/user/register', {
                uniquecode: uniqueId,
                password,
                email,
                age,
                corporatecode: corporateCode,
            });

            setIsBreaking(true);
            setTimeout(() => {
                navigate('/user/login');
            }, 3000);
        } catch (err) {
            setError('Registration failed. Please try again.');
            console.error('Registration error:', err.response?.data);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className={`glass-pane ${isBreaking ? 'breaking' : ''}`}>
                {[...Array(9)].map((_, i) => (
                    <div key={i} className="glass-piece" />
                ))}
            </div>
            <div className="form-container">
                <h2>Squid Game Registration</h2>
                <form onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="uniqueId">Your Unique ID:</label>
                        <input
                            type="text"
                            id="uniqueId"
                            value={uniqueId}
                            onChange={(e) => setUniqueId(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Set Password for the Tournament:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            pattern={emailRegex.source}
                            title="Please enter a valid email address."
                        />
                    </div>
                    <div>
                        <label htmlFor="age">Age:</label>
                        <input
                            type="number"
                            id="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="corporateCode">Corporate Code:</label>
                        <input
                            type="text"
                            id="corporateCode"
                            value={corporateCode}
                            onChange={(e) => setCorporateCode(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>

            <style jsx>{`
                .register-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background-color: #1a1a2e;
                    position: relative;
                    overflow: hidden;
                }

                .form-container {
                    background-color: rgba(0, 0, 0, 0.7);
                    border-radius: 10px;
                    padding: 30px;
                    box-shadow: 0 4px 20px rgba(230, 0, 0, 0.3);
                    width: 525px;
                    text-align: center;
                    position: relative;
                    z-index: 10;
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
                    text-align: left;
                }

                input {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 15px;
                    border: 2px solid #e60000;
                    border-radius: 5px;
                    font-size: 16px;
                    background-color: #1f1f1f;
                    color: #ffffff;
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
                    color: #ffffff;
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
                    background-color: #666666;
                    cursor: not-allowed;
                }

                .glass-pane {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-template-rows: repeat(3, 1fr);
                    z-index: 5;
                }

                .glass-piece {
                    background-color: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(230, 0, 0, 0.3);
                    transition: all 0.5s;
                }

                .breaking .glass-piece {
                    transform: scale(1.5) rotate(var(--rotation));
                    opacity: 0;
                }

                .breaking .glass-piece:nth-child(1) { --rotation: -15deg; }
                .breaking .glass-piece:nth-child(2) { --rotation: 5deg; }
                .breaking .glass-piece:nth-child(3) { --rotation: 20deg; }
                .breaking .glass-piece:nth-child(4) { --rotation: -10deg; }
                .breaking .glass-piece:nth-child(5) { --rotation: 0deg; }
                .breaking .glass-piece:nth-child(6) { --rotation: 15deg; }
                .breaking .glass-piece:nth-child(7) { --rotation: -20deg; }
                .breaking .glass-piece:nth-child(8) { --rotation: 10deg; }
                .breaking .glass-piece:nth-child(9) { --rotation: -5deg; }
            `}</style>
        </div>
    );
};

export default UserRegister;