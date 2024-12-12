import React, { useState, useEffect } from 'react';
import './AdminEditCourses.style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminEditCourses = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { course } = location.state; 

    const [editedCourse, setEditedCourse] = useState(course);

    const[terms, setTerms] = useState([]);
    const[programs, setPrograms] = useState([]);

    const[error, setError] = useState(null);
    const[updateError, setUpdateError] = useState(null);
    const[loading, setLoading] = useState(true);

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

    useEffect(() => {


        if(programs.length > 0 && terms.length > 0)
        {
            setEditedCourse({
                ...editedCourse,
                course
            });
            setLoading(false);
        }
       

    }, [programs, terms]);

    const handleChange = (e) => {
        
        const { name, value } = e.target;
        setEditedCourse((prevCourse) => ({
            ...prevCourse,
            [name]: value
        }));
    };

    const handleDropdownChange = (e) => {

        
        const {name} = e.target;   
        const selectedIndex = e.target.options.selectedIndex;
        const id = (e.target.options[selectedIndex].getAttribute('id'));
        setEditedCourse({
            ...editedCourse, 
            [name]: id
        });

    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        escapeHTML(editedCourse.CourseName);
        escapeHTML(editedCourse.Description);

        const updatedCourseData = {
            CourseName: editedCourse.CourseName,
            CourseCode: editedCourse.CourseCode,
            TermID: editedCourse.TermID,
            ProgramID: editedCourse.ProgramID,
            Description: editedCourse.Description,
        };

        try {
            const response = await axios.put(`http://localhost:5000/api/courses/${editedCourse.CourseID}`, updatedCourseData, { withCredentials: true });
            if (response.status >= 200 && response.status < 300) {

                navigate('/coursesPage');
            } else {
                setUpdateError("Error: Failed to update course!");
            }
        } catch (err) {
            console.error('Error updating course:', err);
            setUpdateError(err.response.data.error);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this course?");
        if (!confirmDelete) return;

        try {
            // this is how backend server connected http://localhost:5000/api/admin/courses //////change http://localhost:5000/api/courses please change if doesn't work on your end
            const response = await axios.delete(`http://localhost:5000/api/courses/${editedCourse.CourseID}`, { withCredentials: true });
            if (response.status >= 200 && response.status < 300) {
                navigate('/coursesPage');
            } else {
                setUpdateError('Failed to delete course.');
            }
        } catch (error) {
            console.error('Error deleting course:', error);
            setUpdateError("Error Deleting course " + error.message);
        }
    };

    const handleCancel = () => {
        navigate('/coursesPage');
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
            <h3>Edit Course</h3>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Course Name:</label>
                    <input type="text" name="CourseName" value={editedCourse.CourseName || ''} onChange={handleChange} className="standardInput" required />
                </div>
                <div className='form-group'>
                    <label>Course Code:</label>
                    <input type="text" name="CourseCode" value={editedCourse.CourseCode || ''} onChange={handleChange} className="standardInput" required />
                </div>
                <div className='form-group'>
                    <label>Term (Winter, Spring, Fall, Summer):</label>
                    <select name="TermID" value={editedCourse.TermID || ''} onChange={handleDropdownChange} className="standardInput" required>
                        {terms.map((term, index) => (
                            <option key={index} id={term.TermID} name="Term" value={term.TermID}>{term.Term}</option>
                        ))}
                    </select>
                </div>
                <div className='form-group'>
                    <label>Department:</label>
                    <select name="Department" onChange={handleChange} className="standardInput" required>
                        <option value="1">Software Development</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Program:</label>
                    <select name="ProgramID" value={editedCourse.ProgramID || ''} onChange={handleDropdownChange} className="standardInput" required>
                        {programs.map((program, index) => (
                                <option key={index} id={program.ProgramID} value={program.ProgramID}>{program.Credential}</option>
                            ))}
                    </select>
                </div>
                <div className='form-group'>
                    <label>Description:</label>
                    <textarea name="Description" value={editedCourse.Description || ''} onChange={handleChange} className="standardTextArea" rows="4" required></textarea>
                    <div className="button-group">
                        <button type="button" className="standardButton deleteButton" onClick={handleDelete}>Delete Course</button>
                        <button type="button" className="standardButton cancelButton" onClick={handleCancel}>Cancel</button>
                        <button type="submit" className="standardButton saveButton">Save Changes</button>
                    </div>
                </div>
                {updateError && <p className="errorMessage">{(updateError)}</p>}
            </form>
            
        </div>
    );
};

export default AdminEditCourses;
