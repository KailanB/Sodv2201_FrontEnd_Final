import './StudentDashboard.style.css';


const StudentDashboardCourseDiv = (props) => {

    const {Course, RemoveCourse} = (props);
    return (


        <div className="courseDiv">
            <h4>Course: {Course.CourseName}{Course.CourseCode}</h4>
            <p><strong>Term:</strong> {Course.Term}</p>
            <p><strong>Start Date:</strong> {Course.StartDate}</p>
            <p><strong>End Date:</strong> {Course.EndDate}</p>
            <p><strong>Department:</strong> {Course.Department}</p>
            <p><strong>Program:</strong> {Course.Credential}</p>
            <p><strong>Description:</strong> {Course.Description}</p>  
            <button className="standardButton" onClick={() => {
                RemoveCourse(Course.CourseID)}}
                >Remove Course</button> 
        </div>


    );
};


export default StudentDashboardCourseDiv;