import React, { useState } from 'react';
import './AdminAddCourses.style.css';
import { useNavigate } from 'react-router-dom';

const AdminAddCourses = () => {
    const [course, setCourse] = useState({
        CourseName: '',
        CourseCode: '',
        Term: '',
        StartDate: '',
        EndDate: '',
        Department: '',
        Program: '',
        Description: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse((prevCourse) => ({
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

        // Map to fields expected by the backend
        const newCourseData = {
            CourseName: course.CourseName,
            CourseCode: course.CourseCode,
            TermID: mapTermToTermID(course.Term),
            ProgramID: mapProgramToProgramID(course.Program),
            Description: course.Description
        };

        try {
            const response = await fetch('/api/admin/course', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCourseData),
                credentials: 'include'
            });

            if (response.ok) {
                alert('Course added successfully!');
                navigate('/coursesPage');
            } else {
                const data = await response.json();
                alert(`Error adding course: ${data.error || data.message}`);
            }
        } catch (error) {
            console.error('Error adding course:', error);
            alert('An error occurred while adding the course.');
        }
    };

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
                    <label>Term (e.g. Winter, Spring, Fall, Summer):</label>
                    <input type="text" name="Term" value={course.Term} onChange={handleChange} className="standardInput" required />
                </div>
                <div className='form-group'>
                    <label>Start Date:</label>
                    <input type="date" name="StartDate" value={course.StartDate} onChange={handleChange} className="standardInput" required />
                </div>
                <div className='form-group'>
                    <label>End Date:</label>
                    <input type="date" name="EndDate" value={course.EndDate} onChange={handleChange} className="standardInput" required />
                </div>
                <div className='form-group'>
                    <label>Department:</label>
                    <select name="Department" value={course.Department} onChange={handleChange} className="standardInput" required>
                        <option value="">Select Department</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Business">Business</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Program:</label>
                    <select name="Program" value={course.Program} onChange={handleChange} className="standardInput" required>
                        <option value="">Select Program</option>
                        <option value="Certificate">Certificate</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Post-Diploma">Post-Diploma</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Description:</label>
                    <textarea name="Description" value={course.Description} onChange={handleChange} className="standardInput" rows="4" required></textarea>
                </div>
                <input type="submit" value="Add Course" className="standardButton submitButton" />
            </form>
        </div>
    );
};

export default AdminAddCourses;
