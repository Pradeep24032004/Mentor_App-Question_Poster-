import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/MentorResponse.css';
const MentorResponse = ({ mentorEmail }) => {
    const [questions, setQuestions] = useState([]);
    const [ansContent, setAnsContent] = useState('');
    const [currentQuestionId, setCurrentQuestionId] = useState(null);

    useEffect(() => {
        if (mentorEmail) {
            axios.get(`http://localhost:5000/resquestions?mentorEmail=${mentorEmail}`)
                .then(response => setQuestions(response.data))
                .catch(error => console.error(error));
        }
    }, [mentorEmail]);

    const handleAnswerSubmit = (questionId) => {
        axios.post(`http://localhost:5000/questions/${questionId}/ansOutput`, { content: ansContent })
            .then(response => {
                setQuestions(questions.map(q => q._id === questionId ? response.data : q));
                setAnsContent('');
                setCurrentQuestionId(null);
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="mentor-response-container">
            <h1 className="main-title">Questions</h1>
            <div className="questions-section">
                <h2 className="section-title">Questions for Mentor: {mentorEmail}</h2>
                {questions.map(q => {
                    const combinedEntries = [
                        ...(q.codeInput || []).map(entry => ({ ...entry, type: 'codeInput' })),
                        ...(q.ansOutput || []).map(entry => ({ ...entry, type: 'ansOutput' }))
                    ].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

                    return (
                        <div key={q._id} className="question-card">
                            <p className="question-id">Question ID: {q._id}</p>
                            <h3 className="question-title">{q.question}</h3>
                            <h4 className="sub-title">Description</h4>
                            <p className="question-description">{q.description}</p>
                            <h4 className="sub-title">Mentor Requests:</h4>
                            <p className="mentor-requests">{q.mentorRequests ? q.mentorRequests.join(', ') : 'No mentor requests'}</p>
                            <h4 className="sub-title">Accepted Mentor:</h4>
                            <p className="accepted-mentor">{q.acceptedMentor}</p>
                            <div className="entries-container">
                                <h4 className="sub-title">Entries:</h4>
                                {combinedEntries.map((entry, index) => (
                                    <p key={index} className="entry">
                                        {entry.type === 'codeInput' ? 'Code Input' : 'Answer Output'}: {entry.content} - {new Date(entry.timestamp).toLocaleString()}
                                    </p>
                                ))}
                            </div>
                            <div className="answer-section">
                                <textarea 
                                    className="answer-textarea"
                                    value={currentQuestionId === q._id ? ansContent : ''} 
                                    onChange={(e) => {
                                        setCurrentQuestionId(q._id);
                                        setAnsContent(e.target.value);
                                    }}
                                    placeholder="Write your answer here"
                                />
                                <button className="submit-button" onClick={() => handleAnswerSubmit(q._id)}>Submit Answer</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MentorResponse;

