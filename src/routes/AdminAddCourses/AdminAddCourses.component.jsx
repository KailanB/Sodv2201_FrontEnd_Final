import React, { useState, useEffect } from 'react';
import './AdminAddCourses.style.css';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminAddCourses = () => {
    const [course, setCourse] = useState({
        CourseName: '',
        CourseCode: '',
        TermID: '',
        StartDate: '',
        EndDate: '',
        Department: '',
        ProgramID: '',
        Description: ''
    });

    const[terms, setTerms] = useState([]);
    const[programs, setPrograms] = useState([]);

    const[error, setError] = useState(null);
    const[outputMsg, setOutputMsg] = useState(null);
    const[loading, setLoading] = useState(true);

    // const navigate = useNavigate();

    useEffect(() => {

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
                setCourse({
                    ...course, 
                    TermID: termsResponse.data[0].TermID.toString(),
                    ProgramID: programsResponse.data[0].ProgramID.toString()
                });
                setLoading(false);
            }

        }
        catch (err) {

            console.log(err);
            setError(err.message);
        }         

    }

    function escapeHTML(str) {
        return str.replace(/[&<>"']/g, function (char) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            }[char];
        });
    }

    const handleDropdownChange = (e) => {

        
        const {name} = e.target;   
        const selectedIndex = e.target.options.selectedIndex;
        const id = (e.target.options[selectedIndex].getAttribute('id'));
        setCourse({
            ...course, 
            [name]: id
        });

    };

    const handleChange = (e) => {
        
        const { name, value } = e.target;
        setCourse((prevCourse) => ({
            ...prevCourse,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        escapeHTML(course.CourseName);
        escapeHTML(course.Description);
  
        const newCourseData = {
            CourseName: course.CourseName,
            CourseCode: course.CourseCode,
            TermID: course.TermID,
            ProgramID: course.ProgramID,
            Description: course.Description
        };

        if(isNaN(newCourseData.CourseCode))
        {
            setOutputMsg("Invalid Course Code! Code must be a number.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/course', newCourseData, { withCredentials: true });
            if (response.status === 201 || response.status === 200) {
                setOutputMsg('Course added successfully!');
                setCourse({
                    ...course,
                    CourseName: '',
                    CourseCode: '',
                    StartDate: '',
                    EndDate: '',
                    Department: '',
                    Description: ''
                });
            } else {
                setOutputMsg('Failed to add course.');
            }
        } catch (err) {
            console.error('Error adding course:', err);
            setOutputMsg('Error: ' + err.response.data.error)
        }
    };



    if(loading)
    {
        return (
            <div>
                <p>Loading course data...</p>
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
        <div className="unique-page">
            <h3>Add a New Course</h3>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Course Name:</label>
                    <input type="text" name="CourseName" value={course.CourseName} onChange={handleChange} className="standardInput" required />
                </div>
                <div className='form-group'>
                    <label>Course Code:</label>
                    <input type="text" name="CourseCode" value={course.CourseCode} onChange={handleChange} className="standardInput" required />
                </div>
                <div className='form-group'>
                    <label>Term (Winter, Spring, Fall, Summer):</label>
                    <select name="TermID" value={course.TermID || ''} onChange={handleDropdownChange} className="standardInput" required>
                        {terms.map((term, index) => (
                            <option key={index} id={term.TermID} name="Term" value={term.TermID}>{term.Term}</option>
                        ))}
                    </select>
                </div>
                <div className='form-group'>
                    <label>Department:</label>
                    <select name="Department" value={course.Department} onChange={handleChange} className="standardInput" required>
                        {/* only one value exists but this is here for future development */}
                        <option value="Software Development">Software Development</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Program:</label>
                    <select name="ProgramID" value={course.ProgramID || ''} onChange={handleDropdownChange} className="standardInput" required>
                        {programs.map((program, index) => (
                                <option key={index} id={program.ProgramID} value={program.ProgramID}>{program.Credential}</option>
                            ))}
                    </select>
                </div>
                <div className='form-group'>
                    <label>Description:</label>
                    <textarea name="Description" value={course.Description} onChange={handleChange} className="standardInput" rows="4" required></textarea>
                </div>
                <input type="submit" value="Add Course" className="standardButton submitButton" />
                {outputMsg && <p className="errorMessage">{(outputMsg)}</p>}
            </form>
        </div>
    );
};

export default AdminAddCourses;
