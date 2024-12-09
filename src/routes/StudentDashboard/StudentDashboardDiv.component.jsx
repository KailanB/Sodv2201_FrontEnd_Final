
import './StudentDashboard.style.css';


const StudentDashboardDiv = (props) => {

    const {user} = (props);


    return (


        <div>
            <div className="info-item">
                <strong>Name:</strong> {user.FirstName} {user.LastName}
            </div>
            <div className="info-item">
                <strong>ID:</strong> {user.StudentID}
            </div>
            <div className="info-item">
                <strong>Status:</strong> {user.Status}
            </div>
            <div className="info-item">
                <strong>Department:</strong> {user.Department}
            </div>
            <div className="info-item">
                <strong>Program:</strong> {user.Program}
            </div>
        </div>


    );
};


export default StudentDashboardDiv;