import React, { useState, useEffect } from 'react';

import './SignUpPage.style.css';
import SignUpForm from './SignUpForm.component.jsx';
import axios from 'axios';

const SignUpPage = () => {

    //const[users, setUsers] = useState([]);

    const[error, setError] = useState(null);




    const addUser = (user) => {

        axios.post('http://localhost:5000/api/students', user)
        .then(res => {
            // if successful simply change pages as we are done here.
            window.location.href = "/logInPage";
        })
        .catch(err => {
            console.error(err);
            setError(err);

        });
      
    };

    return (   
        <div>
            <div className='signUpDiv'>
                <h3>Sign up here!</h3>
                <SignUpForm onAddUser={addUser}/>
                {error && <p>Error: {error.response.data.error}</p>}
            </div>
        </div>

    );


}








export default SignUpPage;