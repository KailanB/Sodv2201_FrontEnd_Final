import './ViewRegisteredStudents.style.css';

const RegisteredStudentsDiv = (props) => {

    const {Student} = props

    

    return (

        <div className="profileDiv">
            <h2>{Student.FirstName} {Student.LastName}</h2>
            <p>StudentID: {Student.StudentID}</p>
            <p>Birthday: {Student.Birthday}</p>
            <p>Department: {Student.Department}</p>
            <p>Program: {Student.Credential}</p>
            <p>Username: {Student.UserName}</p>
            <br />
            <p><strong>Contact information: </strong></p>
            <p>Email: {Student.Email}</p>
            <p>Phone: {Student.PhoneNumber}</p>
        </div>
    );

};

export default RegisteredStudentsDiv;