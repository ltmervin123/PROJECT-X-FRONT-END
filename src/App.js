import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage'; // Main landing page with Navbar
import Login from './components/Login'; // Login component
import Register from './components/Register'; // Registration component
import Home from './components/Home'; // Home component

function App() {
    return (
        <Router>
            <div className="app">
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<LandingPage />} /> {/* Main landing page */}
                        <Route path="/login" element={<Login />} /> {/* Login page */}
                        <Route path="/register" element={<Register />} /> {/* Registration page */}
                        <Route path="/home" element={<Home />} /> {/* Home page after login */}
                        {/* Add more routes as needed */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
