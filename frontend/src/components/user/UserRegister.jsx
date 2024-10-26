import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
    const [uniqueId, setUniqueId] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [corporateCode, setCorporateCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Handle form submission
    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Validate email format before submitting
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/user/register', {
                uniquecode: uniqueId, // Changed from uniqueId to uniquecode
                password,
                email,
                age,
                corporatecode: corporateCode, // Changed from corporateCode to corporatecode
            });

            // Redirect to login page after successful registration
            navigate('/user/login');
        } catch (err) {
            setError('Registration failed. Please try again.');
            console.error('Registration error:', err.response.data); // Log the error response for debugging
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {isLoading && <p>Loading...</p>}
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
                        pattern={emailRegex.source} // HTML pattern attribute for validation
                        title="Please enter a valid email address." // Tooltip on hover
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

            {/* Inline CSS for styling */}
            <style jsx>{`
                .register-container {
                    background-color: #f0f0f0;
                    border-radius: 10px;
                    padding: 30px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                    width: 300px;
                    text-align: center;
                    margin: auto;
                    margin-top: 100px;
                }

                h2 {
                    font-size: 24px;
                    margin-bottom: 20px;
                    color: #333;
                }

                label {
                    display: block;
                    margin-bottom: 5px;
                    font-size: 14px;
                    color: #333;
                }

                input {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 15px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    font-size: 16px;
                    background-color: #fff;
                    color: #333;
                    outline: none;
                    transition: border 0.3s;
                }

                input:focus {
                    border-color: #4a90e2;
                }

                .error {
                    color: #ff4d4d;
                    margin-bottom: 15px;
                }

                button {
                    width: 100%;
                    padding: 10px;
                    background-color: #4a90e2;
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                button:hover {
                    background-color: #357ab8;
                }

                button:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    );
};

export default UserRegister;
