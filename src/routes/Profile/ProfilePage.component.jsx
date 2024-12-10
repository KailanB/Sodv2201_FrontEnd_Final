import React, { useState, useEffect } from 'react';

import ProfileDiv from './ProfileDiv.component.jsx';
import { GetCookieByName } from '../../Utilities.js';
import axios from 'axios';

function ProfilePage() {
   
    const[user, setUser] = useState([]);

    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    const[role, setRole] = useState("");


    useEffect(() => {
        let userRole = GetCookieByName("role=");
        setRole(userRole);
    }, []);
  
    useEffect(() => {
  
        
        if(role === 'admin')
        {
            axios.get('http://localhost:5000/api/admin/byId', {withCredentials: true})
            .then(res => {
                
                setUser(res.data);
                console.log(user);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
        });
        }
        else if(role === 'student')
        {
            axios.get('http://localhost:5000/api/students/byId', {withCredentials: true})
            .then(res => {
                setUser(res.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
        }

    }, [role]);




    // useEffect(() => {

        
    //     let userEmail = GetCookieByName("userEmail=")
    //     const savedUsers = JSON.parse(localStorage.getItem('users')) || [];       
    //     let userExists = savedUsers.find(savedUser => savedUser.email.toLowerCase() === userEmail.toLowerCase());

    //     if(userExists)
    //     {
    //         setUser(userExists);  
    //     }
    // }, []);  



    if(loading)
    {
        return (
            <div>
                <p>Loading data...</p>
            </div>
        );
    }
    if(error)
    {
        return (
            <div>
                <p>Error loading data ...{error}</p>
            </div>
        );
    }

    return (
        <div>
            <ProfileDiv FirstName={user.FirstName} LastName={user.LastName} Id={user.StudentID} Email={user.Email} PhoneNumber={user.PhoneNumber} Birthday={user.Birthday} Department={user.Department} Program={user.Program} UserName={user.UserName}/>
        </div>
    );
}

export default ProfilePage;