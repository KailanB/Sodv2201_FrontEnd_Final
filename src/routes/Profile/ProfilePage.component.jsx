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
                
                setError(error.response.data.error);
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
            .catch((err) => {

                setError(err);
                setLoading(false);
            });
        }

    }, [role]);



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
                <p>Error: {error.response.data.error}. Status Code: {error.response.status}</p>
            </div>
        );
    }

    return (
        <div>
            <ProfileDiv FirstName={user.FirstName} LastName={user.LastName} Id={user.StudentID} Email={user.Email} PhoneNumber={user.PhoneNumber} Birthday={user.Birthday} Department={user.Department} Credential={user.Credential} UserName={user.UserName}/>
        </div>
    );
}

export default ProfilePage;