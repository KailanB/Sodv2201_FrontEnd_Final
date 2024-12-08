import React, { useState, useEffect } from 'react';
import './LogInPage.style.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LogInPage = () => {


    const [response, setResponse] = useState(null);

    const[formData, setFormData] = useState({
        Email: '',
        Password: ''
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
            Email: '',
            Password: ''
        });
    }

    const onAddUser = async (user) => {


        // const response = await axios.post('http://localhost:5000/api/login', user);
        // console.log(response);

        axios.post('http://localhost:5000/api/login', user, {withCredentials: true})
        .then(res => {

            setResponse(res.data);
            // console.log(res.data);
            window.location.href = "/studentDashboard";
        })
        .catch(error => {

            console.log(error);
            console.error(error);
        });  



        // // searches the local storage for the email that is attempting to be registered
        // const users = JSON.parse(localStorage.getItem('users')) || [];
        // let userExists = users.find(savedUser => savedUser.email.toLowerCase() === user.email.toLowerCase());
        // // if user exists check that the correct password was used
        // if(userExists)
        // {
        //     // if passwords match
        //     if(userExists.password == user.password)
        //     {
        //         let days = 1; // update these variables to set cookie expiration
        //         // let hours = 5;
        //         const expireDate = new Date(); 
        //         // create user cookie with users email
        //         expireDate.setTime(expireDate.getTime() + (days * 24 * 60 * 60 * 1000));
        //         document.cookie = "userEmail=" + userExists.email.toLowerCase() + ";" + expireDate + ";path=/";
        //         if(userExists.status == "Student")
        //         {
        //             window.location.href = "/studentDashboard";
        //         }
        //         else
        //         {
        //             window.location.href = "/adminDashboard";
        //         }
                
        //     }
        //     else
        //     {
        //         alert("That password is incorrect sorry!");
        //     }
        // }
        // else
        // {
        //     alert("Sorry. Email does not exist!");
        // }
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
                                name="Email"
                                value={formData.Email}
                                onChange={handleChange}
                                className="standardInput" 
                                required></input>
                            </div>
                            <div className='labelInputDiv'>
                                <label>Password: </label>
                                <input 
                                type="text" 
                                name="Password"
                                value={formData.Password}
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