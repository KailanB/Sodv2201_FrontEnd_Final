import './CoursePageNew.style.css';
import { GetCookieByName } from '../../Utilities.js';

const CourseDiv = (props) => {

    const {Course, RegisterCourse, EditCourse} = (props);
    let userEmail = GetCookieByName("userEmail=");
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    let userExists = savedUsers.find(savedUser => savedUser.email.toLowerCase() === userEmail.toLowerCase());

    if(userExists)
    {
        // if student return div with register button
        if(userExists.status === "Student")
            {
                return (
        
        
                    <div className="courseDiv">
                        <h4>Course: {Course.CourseName}{Course.CourseCode}</h4>
                        <p><strong>Term:</strong> {Course.Term}</p>
                        <p><strong>Start Date:</strong> {Course.StartDate}</p>
                        <p><strong>End Date:</strong> {Course.EndDate}</p>
                        <p><strong>Department:</strong> {Course.Department}</p>
                        <p><strong>Program:</strong> {Course.Program}</p>
                        <p><strong>Description:</strong> {Course.Description}</p>
                        <button className="standardButton" onClick={() => {
                            RegisterCourse(Course.CourseId)}}
                            >Register</button>
                        {/* <button className="standardButton" onClick={() => {
                            EditCourse(Course.CourseCode)}}
                            >Edit</button> */}
            
                            
                    </div>
                );
            }
            // if admin return div with edit course button
            else if (userExists.status === "Admin")
            {
                return (
        
        
                    <div className="courseDiv">
                        <h4>Course: {Course.CourseName}{Course.CourseCode}</h4>
                        <p><strong>Term:</strong> {Course.Term}</p>
                        <p><strong>Start Date:</strong> {Course.StartDate}</p>
                        <p><strong>End Date:</strong> {Course.EndDate}</p>
                        <p><strong>Department:</strong> {Course.Department}</p>
                        <p><strong>Program:</strong> {Course.Program}</p>
                        <p><strong>Description:</strong> {Course.Description}</p>
                        {/* <button className="standardButton" onClick={() => {
                            RegisterCourse(Course.CourseId)}}
                            >Register</button> */}
                        <button className="standardButton" onClick={() => {
                            EditCourse(Course.CourseCode)}}
                            >Edit</button>
            
                            
                    </div>
                );
            }
    }
    // if user is not logged in
    else 
    {
        return (
        
        
            <div className="courseDiv">
                <h4>Course: {Course.CourseName}{Course.CourseCode}</h4>
                <p><strong>Term:</strong> {Course.Term}</p>
                <p><strong>Start Date:</strong> {Course.StartDate}</p>
                <p><strong>End Date:</strong> {Course.EndDate}</p>
                <p><strong>Department:</strong> {Course.Department}</p>
                <p><strong>Program:</strong> {Course.Program}</p>
                <p><strong>Description:</strong> {Course.Description}</p>
            </div>
        );
    }
    
};


export default CourseDiv;