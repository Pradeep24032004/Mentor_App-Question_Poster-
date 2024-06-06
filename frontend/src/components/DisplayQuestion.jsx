import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './DisplayQuestion.css'; // Import the CSS file
import './css/DisplayQuestion.css';
const DisplayQuestion = ({ mentorEmail }) => {
  const [questions, setQuestions] = useState([]);
  const [requestedQuestions, setRequestedQuestions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/allquestions')
      .then(response => {
        setQuestions(response.data);
        const requested = response.data.filter(q => q.mentorRequests.includes(mentorEmail));
        setRequestedQuestions(requested);
      })
      .catch(error => console.error(error));
  }, [mentorEmail]);

  const handleRequest = (id) => {
    axios.post(`http://localhost:5000/questions/${id}/request`, { mentorEmail })
      .then(response => {
        const updatedQuestions = questions.map(q => q._id === id ? response.data : q);
        setQuestions(updatedQuestions);
        const requested = updatedQuestions.filter(q => q.mentorRequests.includes(mentorEmail));
        setRequestedQuestions(requested);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="display-question-container">
      <h1 className="main-title">Question Poster</h1>
      <div className="questions-section">
        <h2 className="section-title">Questions</h2>
        {questions.map(q => (
          <div key={q._id} className="question-card">
            <h3 className="question-title">{q.question}</h3>
            <p className="question-description">{q.description}</p>
            {requestedQuestions.includes(q) ? (
              <p className="requested-message">You have already requested this question.</p>
            ) : (
              <button onClick={() => handleRequest(q._id)} className="request-button">Request to Mentor</button>
            )}
            <div className="mentor-requests">
              <h4 className="mentor-requests-title">Mentor Requests:</h4>
              {q.mentorRequests.map((mentor, index) => (
                <p key={index} className="mentor-request-item">{mentor}</p>
              ))}
            </div>
            <div className="accepted-mentor">
              <h4 className="accepted-mentor-title">Accepted Mentor:</h4>
              {q.acceptedMentor && <p className="accepted-mentor-item">{q.acceptedMentor}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayQuestion;
