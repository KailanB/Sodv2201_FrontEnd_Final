import React, { useState } from 'react';
import './LogInPage.style.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


// our final project involves integrating with a backend API for user authentication (so, I made authController.js file which is linked to login and logout file)
//Here's an updated version of the LogInPage to align it with backend integration:
const LogInPage = () => {
    const [formData, setFormData] = useState({
        Email: '',
        Password: ''
    });
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
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


    axios.post('http://localhost:5000/api/login', user, {withCredentials: true})
    .then(res => {
        setResponse(res.data);
        console.log(res.data);
        if(res.data.role === 'student')
        {
            window.location.href = "/studentDashboard";
        }
        else if (res.data.role === 'admin')
        {
            window.location.href = "/adminDashboard";
        }

    })
    .catch(err => {
        console.log(err);
        if(err.response.data.message)
        {
            setError(err.response.data.message);
        }
        console.log(err);
        console.error(err);
    });  
}


    return (
        <div>
            <div className="logInPageMain">
                <div className="logInPageHalf">
                    <div className="logInDiv">
                        <form onSubmit={handleSubmit}>
                            <div className="labelInputDiv">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="Email"
                                    value={formData.Email}
                                    onChange={handleChange}
                                    className="standardInput"
                                    required
                                />
                            </div>
                            <div className="labelInputDiv">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    name="Password"
                                    value={formData.Password}
                                    onChange={handleChange}
                                    className="standardInput"
                                    required
                                />
                            </div>
                            {error && <p className="errorMessage">{(error)}</p>}
                            <button className="standardButton" type="reset">Reset</button>
                            <button className="standardButton" type="button" onClick={() => setFormData({ email: '', password: '' })}>
                                Cancel
                            </button>
                            <input type="submit" value="Log In" className="standardButton" />
                        </form>
                    </div>
                </div>

                <div className="logInPageHalf">
                    <p>
                        Don't have an account? Make one <Link to="/signUpPage">here</Link>!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LogInPage;


