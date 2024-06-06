import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Question from "./Question.jsx";
import './css/UserHome.css'; // Importing the CSS file

function UserHome() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        const userEmail = localStorage.getItem('email');
        if (userEmail) {
            try {
                const response = await axios.get(`http://localhost:5000/user?email=${userEmail}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('email');
        navigate("/signin");
    };

    return (
        <div className="user-home-container">
            <div className="welcome-container">
                {user && (
                    <div>
                        <p>Welcome, {user.name}</p>
                        <button onClick={handleLogout} className="logout-button">Log Out</button>
                    </div>
                )}
            </div>
            {user && <Question userEmail={user.email} />}
        </div>
    );
}

export default UserHome;
