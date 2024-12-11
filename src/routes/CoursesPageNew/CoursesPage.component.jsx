import {React, useState, useEffect} from 'react';
import './CoursePageNew.style.css';
import CourseDiv from './CourseDiv.component.jsx';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import { GetCookieByName } from '../../Utilities.js';
import axios from 'axios';



const CoursesPage = () => {

    const [courses, setCourses] = useState([]);
    const [userCourses, setUserCourses] = useState([]);
    const[user, setUser] = useState(null);


    const [searchTerm, setSearchTerm] = useState('');

    const nav = useNavigate(); // Initialize useNavigate

    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    const[registerIndex, setRegisterIndex] = useState([]);


    const[role, setRole] = useState(null);


    useEffect(() => {
        let userRole = GetCookieByName("role=");
        setRole(userRole);
    }, []);
  
    // https://devtrium.com/posts/async-functions-useeffect 
    // adding async to useEffect
    useEffect(() => {
       
        // to handle hooks and set we check to make sure role has been properly assessed and updated from null
        if(role !== null)
        {
            FetchUserData();
        }


    }, [role]);


    
    useEffect(() => {

        // then once we have properly fetched user data and set our user to something other than null we fetch the course data
        // this ensure that course data is processed and filtered, if necessary, 
        // based on the student logged in and which credential (diploma, certificate, post-diploma etc.) they are registered with
        if(user !== null)
        {
            FetchCourseData();
        }


    }, [user]);

    const FetchUserData = async () => {

        
        
        if(role === 'student')
            {
                
                try{
                    const userResponse = await axios.get('http://localhost:5000/api/students/byId', {withCredentials: true});
                    setUser(userResponse.data);
                    
                }
                catch (error) {
                    console.log(error);
                    setError(error.message);
                }
                
            }
            else
            {
                setUser('Guest');
            }
    

    }


    const FetchCourseData = async () => {

        try
        {
            const coursesResponse = await axios.get('http://localhost:5000/api/courses');
            if(user.Status === "Student")
            {   
                
                const studentFilteredCourses = coursesResponse.data.filter(course => (course.ProgramID === user.ProgramID && 
                    course.Credential === user.Credential
                ))
                setCourses([...studentFilteredCourses]);

                const url = 'http://localhost:5000/api/courses/' + user.StudentID;
                const studentCoursesResponse = await axios.get(url, {withCredentials: true});
                setUserCourses([...studentCoursesResponse.data]);
            }
            else
            {
                setCourses([...coursesResponse.data]);
            }
        }
        catch (error)
        {
            console.log(error);
            setError(error.message);
        }
        
        setLoading(false);


    }




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