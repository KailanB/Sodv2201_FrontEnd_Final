import React, { useState, useEffect } from 'react';
import './AdminEditCourses.style.css';
import { useLocation } from 'react-router-dom'; 

const AdminEditCourses = () => {
    const location = useLocation();
    const { course } = location.state;  // Access course from location state

    const [editedCourse, setEditedCourse] = useState(course);

    useEffect(() => {
        
        setEditedCourse(course); // Update form if course data changes
        
    }, [course]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedCourse((prevCourse) => ({
            ...prevCourse,
            [name]: value
        }));
        // alert(editedCourse.CourseCode);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const savedPrograms = JSON.parse(localStorage.getItem("programs")) || [];
        // search program course data to find course with matching id
        savedPrograms.forEach(program => 
            program.courses.forEach((localStorageCourse, index) => {

                if(localStorageCourse.CourseId === editedCourse.CourseId)
                {
                    // update local storage data array at index of matching id with new course data
                    program.courses[index] = editedCourse;
                    
                    localStorage.setItem('programs', JSON.stringify(savedPrograms));
                   
                }
            })
        )
        window.location.href = "/coursesPage";
    };

    const handleDelete = () => {

        alert("Course deleted!");
        const savedPrograms = JSON.parse(localStorage.getItem("programs")) || [];
         
        savedPrograms.forEach(program => 
            program.courses.forEach((localStorageCourse, index) => {

                if(localStorageCourse.CourseId === course.CourseId)
                {
                    // delete from local storage data array at index of matching id
                    program.courses.splice(index, 1);
                    
                    localStorage.setItem('programs', JSON.stringify(savedPrograms));
                }
            })
        )
        window.location.href = "/coursesPage";
    };
    
    const handleCancel = () => {
        
        window.location.href = "/coursesPage";
    };


    return (
        <div className="unique-page">
            <h3>Edit Course</h3>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Course Name:</label>
                    <input type="text" name="CourseName" value={editedCourse.CourseName} onChange={handleChange} className="standardInput" required />
                </div>
                <div className='form-group'>
                    <label>Course Code:</label>
                    <input type="text" name="CourseCode" value={editedCourse.CourseCode} onChange={handleChange} className="standardInput" required />
                </div>
                <div className='form-group'>
                    <label>Term:</label>
                    <input type="text" name="Term" value={editedCourse.Term} onChange={handleChange} className="standardInput" required />
                </div>
                <div className='form-group'>
                    <label>Start Date:</label>
                    <input type="date" name="StartDate" value={editedCourse.StartDate} onChange={handleChange} className="standardInput" required />
                </div>
                <div className='form-group'>
                    <label>End Date:</label>
                    <input type="date" name="EndDate" value={editedCourse.EndDate} onChange={handleChange} className="standardInput" required />
                </div>
                <div className='form-group'>
                    <label>Department:</label>
                    <select name="Department" value={editedCourse.Department} onChange={handleChange} className="standardInput" required>
                        <option value="">Select Department</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Nursing">Engineering</option>
                        <option value="Business">Business</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Program:</label>
                    <select name="Program" value={editedCourse.Program} onChange={handleChange} className="standardInput" required>
                        <option value="">Select Program</option>
                        <option value="Certificate">Certificate</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Post-Diploma">Post-Diploma</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Description:</label>
                    <textarea name="Description" value={editedCourse.Description} onChange={handleChange} className="standardTextArea" rows="4" required></textarea>
                    <div className="button-group">

                    <button className="standardButton deleteButton" onClick={handleDelete}>Delete Course</button>
                    <button className="standardButton cancelButton" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="standardButton saveButton" onClick={handleSubmit}>Save Changes</button>

                </div>
                </div>
            </form>
        </div>
    );
};

export default AdminEditCourses;