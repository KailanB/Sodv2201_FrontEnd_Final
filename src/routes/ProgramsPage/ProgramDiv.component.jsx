import './ProgramsPage.style.css';
import { Link } from 'react-router-dom';

const ProgramDiv = (props) => {

    const {program} = props;

    const NavigateToProgramCourses = (program) =>
    {
        window.location.href ="/coursesPage/" + program;
    }

    return (
        <div className="programDiv"  onClick={() => {
            NavigateToProgramCourses(program.ProgramID)}}>
            <h2>{program.Department}</h2>
            <br />
            <p>{program.Credential}</p>
            <p>Start Date: {program.StartDate.slice(0, 10)}</p>
            <p>End Date: {program.EndDate.slice(0, 10)}</p>
            <br />
            <p>Program Length: {program.Length}</p>
            <br />
            <p>Fees: ${program.Fee}</p>
            <p>Program code: {program.Code}</p>
        </div>
    );
};

export default ProgramDiv;
