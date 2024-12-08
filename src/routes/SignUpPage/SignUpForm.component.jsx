import React, { useState } from 'react';
import './SignUpPage.style.css';

const SignUpForm = ({onAddUser}) => {

    // when creating this form data make sure ALL value names MATCH the route when it pulls from the REQ BODY
    // if casing or anything is different it will NOT PULL THE VALUES

    // in my create student route I have const { FirstName, LastName, Email, Phone, Birthday, Program, Term, UserName, Password } = req.body;
    // originally this form data was written like "firstName" and this was causing errors retrieving the data. 
    // MATCH MATCH MATCH!
    // MATCH THE ORDER, match the names
    const[formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Phone: '',
        Birthday: '',
        Program: '',
        Term: '',
        UserName: '',
        Password: '',
        Status: 'Student',
        StudentId: '',
        Department: '',
        Courses: []
    });

    const handleChange = (e) => {

        console.log('test');
        const {name, value} = e.target;
        setFormData({
            ...formData, 
            [name]: value
        });
    };

    // https://stackoverflow.com/questions/47070997/how-to-get-key-prop-from-react-element-on-change
    // getting ID value instead of input value from dropdown menus
    // in this case we are getting the index (which dropdown menu item is selected)
    // then requesting the attribute "id" for that dropdown menu selection
    // this is then updated to the formData
    // for instance if Diploma is selected Program : 1
    // because the id attribute of Diploma selection is 1
    const handleDropdownChange = (e) => {

        const {name} = e.target;
        const selectedIndex = e.target.options.selectedIndex;
        const id = (e.target.options[selectedIndex].getAttribute('id'));
        setFormData({
            ...formData, 
            [name]: id
        });
    };

    // after submit, prevent default, 
    //add user to parent component and 
    //reset form fields
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // onAddUser is a method pass to this component from the parent component "SignUpPage"
        // we then pass all the data collected from the form to that method 
        // which adds the new user to an array
        onAddUser(formData);
        
        setFormData({
            FirstName: '',
            LastName: '',
            Email: '',
            Phone: '',
            Birthday: '',
            Program: '',
            Term: '',
            UserName: '',
            Password: '',
            Status: 'Student',
            StudentId: '',
            Department: '',
            courses: []
        });
        
    }



    return (

        <div>
            <form onSubmit={handleSubmit}>
                <div className='labelInputDiv'>
                    <label>First Name:</label>
                    <input 
                    type="text" 
                    name="FirstName"
                    value={formData.FirstName}
                    onChange={handleChange}
                    className="standardInput" 
                    required></input>
                </div>
                <div className='labelInputDiv'>
                    <label>Last Name:</label>
                    <input 
                    type="text" 
                    name="LastName"
                    value={formData.LastName}
                    onChange={handleChange}
                    className="standardInput" 
                    required></input>
                </div>
                <div className='labelInputDiv'>
                    <label>Email:</label>
                    <input 
                    type="email" 
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    className="standardInput" 
                    required></input>
                </div>
                <div className='labelInputDiv'>
                    <label>Phone:</label>
                    <input 
                    type="tel" 
                    name="Phone"
                    value={formData.Phone}
                    onChange={handleChange}
                    className="standardInput" 
                    required></input>
                </div>
                <div className='labelInputDiv'>
                    <label>Birthday:</label>
                    <input 
                    type="date" 
                    name="Birthday"
                    value={formData.Birthday}
                    onChange={handleChange}
                    className="standardInput" 
                    required></input>
                </div>
                <div className='labelInputDiv'>
                    <label for="department">Department:</label>
                    <select 
                    name="Department" 
                    value={formData.Department}
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
                    name="Program" 
                    // value={formData.Program}
                    // here I created an id attribute for each dropdown menu item
                    // that way we can refer to the key to send to the request.
                    // in the DB Diploma = 1, Certificate = 2, and Post-Diploma = 3
                    // we can probably populate this data via a request to the DB and then display each item in an option
                    // however for the time being I have hard coded these values to match the DB

                    // we use a different handle change and removed the value = {formData...} because we do not need it to match
                    // the formData is now going to hold an ID value instead of the dropdown menu value
                    onChange={handleDropdownChange}
                    className="standardInput" 
                    required>
                        <option></option>
                        <option id="2">Certificate</option>
                        <option id="1">Diploma</option>
                        <option id="3">Post-Diploma</option>
                    </select>
                </div>
                <div className='labelInputDiv'>
                    <label for="term">Term:</label>
                    <select 
                    name="Term" 
                    // value={formData.Term}
                    onChange={handleDropdownChange}
                    className="standardInput"
                    required>
                        <option></option>
                        <option id="1">Fall</option>
                        <option id="2">Winter</option>
                        <option id="3">Spring</option>
                        <option id="4">Summer</option>
                    </select>
                </div>
                <div className='labelInputDiv'>
                    <label>User Name:</label>
                    <input 
                    type="text" 
                    name="UserName" 
                    value={formData.UserName}
                    onChange={handleChange}
                    className="standardInput" 
                    required></input>
                </div>
                <div className='labelInputDiv'>
                    <label>Password:</label>
                    <input 
                    type="text" 
                    name="Password" 
                    value={formData.Password}
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