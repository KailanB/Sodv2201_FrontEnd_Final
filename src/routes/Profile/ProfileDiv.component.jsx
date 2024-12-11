import {React, useState, useEffect } from 'react';
import './ProfilePage.style.css';
import { GetCookieByName } from '../../Utilities.js';

const ProfileDiv = (props) => {

    const {FirstName, LastName, Id, Email, PhoneNumber, Birthday, Department, Credential, UserName} = props

    const[role, setRole] = useState("");
    useEffect(() => {
        let userRole = GetCookieByName("role=");
        setRole(userRole);

    }, []);



    // let userEmail = GetCookieByName("userEmail=");
    // const users = JSON.parse(localStorage.getItem('users')) || [];
    // let currentUser;
    // if user has a cookie check if user is admin or student
    // then return appropriate nav bar
    if(role)
    {   

        //currentUser = users.find(user => user.email.toLowerCase() === userEmail.toLowerCase());
        if(role == "admin")
        {
            return (
                
                <div className="profileDiv">
                    <h2>{FirstName} {LastName}</h2>
                    <p>Birthday: {Birthday}</p>
                    <p>Username: {UserName}</p>
                    <br />
                    <p><strong>Contact information: </strong></p>
                    <p>Email: {Email}</p>
                    <p>Phone: {PhoneNumber}</p>
                </div>
            );
        }
        else if (role == "student")
        {
            return (

                <div className="profileDiv">
                    <h2>{FirstName} {LastName}</h2>
                    <p>StudentID: {Id}</p>
                    <p>Birthday: {Birthday}</p>
                    <p>Department: {Department}</p>
                    <p>Program: {Credential}</p>
                    <p>Username: {UserName}</p>
                    <br />
                    <p><strong>Contact information: </strong></p>
                    <p>Email: {Email}</p>
                    <p>Phone: {PhoneNumber}</p>
                </div>
            );
        }
    }
    
};

export default ProfileDiv;