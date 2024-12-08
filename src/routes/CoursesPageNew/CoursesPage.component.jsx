import {React, useState, useEffect} from 'react';
import './CoursePageNew.style.css';
import CourseDiv from './CourseDiv.component.jsx';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import { GetCookieByName } from '../../Utilities.js';

const CoursesPage = () => {

    const [courses, setCourses] = useState([]);
    const[user, setUser] = useState([]);


    const [searchTerm, setSearchTerm] = useState('');

    const nav = useNavigate(); // Initialize useNavigate

    useEffect(() => { 

        const savedPrograms = JSON.parse(localStorage.getItem("programs")) || []; 
        
        const savedCourses = [];
        savedPrograms.forEach(program => 
            program.courses.forEach(course =>
                savedCourses.push(course)  
            )
        )
        setCourses([...savedCourses]);

        let userEmail = GetCookieByName("userEmail=");
    
        const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
        let userExists = savedUsers.find(savedUser => savedUser.email.toLowerCase() === userEmail.toLowerCase());

        if(userExists)
        {
            setUser(userExists); 
        }
       

    }, []);


    useEffect(() => {
  
        if(user.status === "Student")
        {

            const savedCourses = courses.filter(course => (
            course.Department.toLowerCase() === user.department.toLowerCase()) &&
            (course.Program.toLowerCase() === user.program.toLowerCase()) 
            )
            setCourses(savedCourses);
        }



    }, [user]);

    const RegisterCourse = (Id) => {

        if(user.courses.length < 5)
        {
            // check if user is registered for courses and if so
            // if they are already registered for this course by searching their course array for a match
            if((user.courses.length > 0) && user.courses.some(course => course.CourseId === Id))
            {
                alert("Already registered for this course");
            }
            else
            {

                const course = courses.find(course => 
                    course.CourseId === Id
                )

                if(course)
                {
                    user.courses.push(course);
                
                    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
                    for(let i = 0; i < savedUsers.length ; i++)
                    {
                        
                        if(savedUsers[i].email.toLowerCase() === user.email.toLowerCase())
                        {
                            
                            savedUsers[i].courses.push(course)
                        }
                    }
                    // remove course from array
                    const newCourses = courses.filter(course => course.CourseId != Id);
                    alert("Successfuly registered for " + course.CourseName + ":" +course.CourseCode);
                    setCourses([...newCourses]);
                    // save everything
                    localStorage.setItem('users', JSON.stringify(savedUsers));
                }
                else
                {
                    console.log("Error adding course to user array");
                }
                
                
            }
            
        }
        else 
        {

            alert("Maxiumum courses you can register for is 5!");
        }
        
        
    }

    // New EditCourse function 
    const EditCourse = (code) => {
        const course = courses.find(c => c.CourseCode === code);
        if (course) {
            // Navigate to the edit course page with the course details
            nav('/AdminEditCourses', { state: { course } });
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    

    return (

    <div>
        <div className="courses-page">
            <h3>Course Registration</h3>
            <input 
                type="text" 
                placeholder="Search Courses..." 
                className="search-bar" 
                value={searchTerm}
                onChange={handleSearch}
            />
        </div>

        <div>
            {courses.filter(course => 
            (course.CourseName.toLowerCase().includes(searchTerm.toLowerCase()) || 
            course.CourseCode.toLowerCase().includes(searchTerm.toLowerCase()))
            ).map((course, index) => (
                <div key = {index }>
                    <CourseDiv Course = {course} RegisterCourse={RegisterCourse} EditCourse={EditCourse}/>
                </div>
                    ))}
        </div>
    </div>

    );
};


export default CoursesPage;