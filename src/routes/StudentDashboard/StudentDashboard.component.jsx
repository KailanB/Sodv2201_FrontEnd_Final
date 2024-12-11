import {React, useState, useEffect } from 'react';
import './StudentDashboard.style.css';
import StudentDashboardCourseDiv from './StudentDashboardCourseDiv.component.jsx';
import StudentDashboardDiv from './StudentDashboardDiv.component.jsx';
import axios from 'axios';

// import jwtDecode from 'jwt-decode';


const StudentDashboard = () => {

  //const { name, id, status, department, program } = props;
  const [userCourses, setUserCourses] = useState([]);

  // const[users, setUsers] = useState([]);
  const[user, setUser] = useState([]);

  const[loading, setLoading] = useState(true);
  const[error, setError] = useState(null);

  useEffect(() => {

    axios.get('http://localhost:5000/api/students/byId', {withCredentials: true})
        .then(res => {
            setUser(res.data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false);
        });

  }, []);

  useEffect(() => {

    const url = 'http://localhost:5000/api/courses/' + user.StudentID;
    axios.get(url, {withCredentials: true})
      .then(res => {

        setUserCourses([...res.data]);
      })
      .catch((error) => {

        console.error(error);
      });


  }, [user]);

  // useEffect(() => {
   

  //   let userEmail = GetCookieByName("userEmail=");
  //   let userExists = users.find(savedUser => savedUser.email.toLowerCase() === userEmail.toLowerCase());
  //   if(userExists)
  //   {
  //     // check first that there is courses to add to state
  //     if(userExists.courses.length > 0)
  //     {
  //       setUserCourses([...userExists.courses]);
  //     }
  //     setUser(userExists);
      
  //   }
  // }, [users]);


    
  const RemoveCourse = (courseID) => {

    const url = 'http://localhost:5000/api/courses/student/' + user.StudentID + "/" + courseID;
    axios.delete(url, {withCredentials: true})
      .then(() => {
        const updatedCourses = userCourses.filter(course => course.CourseID !== courseID);
        setUserCourses([...updatedCourses]);
      })
      .catch((error) => {
        console.error(error);
      });




    // const index = user.courses.findIndex(course => course.CourseCode === code);
    
    // const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    // for(let i = 0 ; i < savedUsers.length ; i++)
    // {
    //   // find user within array via email
    //   if(savedUsers[i].email.toLowerCase() === user.email.toLowerCase())
    //   {
    //     // splice course at index
    //     savedUsers[i].courses.splice(index, 1);
    //     localStorage.setItem('users', JSON.stringify(savedUsers));
    //   }
    //   else{
    //     console.log("error finding user!");
    //   }
    // }
    // // splice user.course
    // user.courses.splice(index, 1);
    // const updatedCourses = user.courses;
    // // update courses so page immediately updates change
    // setUserCourses([...updatedCourses]);
    

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

// error ?  :

  return (
    <div>
      <div className="dashboard-container">
        <div className="info-box">
          <h2>Student Dashboard</h2>
            <StudentDashboardDiv user={user}  />
            {/* <StudentDashboardDiv user={user} /> */}
        </div>
        <div className="info-box notifications">
          <h3>Notifications</h3>
          <ul>
              <li>Upcoming Exam: Mathematics - 12th November</li>
              <li>Fee Due: Pay by 15th November</li>
          </ul>
        </div>
      </div>
      <div>
          {userCourses.map((course, index) => (
            <div>
              <StudentDashboardCourseDiv Course = {course} RemoveCourse={RemoveCourse}/>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
