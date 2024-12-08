import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.style.css';
import { GetCookieByName } from '../../Utilities.js';

const NavBars = (props) => {

    const {home} = props;

    const Logout = () => {
        const futureDate = new Date();
        // create a date and set it to a year ago
        futureDate.setFullYear(futureDate.getFullYear() - 1);
        const expires = "expires=" + futureDate.toUTCString();
        // update each cookie to expired date
        document.cookie.split(";").forEach(function(c) {
            let cookieName = c.trim().split("=")[0];
            // Set the cookie with the same name, but with an updated expiration date
            document.cookie = cookieName + "=; " + expires + "; path=/";
        });
        // go to home page
        window.location.href = "/logInPage";
        
    }


    let userEmail = GetCookieByName("userEmail=");
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser;
    // if user has a cookie check if user is admin or student
    // then return appropriate nav bar
    if(userEmail)
    {   

        currentUser = users.find(user => user.email.toLowerCase() === userEmail.toLowerCase());
        if(currentUser.status == "Admin")
        {
            return (
                
                <div className="navBar">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/programsPage">Programs</Link></li>
                        <li><Link to="/signUpPage">Sign up</Link></li>
                        <li><Link to="/logInPage">Log in</Link></li>
                        <li><Link to="/profilePage">Profile</Link></li>
                        <li><Link to="/viewRegisteredStudents">View Registered Students</Link></li>
                        <li><Link to="/adminAddCourses">Add Courses</Link></li>
                        <li><Link to="/adminDashboard">Dashboard</Link></li>
                        <li><Link to="/adminMessagesPage">Messages</Link></li>
                        <li><Link to="/coursesPage">Courses Page</Link></li>

                        <br />
                        <li><a href='#' onClick={Logout}>Logout</a></li>
                    </ul>
        
                </div>
            );
        }
        else if (currentUser.status == "Student")
        {
            return (

                <div className="navBar">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/programsPage">Programs</Link></li>
                        <li><Link to="/signUpPage">Sign up</Link></li>
                        <li><Link to="/logInPage">Log in</Link></li>
                        <li><Link to="/profilePage">Profile</Link></li>
                        <li><Link to="/coursesPage">Courses Page</Link></li>
                        <li><Link to="/studentDashboard">Student Dashboard</Link></li>
                        <br />
                        <li><a href='#' onClick={Logout}>Logout</a></li>
                    </ul>
                </div>
            );
        }
    }
    
    // else if user has no email cookie return nav without logged in extras
    // *** RIGHT NOW THIS IS SET TO AUTO RETURN ALL PAGES FOR EASY TESTING ***
    // LATER RETURN ONLY BASICS!!
    else
    {
        return (

            // <div className="navBar">
            //     <ul>
            //         <li><Link to="/">Home</Link></li>
            //         <li><Link to="/contact">Contact Us</Link></li>
            //         <li><Link to="/programsPage">Programs</Link></li>
            //         <li><Link to="/signUpPage">Sign up</Link></li>
            //         <li><Link to="/logInPage">Log in</Link></li>
            //         <li><Link to="/profilePage">Profile</Link></li>
            //         <li><Link to="/viewRegisteredStudents">View Registered Students</Link></li>
            //         <li><Link to="/adminAddCourses">Add Courses</Link></li>
            //         <li><Link to="/adminDashboard">Dashboard</Link></li>
            //         <li><Link to="/adminMessagesPage">Messages</Link></li>
            //         <li><Link to="/coursesPage">Courses Page</Link></li>
            //         <li><Link to="/studentDahsboard">Student Dashboard</Link></li>
            //         <br />
            //         <li><a href='#' onClick={Logout}>Logout</a></li>
            //     </ul>
    
            // </div>
            // UNCOMMENT AND RETURN THIS VERSION! 

            <div className="navBar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li><Link to="/programsPage">Programs</Link></li>
                    <li><Link to="/coursesPage">Courses Page</Link></li>
                    <li><Link to="/signUpPage">Sign up</Link></li>
                    <li><Link to="/logInPage">Log in</Link></li>
                </ul>
            </div>
    
        );

    }

};


export default NavBars;