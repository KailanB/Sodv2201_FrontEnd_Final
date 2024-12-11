import React, { useState, useEffect } from 'react';
import './AdminEditCourses.style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminEditCourses = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { course } = location.state; 

    const [editedCourse, setEditedCourse] = useState(course);

    useEffect(() => {
        setEditedCourse(course);
    }, [course]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedCourse((prevCourse) => ({
            ...prevCourse,
            [name]: value
        }));
    };

    const mapTermToTermID = (term) => {
        switch (term.toLowerCase()) {
            case 'winter': return 1;
            case 'spring': return 2;
            case 'fall': return 3;
            case 'summer': return 4;
            default: return null;
        }
    };

    const mapProgramToProgramID = (program) => {
        switch (program.toLowerCase()) {
            case 'certificate': return 1;
            case 'diploma': return 2;
            case 'post-diploma': return 3;
            default: return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedCourseData = {
            CourseName: editedCourse.CourseName,
            CourseCode: editedCourse.CourseCode,
            TermID: mapTermToTermID(editedCourse.Term),
            ProgramID: mapProgramToProgramID(editedCourse.Program),
            Description: editedCourse.Description
        };

        try {
            const response = await axios.put(`http://localhost:5000/api/admin/courses/${editedCourse.CourseID}`, updatedCourseData, { withCredentials: true });
            if (response.status === 200) {
                alert('Course updated successfully!');
                navigate('/coursesPage');
            } else {
                alert('Failed to update course.');
            }
        } catch (error) {
            console.error('Error updating course:', error);
            alert('An error occurred while updating the course.');
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this course?");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`http://localhost:5000/api/admin/courses/${editedCourse.CourseID}`, { withCredentials: true });
            if (response.status === 200) {
                alert('Course deleted successfully!');
                navigate('/coursesPage');
            } else {
                alert('Failed to delete course.');
            }
        } catch (error) {
            console.error('Error deleting course:', error);
            alert('An error occurred while deleting the course.');
        }
    };

    const handleCancel = () => {
        navigate('/coursesPage');
    };

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
                    <input type="text" name="Term" value={editedCourse.Term || ''} onChange={handleChange} className="standardInput" required />
                </div>
                <div className='form-group'>
                    <label>Start Date:</label>
                    <input type="date" name="StartDate" value={editedCourse.StartDate || ''} onChange={handleChange} className="standardInput" required />
                </div>
                <div className='form-group'>
                    <label>End Date:</label>
                    <input type="date" name="EndDate" value={editedCourse.EndDate || ''} onChange={handleChange} className="standardInput" required />
                </div>
                <div className='form-group'>
                    <label>Department:</label>
                    <select name="Department" value={editedCourse.Department || ''} onChange={handleChange} className="standardInput" required>
                        <option value="">Select Department</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Business">Business</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Program:</label>
                    <select name="Program" value={editedCourse.Program || ''} onChange={handleChange} className="standardInput" required>
                        <option value="">Select Program</option>
                        <option value="Certificate">Certificate</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Post-Diploma">Post-Diploma</option>
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
            </form>
        </div>
    );
};

export default AdminEditCourses;
