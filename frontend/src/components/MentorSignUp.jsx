// src/MentorSignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function MentorSignUp() {
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    mgrid: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Basic validation
    if (!formData.username || !formData.email || !formData.password || !formData.mgrid) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/mentorsignup', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.message || 'An error occurred');
    }
  };
  function handleBtn(){
    navigate("/mentorsignin");
  }
  return (
    <div className="sign-up-mgr">
      <h2>Mentor Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="manager">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          /><br/>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          /><br/>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          /><br/>
          <input
            type="text"
            name="name"
            placeholder="Name (Optional)"
            value={formData.name}
            onChange={handleChange}
          /><br/>
          <input
            type="text"
            name="mgrid"
            placeholder="Manager ID"
            value={formData.mgrid}
            onChange={handleChange}
          /><br/>
        </div>
        <div className="mgs">
          <button className="mgs1" type="submit">Sign Up</button>
          <button className="mgs2" type="button" onClick={handleBtn}>Sign In</button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        </div>
      </form>
    </div>
  );
}

export default MentorSignUp;
