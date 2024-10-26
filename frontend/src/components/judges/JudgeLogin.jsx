// src/components/LoginPage.js
import React, { useState } from 'react';
import '../judges/JudgeLogin.css'; 

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => setIsLogin(!isLogin);

    return (
        <div className="wrapper">
            <nav className="nav">
                <div className="nav-logo">
                    <p><a href="/">Nourish Nest</a></p>
                </div>
                <div className="nav-button">
                    <button 
                        className={`btn ${isLogin ? 'white-btn' : ''}`} 
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button 
                        className={`btn ${!isLogin ? 'white-btn' : ''}`} 
                        onClick={() => setIsLogin(false)}
                    >
                        Sign Up
                    </button>
                </div>
            </nav>

            <div className="form-box">
                {isLogin ? <Login /> : <Register />}
            </div>
        </div>
    );
};

const Login = () => (
    <div className="login-container">
        <div className="top">
            <span>Don't have an account? <a href="#" onClick={(e) => e.preventDefault()}>Sign Up</a></span>
            <header>Login</header>
        </div>
        <form method="POST" action="/login">
            <div className="input-box">
                <input type="text" className="input-field" placeholder="Username or Email" name="email" required />
                <i className="bx bx-user"></i>
            </div>
            <div className="input-box">
                <input type="password" className="input-field" placeholder="Password" name="password" required />
                <i className="bx bx-lock-alt"></i>
            </div>
            <div className="input-box">
                <input type="submit" className="submit" value="Sign In" />
            </div>
        </form>
    </div>
);

const Register = () => (
    <div className="register-container">
        <div className="top">
            <span>Have an account? <a href="#" onClick={(e) => e.preventDefault()}>Login</a></span>
            <header>Sign Up</header>
        </div>
        <form method="POST" action="/signup">
            <div className="two-forms">
                <div className="input-box">
                    <input type="text" className="input-field" placeholder="Firstname" name="Firstname" />
                    <i className="bx bx-user"></i>
                </div>
                <div className="input-box">
                    <input type="text" className="input-field" placeholder="Lastname" name="Lastname" />
                    <i className="bx bx-user"></i>
                </div>
            </div>
            <div className="input-box">
                <input type="text" className="input-field" placeholder="Email" name="email" />
                <i className="bx bx-envelope"></i>
            </div>
            <div className="input-box">
                <input type="password" className="input-field" placeholder="Password" name="password" />
                <i className="bx bx-lock-alt"></i>
            </div>
            <div className="input-box">
                <input type="submit" className="submit" value="Register" />
            </div>
        </form>
    </div>
);

export default LoginPage;
