import React, { useState, useEffect } from 'react';

import ProfileDiv from './ProfileDiv.component.jsx';
import { GetCookieByName } from '../../Utilities.js';

function ProfilePage() {
   
    const[user, setUser] = useState([]);

    useEffect(() => {

        
        let userEmail = GetCookieByName("userEmail=")
        const savedUsers = JSON.parse(localStorage.getItem('users')) || [];       
        let userExists = savedUsers.find(savedUser => savedUser.email.toLowerCase() === userEmail.toLowerCase());

        if(userExists)
        {
            setUser(userExists);  
        }
    }, []);  

    return (
        <div>
            <ProfileDiv firstName={user.firstName} lastName={user.lastName} id={user.studentId} email={user.email} phone={user.phone} birthday={user.birthday} department={user.department} program={user.program} userName={user.userName}/>
        </div>
    );
}

export default ProfilePage;