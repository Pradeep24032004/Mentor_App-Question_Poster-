import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './Question.css';
import './css/Question.css';
const Question = ({ userEmail }) => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState({ question: '', description: '', userEmail });
    const [acceptedMentorInput, setAcceptedMentorInput] = useState('');
    const [codeInput, setCodeInput] = useState('');
    const [sendCodeMessage, setSendCodeMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/questions?email=${userEmail}`)
            .then(response => setQuestions(response.data))
            .catch(error => console.error(error));
    }, [userEmail]);

    const handleQuestionSubmit = () => {
        axios.post('http://localhost:5000/questions', newQuestion)
            .then(response => setQuestions([...questions, response.data]))
            .catch(error => console.error(error));
    };

    const handleAcceptRequest = (id) => {
        axios.post(`http://localhost:5000/questions/${id}/accept`, { acceptedMentor: acceptedMentorInput })
            .then(response => {
                const updatedQuestions = questions.map(q => q._id === id ? { ...q, acceptedMentor: response.data.acceptedMentor } : q);
                setQuestions(updatedQuestions);
            })
            .catch(error => console.error(error));
    };

    const handleSendCode = (id) => {
        axios.post(`http://localhost:5000/questions/${id}/codeInput`, { codeInput })
            .then(response => {
                const updatedQuestions = questions.map(q => q._id === id ? { ...q, codeInput: response.data.codeInput } : q);
                setQuestions(updatedQuestions);
                setSendCodeMessage('Code successfully sent');
                setTimeout(() => setSendCodeMessage(''), 3000); // Clear message after 3 seconds
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="main">
            <h1>Question Poster</h1>
            <div className="form-container">
                <input 
                    type="text" 
                    placeholder="Question" 
                    value={newQuestion.question} 
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Description" 
                    value={newQuestion.description} 
                    onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })} 
                />
                <button onClick={handleQuestionSubmit}>Post Question</button>
            </div>
            <div className="questions-container">
                <h2>Questions</h2>
                {questions.map(q => (
                    <div key={q._id} className="question-card">
                        <p><strong>User:</strong> {q.userEmail}</p>
                        <h3>{q.question}</h3>
                        <p>{q.description}</p>
                        <div>
                            <h4>Mentors Requested:</h4>
                            {q.mentorRequests.map(mentor => (
                                <p key={mentor}>{mentor}</p>
                            ))}
                        </div>
                        <div>
                            {!q.acceptedMentor && (
                                <div className="mentor-accept-container">
                                    <input 
                                        type="text" 
                                        placeholder="Enter Mentor Email" 
                                        value={acceptedMentorInput} 
                                        onChange={(e) => setAcceptedMentorInput(e.target.value)} 
                                    />
                                    <button onClick={() => handleAcceptRequest(q._id)}>Accept Request</button>
                                </div>
                            )}
                            <div className="code-input-container">
                                <input 
                                    type="text" 
                                    placeholder="Enter Code" 
                                    value={codeInput} 
                                    onChange={(e) => setCodeInput(e.target.value)} 
                                />
                                <button onClick={() => handleSendCode(q._id)}>Send Code</button>
                            </div>
                            {sendCodeMessage && <p className="send-code-message">{sendCodeMessage}</p>}
                            <div className="entries-container">
                                <div className="code-section">
                                    <h4 className="section-title">Code Sent:</h4>
                                    {q.codeInput.map((code, index) => (
                                        <p key={index} className="code-entry">
                                            {code.content} - {new Date(code.timestamp).toLocaleString()}
                                        </p>
                                    ))}
                                </div>
                                <div className="output-section">
                                    <h4 className="section-title">Answer Output:</h4>
                                        {q.ansOutput.map((code, index) => (
                                            <p key={index} className="output-entry">
                                                {code.content} - {new Date(code.timestamp).toLocaleString()}
                                            </p>
                                        ))}
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Question;

/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Question = ({ userEmail }) => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState({ question: '', description: '', userEmail });
    const [acceptedMentorInput, setAcceptedMentorInput] = useState('');
    const [codeInput, setCodeInput] = useState('');
    const [sendCodeMessage, setSendCodeMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/questions?email=${userEmail}`)
            .then(response => setQuestions(response.data))
            .catch(error => console.error(error));
    }, [userEmail]);

    const handleQuestionSubmit = () => {
        axios.post('http://localhost:5000/questions', newQuestion)
            .then(response => setQuestions([...questions, response.data]))
            .catch(error => console.error(error));
    };

    const handleAcceptRequest = (id) => {
        axios.post(`http://localhost:5000/questions/${id}/accept`, { acceptedMentor: acceptedMentorInput })
            .then(response => {
                const updatedQuestions = questions.map(q => q._id === id ? { ...q, acceptedMentor: response.data.acceptedMentor } : q);
                setQuestions(updatedQuestions);
            })
            .catch(error => console.error(error));
    };

    const handleSendCode = (id) => {
        axios.post(`http://localhost:5000/questions/${id}/codeInput`, { content: codeInput })
            .then(response => {
                const updatedQuestions = questions.map(q => q._id === id ? { ...q, codeInput: response.data.codeInput } : q);
                setQuestions(updatedQuestions);
                setSendCodeMessage('Code successfully sent');
                setTimeout(() => setSendCodeMessage(''), 3000); // Clear message after 3 seconds
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Question Poster</h1>
            <div>
                <input 
                    type="text" 
                    placeholder="Question" 
                    value={newQuestion.question} 
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Description" 
                    value={newQuestion.description} 
                    onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })} 
                />
                <button onClick={handleQuestionSubmit}>Post Question</button>
            </div>
            <div>
                <h2>Questions</h2>
                {questions.map(q => {
                    // Combine codeInput and ansOutput, and sort them by timestamp
                    const combinedEntries = [
                        ...(q.codeInput || []).map(entry => ({ ...entry, type: 'codeInput' })),
                        ...(q.ansOutput || []).map(entry => ({ ...entry, type: 'ansOutput' }))
                    ].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

                    return (
                        <div key={q._id}>
                            <p>User: {q.userEmail}</p>
                            <h3>{q.question}</h3>
                            <p>{q.description}</p>
                            <div>
                                <h4>Mentors Requested:</h4>
                                {q.mentorRequests.map(mentor => (
                                    <p key={mentor}>{mentor}</p>
                                ))}
                            </div>
                            <div>
                                {!q.acceptedMentor && (
                                    <>
                                        <input 
                                            type="text" 
                                            placeholder="Enter Mentor Email" 
                                            value={acceptedMentorInput} 
                                            onChange={(e) => setAcceptedMentorInput(e.target.value)} 
                                        />
                                        <button onClick={() => handleAcceptRequest(q._id)}>Accept Request</button>
                                    </>
                                )}
                                <input 
                                    type="text" 
                                    placeholder="Enter Code" 
                                    value={codeInput} 
                                    onChange={(e) => setCodeInput(e.target.value)} 
                                />
                                <button onClick={() => handleSendCode(q._id)}>Send Code</button>
                                {sendCodeMessage && <p>{sendCodeMessage}</p>}
                                <div>
                                    <h4>Entries:</h4>
                                    {combinedEntries.map((entry, index) => (
                                        <p key={index}>
                                            {entry.type === 'codeInput' ? 'Code Input' : 'Answer Output'}: {entry.content} - {new Date(entry.timestamp).toLocaleString()}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Question;*/

/** 
<button onClick={() => handleRequest(q._id)}>Request to Mentor</button>
                        <button onClick={() => handleAccept(q._id)}>Accept Mentor Request</button>
                        <div>
                            <h4>Mentor Requests:</h4>
                            {q.mentorRequests.map(mentor => (
                                <p key={mentor._id}>{mentor.name}</p>
                            ))}
                        </div>
                        <div>
                            <h4>Accepted Mentor:</h4>
                            {q.acceptedMentor && <p>{q.acceptedMentor.name}</p>}
                        </div> **/


/*

    const handleAccept = (id) => {
        axios.post(`http://localhost:5000/questions/${id}/accept`, { userId: 'USER_ID' })
            .then(response => {
                const updatedQuestions = questions.map(q => q._id === id ? response.data : q);
                setQuestions(updatedQuestions);
            })
            .catch(error => console.error(error));
    }; */