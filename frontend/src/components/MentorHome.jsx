import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DisplayQuestion from "./DisplayQuestion.jsx";
//import MentorResponse from "./MentorResponse.jsx";
//import Question from "./Question.jsx";
function MentorHome (){
    const [user, setUser] = useState(null);
    //const [userEmail1, setUserEmail] = useState(null);
    const navigate = useNavigate();
 
    useEffect(() => {
        fetchUserDetails();
    }, []);
    const fetchUserDetails = async () => {
        const userEmail = localStorage.getItem('email');
        //setUserEmail(userEmail);
        localStorage.setItem('email', userEmail);
        if (userEmail) {
            try {
                const response = await axios.get(`http://localhost:5000/mentor?email=${userEmail}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }
    };
 
    const handleLogout = () => {
        localStorage.removeItem('email');
        navigate("/signin");
        //window.location.reload(); // Reload the page to clear user data
    };
    const handleAccepted = () =>{
        navigate("/accepted");
    }
    return(
        <div>
            <div >
                <br/><br/>
                {user && (
                    <div><br/>
                        <p>Welcome, {user.name}</p>
                        <button onClick={handleLogout}>Log Out</button>
                    </div>
                )}
            </div>
          <button onClick={handleAccepted}>Accepted Questions</button>
          {user && (<DisplayQuestion mentorEmail={user.email}/>)}
           
        </div>
    );
}
export default MentorHome;