import React, {useState, useEffect} from "react";
//import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import DisplayQuestion from "./DisplayQuestion.jsx";
import MentorResponse from "./MentorResponse.jsx";
//import Question from "./Question.jsx";
function AcceptedQuestions (){
    const [user, setUser] = useState(null);
    //const navigate = useNavigate();
    useEffect(() => {
        fetchUserDetails();
    }, []);
    const fetchUserDetails = async () => {
        const userEmail = localStorage.getItem('email');
        if (userEmail) {
            try {
                const response = await axios.get(`http://localhost:5000/mentor?email=${userEmail}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }
    };

    
    return(
        <div>
            
            {user && (<MentorResponse mentorEmail={user.email}/>)}
           
        </div>
    );
}
export default AcceptedQuestions;