import './ViewRegisteredStudents.style.css';

const RegisteredStudentsDiv = (props) => {

    const {Student} = props

    

    return (

        <div className="profileDiv">
            <h2>{Student.firstName} {Student.lastName}</h2>
            <p>StudentID: {Student.studentId}</p>
            <p>Birthday: {Student.birthday}</p>
            <p>Department: {Student.department}</p>
            <p>Program: {Student.program}</p>
            <p>Username: {Student.userName}</p>
            <br />
            <p><strong>Contact information: </strong></p>
            <p>Email: {Student.email}</p>
            <p>Phone: {Student.phone}</p>
        </div>
    );

};

export default RegisteredStudentsDiv;