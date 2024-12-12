import React, { useState } from 'react';

import './SignUpPage.style.css';
import SignUpForm from './SignUpForm.component.jsx';
import axios from 'axios';

const SignUpPage = () => {

    const[error, setError] = useState(null);


    const addUser = (user) => {

        // https://stackoverflow.com/questions/6603015/check-whether-a-string-matches-a-regex-in-js
        // using regex test()
        const invalidCharacters = /['"<>&]/;
        if(invalidCharacters.test(user.FirstName.toString()))
        {
            setError(`Invalid characters in First Name - DO NOT use < > " ' or &`);
            return;
        }
        if(invalidCharacters.test(user.LastName.toString()))
        {
            setError(`Invalid characters in Last Name - DO NOT use < > " ' or &`);
            return;
        }
        if(invalidCharacters.test(user.Email.toString()))
        {
            setError(`Invalid characters in Email - DO NOT use < > " ' or &`);
            return;
        }
        if(invalidCharacters.test(user.Phone.toString()))
        {
            setError(`Invalid characters in Phone - DO NOT use < > " ' or &`);
            return;
        }
        if(invalidCharacters.test(user.UserName.toString()))
        {
            setError(`Invalid characters in User Name - DO NOT use < > " ' or &`);
            return;
        }
        if(invalidCharacters.test(user.Password.toString()))
        {
            setError(`Invalid characters in Password - DO NOT use < > " ' or &`);
            return;
        }
    
        axios.post('http://localhost:5000/api/students', user)
        .then(res => {
            // if successful simply change pages as we are done here.
            window.location.href = "/logInPage";
        })
        .catch(err => {
            console.error(err);
            setError(err.response.data.error);

        });
      
    };


    return (   
        <div>
            <div className='signUpDiv'>
                <h3>Sign up here!</h3>
                <SignUpForm onAddUser={addUser}/>
                {error && <p>Error: {error}</p>}
            </div>
        </div>

    );


}








export default SignUpPage;