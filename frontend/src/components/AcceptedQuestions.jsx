import React, {useState, useEffect} from "react";
import axios from 'axios';
import MentorResponse from "./MentorResponse.jsx";
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
