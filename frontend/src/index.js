import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import App from './App.js';
//import SignUp from './pages/signup/SignUp';
import SignIn from './components/SignIn.jsx';
import UserHome from './components/UserHome.jsx';
import MentorSignUp from './components/MentorSignUp.jsx';
import MentorSignIn from './components/MentorSignIn.jsx';
import MentorHome from './components/MentorHome.jsx';
import AcceptedQuestions from './components/AcceptedQuestions.jsx';
const router = createBrowserRouter([
  {
     path:"/",
     element:<App/>
  },
  {
    path:"/signin",
    element:<SignIn/>
  },
  {
    path:"/userhome",
    element:<UserHome/>
  },
  {
    path:"/mentorsignup",
    element:<MentorSignUp/>
  },
  {
    path:"/mentorsignin",
    element:<MentorSignIn/>
  },
  {
    path:"/mentorhome",
    element:<MentorHome/>
  },
  {
    path:"/accepted",
    element:<AcceptedQuestions/>
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router = {router} />
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

