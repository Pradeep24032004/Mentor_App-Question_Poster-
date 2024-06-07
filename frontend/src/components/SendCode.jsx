import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SendCode = ({ userEmail }) => {
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
                {questions.map(q => (
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
                                <h4>Code Sent:</h4>
                                {q.codeInput.map((code, index) => (
                                    <p key={index}>{code.content} - {new Date(code.timestamp).toLocaleString()}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SendCode; 

