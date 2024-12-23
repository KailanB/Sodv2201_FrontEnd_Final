import  { React, useState, useEffect } from 'react';
import './ViewRegisteredStudents.style.css';
import RegisteredStudentsDiv from './RegisteredStudentsDiv.component.jsx';
import axios from 'axios';

const ViewRegisteredStudents = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchName, setSearchName] = useState("");
    const [searchID, setSearchID] = useState("");
    const [searchProgram, setSearchProgram] = useState("");
    const [searchEnrollmentStatus, setSearchEnrollmentStatus] = useState("");

    const [students, setStudents] = useState([]);

    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    useEffect(() => {

        
        axios.get('http://localhost:5000/api/students', {withCredentials: true})
        .then(res => {
            setStudents([...res.data]);
            setLoading(false);
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false);
        });

    }, []);

    const studentTypes = [
        { type: "Undergraduate", link: "/programsPage" },
        { type: "Certificate", link: "/programsPage" },
        { type: "Diploma", link: "/programsPage" },
        { type: "Post-Diploma", link: "/programsPage" },
    ];

    return (
        <div className="admin-page">
            <h3>View and manage all registered students in various programs.</h3>
            <div className="content-container">
                {/* Left Box - Type of Student */}
                <div className="student-types">
                    <label className="label-light">Type of Student</label>
                    <div className="scrollable">
                        {studentTypes.map((student, index) => (
                            <div key={index} className="student-type">
                                <span>{student.type}</span>
                                <a href={student.link} className="arrow"> ➔ </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Box - Search Bar and Student Info */}
                <div className="search-student">
                    <input 
                        type="text" 
                        className="standardInput search-bar" 
                        placeholder="Search by ID, Name, Course, Program"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="student-info">
                        <label>Name</label>
                        <input 
                        type="text" 
                        className="standardInput" 
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        />

                        <label>Student ID</label>
                        <input 
                        type="text" 
                        className="standardInput"
                        value={searchID}
                        onChange={(e) => setSearchID(e.target.value)}
                        />

                        <label>Program</label>
                        <input 
                        type="text" 
                        className="standardInput" 
                        value={searchProgram}
                        onChange={(e) => setSearchProgram(e.target.value)}
                        />

                        <label>Enrollment Status</label>
                        <input 
                        type="text" 
                        className="standardInput" 
                        value={searchEnrollmentStatus}
                        onChange={(e) => setSearchEnrollmentStatus(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <br></br>
            <div>
                <h3>Registered Students</h3>
            </div>
            
            <div>
                {loading === null ? <p>Loading data...</p> : students.filter(student => 
                (student.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                student.LastName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                student.StudentID.toString().toLowerCase().includes(searchTerm.toLowerCase()) || 
                student.Email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                student.PhoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
                student.Birthday.toLowerCase().includes(searchTerm.toLowerCase()) || 
                student.Department.toLowerCase().includes(searchTerm.toLowerCase()) || 
                student.Credential.toLowerCase().includes(searchTerm.toLowerCase()) || 
                student.UserName.toLowerCase().includes(searchTerm.toLowerCase())) && 
                (student.FirstName.toLowerCase().includes(searchName.toLowerCase()) || 
                student.LastName.toLowerCase().includes(searchName.toLowerCase())) &&
                student.StudentID.toString().toLowerCase().includes(searchID.toLowerCase()) &&
                student.Credential.toLowerCase().includes(searchProgram.toLowerCase()) &&
                student.Department.toLowerCase().includes(searchEnrollmentStatus.toLowerCase())
                ).map((student, index) => (
                    <div key = {index }>
                        <RegisteredStudentsDiv Student = {student}/>
                        <br />
                    </div>
                ))}
                {}
            </div>

        </div>
    );
};

export default ViewRegisteredStudents;
