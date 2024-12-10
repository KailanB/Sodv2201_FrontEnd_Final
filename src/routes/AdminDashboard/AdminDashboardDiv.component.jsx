
import './AdminDashboard.style.css';


const AdminDashboardDiv = (props) => {


    
    // const {fullName, email, message} = props;
    const {user} = (props);


    return (


    <div className="dashboard-container">
        <div className="info-box">
            <h2>Admin Dashboard</h2>
            <div className="info-item">
                <strong>Name:</strong> {user.FirstName} {user.LastName}
            </div>
            <div className="info-item">
                <strong>Status:</strong> {user.Status}
            </div>
        </div>
    </div>


    );
};


export default AdminDashboardDiv;