import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const loginUser = { email, password };
    try {
      const res = await axios.post('http://localhost:5000/login', loginUser);
      console.log(res.data);
      localStorage.setItem('email', formData.email);
      navigate("/userhome");
      // Handle successful response
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.msg); // assuming the error response has a 'msg' property
      } else {
        setError('An unexpected error occurred');
      }
    }
  };
  function handleSbmt(){
    navigate("/");
  }
  return (
    <div className="container">
      <div className="form-container">
        <h2>Sign In</h2>
        <form onSubmit={onSubmit}>
          <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" />
          <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" />
          <button type="submit">Sign In</button><br/>
          
        </form>
        <button onClick={handleSbmt} >Sign Up</button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default SignIn;
