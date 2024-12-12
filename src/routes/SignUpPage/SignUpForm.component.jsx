import React, { useState, useEffect } from 'react';
import './SignUpPage.style.css';
import axios from 'axios';
    

const SignUpForm = ({onAddUser}) => {

    // *******************************************************************
    // when creating this form data make sure ALL value names MATCH the route when it pulls from the REQ BODY
    // if casing or anything is different it will NOT PULL THE VALUES

    // in my create student route I have const { FirstName, LastName, Email, Phone, Birthday, Program, Term, UserName, Password } = req.body;
    // originally this form data was written like "firstName" and this was causing errors retrieving the data. 
    // MATCH MATCH MATCH!
    // MATCH THE ORDER, match the names
    // *******************************************************************
    const[formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Phone: '',
        Birthday: '',
        ProgramID: '',
        TermID: '',
        UserName: '',
        Password: '',
        Status: 'Student',
        StudentId: '',
        Department: '',
        Courses: []
    });

    const[terms, setTerms] = useState([]);
    const[programs, setPrograms] = useState([]);
    const[error, setError] = useState(null);
    const[loading, setLoading] = useState(null);

    useEffect(() => {

        // this method populates our dropdown inputs with data from the data base
        // terms and program
        FetchDropdownMenuData(); 

    }, [])

    const FetchDropdownMenuData = async () => {


        try
        {
            const termsResponse = await axios.get('http://localhost:5000/api/data/getTerms')
            setTerms([...termsResponse.data]);

            const programsResponse = await axios.get('http://localhost:5000/api/data/getPrograms')
            setPrograms([...programsResponse.data]);

            

            if(termsResponse.data.length > 0 && programsResponse.data.length > 0)
            {
                // initialize formData to default values of dropdown menu
                // this ensure that no empty values are saved before user makes changes to these menus
                setFormData({
                    ...formData, 
                    TermID: termsResponse.data[0].TermID.toString(),
                    ProgramID: programsResponse.data[0].ProgramID.toString()
                });
            }


            
        }
        catch (err) {

            console.log(err);
            setError(err.message);
        }



        setLoading(false);

    }
    

    const handleChange = (e) => {

        const {name, value} = e.target;
        setFormData({
            ...formData, 
            [name]: value
        });
    };

    // *******************************************************************
    // https://stackoverflow.com/questions/47070997/how-to-get-key-prop-from-react-element-on-change
    // getting ID value instead of input value from dropdown menus
    // in this case we are getting the index (which dropdown menu item is selected)
    // then requesting the attribute "id" for that dropdown menu selection
    // this is then updated to the formData
    // for instance if Diploma is selected Program : 1
    // because the id attribute of Diploma selection is 1
    // *******************************************************************
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
        // onAddUser is a method pass to this component from the parent component "SignUpPage"
        // we then pass all the data collected from the form to that method 
        // which adds the new user to an array
        onAddUser(formData);
        // we do not want to reset form data at all since, if successful we change pages to log in page
        // if not successful it would be annoying to a user to have to input ALL fields again
        
    }

    if(loading)
    {
        return (
        <div>
            <p>Loading student data...</p>
        </div>
        );
    }
    if(error)
    {
        return (
        <div>
            <p>Error loading data ...{error}</p>
        </div>
        );
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
                    <label>Department:</label>
                    <select 
                    name="Department" 
                    value={formData.Department}
                    onChange={handleChange}
                    className="standardInput"
                    required>
                        <option>Software Development</option>
                    </select>
                </div>
                <div className='labelInputDiv'>
                    <label>Program:</label>
                    <select name="ProgramID" onChange={handleDropdownChange} className="standardInput" required>
                        {programs.map((program, index) => (
                                <option key={index} id={program.ProgramID}>{program.Credential}</option>
                            ))}
                    </select>
                </div>
                <div className='labelInputDiv'>
                    <label>Term:</label>
                    <select name="TermID" onChange={handleDropdownChange} className="standardInput" required>
                        {terms.map((term, index) => (
                            <option key={index} id={term.TermID}>{term.Term}</option>
                        ))}

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