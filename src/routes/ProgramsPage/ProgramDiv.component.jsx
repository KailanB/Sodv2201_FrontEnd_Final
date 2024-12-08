import './ProgramsPage.style.css';

const ProgramDiv = (props) => {


    const {program} = props;

    const NavigateToProgramCourses = (program) =>
    {
        window.location.href ="/coursesPage/" + program;
    }

    return (
        <div className="programDiv" onClick={() => {
            NavigateToProgramCourses(program.code)}}>
            <h2>{program.department}</h2>
            <p>{program.program}</p>
            <p>Term: {program.term}</p>
            <p>Start Date: {program.startDate}</p>
            <p>End Date: {program.endDate}</p>
            <br />
            <p>Program Length: {program.length}</p>
            <br />
            <p>Fees: ${program.fee}</p>
            <p>Program code: {program.code}</p>
        </div>

    );
};


export default ProgramDiv