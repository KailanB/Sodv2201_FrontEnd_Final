
import './StudentDashboard.style.css';


const StudentDashboardDiv = (props) => {

    const {user} = (props);


    return (


        <div>
            <div className="info-item">
                <strong>Name:</strong> {user.firstName} {user.lastName}
            </div>
            <div className="info-item">
                <strong>ID:</strong> {user.studentId}
            </div>
            <div className="info-item">
                <strong>Status:</strong> {user.status}
            </div>
            <div className="info-item">
                <strong>Department:</strong> {user.department}
            </div>
            <div className="info-item">
                <strong>Program:</strong> {user.program}
            </div>
        </div>


    );
};


export default StudentDashboardDiv;