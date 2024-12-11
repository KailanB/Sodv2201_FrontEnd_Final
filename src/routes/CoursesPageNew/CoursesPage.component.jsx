import {React, useState, useEffect} from 'react';
import './CoursePageNew.style.css';
import CourseDiv from './CourseDiv.component.jsx';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import { GetCookieByName } from '../../Utilities.js';
import axios from 'axios';



const CoursesPage = () => {

    const [courses, setCourses] = useState([]);
    const [userCourses, setUserCourses] = useState([]);
    const[user, setUser] = useState([]);


    const [searchTerm, setSearchTerm] = useState('');

    const nav = useNavigate(); // Initialize useNavigate

    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    const[registerIndex, setRegisterIndex] = useState([]);


    const[role, setRole] = useState("");


    useEffect(() => {
        let userRole = GetCookieByName("role=");
        setRole(userRole);
    }, []);
  
    // https://devtrium.com/posts/async-functions-useeffect 
    // adding async to useEffect
    useEffect(() => {



        const fetchAllData = async () => {

            // change to await instead of .then and .catch
            // put all in a try block or sequence
            // const response = await axios.get('http://localhost:5000/api/courses');
            // const allCourses = response.data

            if(role === 'student')
                {
                    await axios.get('http://localhost:5000/api/students/byId', {withCredentials: true})
                    .then(res => {
                        
                        setUser(res.data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        setError(error.message);
                        setLoading(false);
                    });
                }
                else
                {
                    setUser('Guest');
                }

                await axios.get('http://localhost:5000/api/courses')
                .then(res => {
                        
                    setCourses([...res.data]);
                    console.log(courses);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setLoading(false);
                });

                if(user.Status === "Student")
                {
                    const studentFilteredCourses = courses.filter(course => (course.ProgramID === user.ProgramID && 
                        course.Credential === user.Credential
                    ))
                    setCourses([...studentFilteredCourses]);
                    const url = 'http://localhost:5000/api/courses/' + user.StudentID;
                    await axios.get(url, {withCredentials: true})
                    .then(res => {
        
                        setUserCourses([...res.data]);
                    })
                    .catch((error) => {
        
                        console.error(error);
                    });
                }

        }

        fetchAllData();



    }, [role]);

    // useEffect(() => {



    // });

    useEffect(() => {
  



    }, [user]);




    const RegisterCourse = (courseID) => {

        if(userCourses.length < 5)
        {
            // check if user is registered for courses and if so
            // if they are already registered for this course by searching their course array for a match
            if((userCourses.length > 0) && userCourses.some(course => course.CourseID === courseID))
            {
                alert("Already registered for this course");
            }
            else
            {
                const url = 'http://localhost:5000/api/courses/student/' + user.StudentID + "/" + courseID;
                axios.post(url, null, {withCredentials: true})
                .then(() => {
                    const course = courses.find(course => course.CourseID === courseID);
                    const index = courses.findIndex(course => course.CourseID === courseID);
                    setRegisterIndex(index);
                    setUserCourses([...userCourses, course]);
                })
                .catch((error) => {
                    console.error(error);
                });      
                
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
                    {registerIndex === index && <p>Successfully registered!</p>}
                </div>
                    ))}
        </div>
    </div>

    );
};


export default CoursesPage;




// useEffect(() => { 

//     const savedPrograms = JSON.parse(localStorage.getItem("programs")) || []; 
    
//     const savedCourses = [];
//     savedPrograms.forEach(program => 
//         program.courses.forEach(course =>
//             savedCourses.push(course)  
//         )
//     )
//     setCourses([...savedCourses]);

//     let userEmail = GetCookieByName("userEmail=");

//     const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
//     let userExists = savedUsers.find(savedUser => savedUser.email.toLowerCase() === userEmail.toLowerCase());

//     if(userExists)
//     {
//         setUser(userExists); 
//     }
   

// }, []);






//http://localhost:5000/api/courses/student/1


// const course = courses.find(course => 
//     course.CourseId === Id
// )

// if(course)
// {
//     user.courses.push(course);

//     const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
//     for(let i = 0; i < savedUsers.length ; i++)
//     {
        
//         if(savedUsers[i].email.toLowerCase() === user.email.toLowerCase())
//         {
            
//             savedUsers[i].courses.push(course)
//         }
//     }
//     // remove course from array
//     const newCourses = courses.filter(course => course.CourseId != Id);
//     alert("Successfuly registered for " + course.CourseName + ":" +course.CourseCode);
//     setCourses([...newCourses]);
//     // save everything
//     localStorage.setItem('users', JSON.stringify(savedUsers));
// }
// else
// {
//     console.log("Error adding course to user array");
// }