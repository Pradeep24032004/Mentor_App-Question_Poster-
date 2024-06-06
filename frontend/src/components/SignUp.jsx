import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/SignUp.css';
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const newUser = { name, email, password };
    try {
      const res = await axios.post('http://localhost:5000/register', newUser);
      console.log(res.data);
      //navigate("/signin");
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
    navigate("/signin");
  }
  function handleClk(){
    navigate("/mentorsignup");
  }
  return (
    <div className="container">
      <h1 className="head1">Mentor App</h1>
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={onSubmit}>
          <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" />
          <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" />
          <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" />
          <button type="submit">Sign Up</button><br/>
          <button onClick={handleSbmt}>SignIn</button>
          <button onClick={handleClk}>Mentor</button>
        </form>
  
        {error && <p className="error-message">{error}</p>}
      </div>  
    </div>
  );
};

export default SignUp;