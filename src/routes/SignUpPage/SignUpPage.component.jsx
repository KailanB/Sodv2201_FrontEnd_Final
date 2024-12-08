import React, { useState, useEffect } from 'react';

import './SignUpPage.style.css';
import SignUpForm from './SignUpForm.component.jsx';
import axios from 'axios';

const SignUpPage = () => {

    const[users, setUsers] = useState([]);

    const [response, setResponse] = useState(null);

    // *******************************************************************
    // In this case I removed almost ALL OF THE OLD CODE
    // the old code did the email validation etc.
    // this is no longer necessary as our middleware handles those issues now
    // *******************************************************************


    // for using local storage https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/
    // needed much more info on this as nothing was working
    // https://stackoverflow.com/questions/75855282/why-does-the-local-storage-get-deleted-when-i-refresh
    // useEffect(() => {
    //     // this effect runs on first load of the page
    //     // pulls data from local storage
    //     const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    //     // checks if data exists. If so, then set our users with local storage data
    //     if(savedUsers)
    //     {
    //         setUsers([...savedUsers]);
    //     }
    // }, []);

    // this effect runs every time users state is updated aka this runs when we add a new user through addUser function
    // useEffect(() => {

    //     // first check that the users array actually contains data. If it does NOT we do not want to save nothing to local storage
    //     // this is a fail safe in case anything loads wonky, and the first effect runs after this one.
    //     if(users.length > 0)
    //     {
    //         localStorage.setItem('users', JSON.stringify(users));
    //     }   
    // }, [users]);


    // *******************************************************************
    // NOW all we need is a fetch request to post the formdata
    // the biggest issue I had was matching the formData names and formData order of items
    // also getting the ID for the post request instead of the string value name such as "Diploma"
    // *******************************************************************
    const addUser = (user) => {

        axios.post('http://localhost:5000/api/students', user)
        .then(res => {
            setResponse(res.data);
            window.location.href = "/logInPage";

        })
        .catch(error => console.error(error));






        // // searches the local storage for the email that is attempting to be registered
        // let userExists = users.find(savedUser => savedUser.email.toLowerCase() === user.email.toLowerCase())
        // // if no such user exists we can go ahead and add the user to our storage
        // if(!userExists)
        // {
        //     // create new unqiue studentId for new user
        //     user.studentId = Date.now();
        //     user.email.toLowerCase();
        //     setUsers((currentUserSet => [...currentUserSet, user]));
        // }
        // // else notify the user and DO not add a duplicate email.
        // else
        // {
        //     alert("Sorry. Email already in use!")
        // }
      
    };

    return (   
        <div>
            <div className='signUpDiv'>
                <h3>Sign up here!</h3>
                <SignUpForm onAddUser={addUser}/>
            </div>
        </div>

    );


}








export default SignUpPage;