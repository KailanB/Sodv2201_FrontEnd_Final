import './ProfilePage.style.css';
import { GetCookieByName } from '../../Utilities.js';

const ProfileDiv = (props) => {

    const {firstName, lastName, id, email, phone, birthday, department, program, userName} = props



    let userEmail = GetCookieByName("userEmail=");
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser;
    // if user has a cookie check if user is admin or student
    // then return appropriate nav bar
    if(userEmail)
    {   

        currentUser = users.find(user => user.email.toLowerCase() === userEmail.toLowerCase());
        if(currentUser.status == "Admin")
        {
            return (
                
                <div className="profileDiv">
                    <h2>{firstName} {lastName}</h2>
                    <p>Birthday: {birthday}</p>
                    <p>Username: {userName}</p>
                    <br />
                    <p><strong>Contact information: </strong></p>
                    <p>Email: {email}</p>
                    <p>Phone: {phone}</p>
                </div>
            );
        }
        else if (currentUser.status == "Student")
        {
            return (

                <div className="profileDiv">
                    <h2>{firstName} {lastName}</h2>
                    <p>StudentID: {id}</p>
                    <p>Birthday: {birthday}</p>
                    <p>Department: {department}</p>
                    <p>Program: {program}</p>
                    <p>Username: {userName}</p>
                    <br />
                    <p><strong>Contact information: </strong></p>
                    <p>Email: {email}</p>
                    <p>Phone: {phone}</p>
                </div>
            );
        }
    }
    
};

export default ProfileDiv;