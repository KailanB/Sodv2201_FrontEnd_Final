import React, { useState } from 'react';
import './SignUpPage.style.css';

const SignUpForm = ({onAddUser}) => {

    const[formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthday: '',
        department: '',
        program: '',
        term: '',
        userName: '',
        password: '',
        status: 'Student',
        studentId: '',
        courses: []
    });

    const handleChange = (e) => {

        
        const {name, value} = e.target;
        setFormData({
            ...formData, 
            [name]: value
        });
    };

    // after submit, prevent default, 
    //add user to parent component and 
    //reset form fields
    const handleSubmit = (e) => {
        e.preventDefault();

        // onAddUser is a method pass to this component from the parent component "SignUpPage"
        // we then pass all the data collected from the form to that method 
        // which adds the new user to an array
        onAddUser(formData);
        setFormData({
            firstName: '', 
            lastName: '',
            email: '',
            phone: '',
            birthday: '',
            department: '',
            program: '',
            term: '',
            userName: '',
            password: '',
            status: 'Student',
            studentId: '',
            courses: []
        });
        window.location.href = "/logInPage";
    }



    return (

        <div>
            <form onSubmit={handleSubmit}>
                <div className='labelInputDiv'>
                    <label>First Name:</label>
                    <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="standardInput" 
                    required></input>
                </div>
                <div className='labelInputDiv'>
                    <label>Last Name:</label>
                    <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="standardInput" 
                    required></input>
                </div>
                <div className='labelInputDiv'>
                    <label>Email:</label>
                    <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="standardInput" 
                    required></input>
                </div>
                <div className='labelInputDiv'>
                    <label>Phone:</label>
                    <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="standardInput" 
                    required></input>
                </div>
                <div className='labelInputDiv'>
                    <label>Birthday:</label>
                    <input 
                    type="date" 
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    className="standardInput" 
                    required></input>
                </div>
                <div className='labelInputDiv'>
                    <label for="department">Department:</label>
                    <select 
                    name="department" 
                    value={formData.department}
                    onChange={handleChange}
                    className="standardInput"
                    required>
                        <option></option>
                        <option>Software Development</option>
                        {/* Removed this for now as the worksheet says SD department only */}
                        {/* <option>Engineering</option> */}
                    </select>
                </div>
                <div className='labelInputDiv'>
                    <label>Program:</label>
                    <select 
                    name="program" 
                    value={formData.program}
                    onChange={handleChange}
                    className="standardInput" 
                    required>
                        <option></option>
                        <option>Certificate</option>
                        <option>Diploma</option>
                        <option>Post-Diploma</option>
                    </select>
                </div>
                <div className='labelInputDiv'>
                    <label for="term">Term:</label>
                    <select 
                    name="term" 
                    value={formData.term}
                    onChange={handleChange}
                    className="standardInput"
                    required>
                        <option></option>
                        <option>Fall</option>
                        <option>Winter</option>
                        <option>Spring</option>
                        <option>Summer</option>
                    </select>
                </div>
                <div className='labelInputDiv'>
                    <label>User Name:</label>
                    <input 
                    type="text" 
                    name="userName" 
                    value={formData.userName}
                    onChange={handleChange}
                    className="standardInput" 
                    required></input>
                </div>
                <div className='labelInputDiv'>
                    <label>Password:</label>
                    <input 
                    type="text" 
                    name="password" 
                    value={formData.password}
                    onChange={handleChange}
                    className="standardInput" 
                    required></input>
                </div>
                <input type='submit' value="Submit" className="standardButton submitButton"/>    
            </form>    

        </div>

    );
};


export default SignUpForm;