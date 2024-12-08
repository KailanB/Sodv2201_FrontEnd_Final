import React, { useState, useEffect } from 'react';
import './LogInPage.style.css';
import { Link } from 'react-router-dom';

const LogInPage = () => {

    const[formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {

        const {name, value} = e.target;
        setFormData({
            ...formData, 
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddUser(formData);
        setFormData({
            email: '',
            password: ''
        });
    }

    const onAddUser = (user) => {

        // searches the local storage for the email that is attempting to be registered
        const users = JSON.parse(localStorage.getItem('users')) || [];
        let userExists = users.find(savedUser => savedUser.email.toLowerCase() === user.email.toLowerCase());
        // if user exists check that the correct password was used
        if(userExists)
        {
            // if passwords match
            if(userExists.password == user.password)
            {
                let days = 1; // update these variables to set cookie expiration
                // let hours = 5;
                const expireDate = new Date(); 
                // create user cookie with users email
                expireDate.setTime(expireDate.getTime() + (days * 24 * 60 * 60 * 1000));
                document.cookie = "userEmail=" + userExists.email.toLowerCase() + ";" + expireDate + ";path=/";
                if(userExists.status == "Student")
                {
                    window.location.href = "/studentDashboard";
                }
                else
                {
                    window.location.href = "/adminDashboard";
                }
                
            }
            else
            {
                alert("That password is incorrect sorry!");
            }
        }
        else
        {
            alert("Sorry. Email does not exist!");
        }
    };


    return (
        <div>
            <div className="logInPageMain">
                <div className="logInPageHalf">
                    <div className="logInDiv">
                        
                        <form onSubmit={handleSubmit}>
                            <div className='labelInputDiv'>
                                <label>Email: </label>
                                <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="standardInput" 
                                required></input>
                            </div>
                            <div className='labelInputDiv'>
                                <label>Password: </label>
                                <input 
                                type="text" 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="standardInput" 
                                required></input>
                            </div>
                            <button className="standardButton">Reset</button>
                            <button className="standardButton">Cancel</button>
                            <input type='submit' value="Log In" className="standardButton"/> 
                        </form>
                    </div>
                </div>
                
                <div className="logInPageHalf">
                    <p>Don't have an account? Make one <Link to="/signUpPage">here</Link>!</p>
                </div>
            </div>
        </div>

        
        


    );
};


export default LogInPage;