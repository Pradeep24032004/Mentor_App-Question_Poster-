import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MentorSignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false // Add state for password visibility
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTogglePasswordVisibility = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/mentorsignin', formData);
      if (response.data.success) {
        // Redirect to dashboard or profile page upon successful sign-in
        console.log('Sign in successful');

        localStorage.setItem('email', formData.email);
        navigate('/mentorhome');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log('error');
      setError('Internal server error');
    }
  };
 /*
  const handleResetPassword = async () => {
    navigate('/signincom/pwdresetmgr');
  };*/

  return (
    <div className="sign-in-mgr">
      <h2>Mentor Sign In</h2>
      <form onSubmit={handleSubmit}>
      <div className="mgr">
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} /><br/>
        <input 
          type={formData.showPassword ? "text" : "password"} 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
        />
        </div>
        <button className="mnr" type="button" onClick={handleTogglePasswordVisibility}>
          {formData.showPassword ? "Hide" : "Show"}
        </button><br/>
        <button className="mnr" type="submit">Sign In</button>
      </form>
      
      {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default MentorSignIn;
