import React, { useState, useEffect } from 'react';
import './ProgramsPage.style.css';
import ProgramDiv from './ProgramDiv.component.jsx';
import ProgramSearch from './ProgramSearch.component.jsx';


const ProgramsPageMain = () => {

    const[programs, setPrograms] = useState([]);

    useEffect(() => {

        const programs = JSON.parse(localStorage.getItem('programs')) || [];

        if(programs)
        {
            setPrograms([...programs]);  
        }
    }, []);

    return (

        <div>
            <h2>Software Development Programs:</h2>
            {/* <ProgramSearch /> */}
            <br />
            <div className="programDisplay">
                {programs.map((program, index) => (
                    <div key={index}>
                        <ProgramDiv program={program}/>
                        <br />
                    </div>
                    
                ))}
            </div>
            
        </div>

    );
};


export default ProgramsPageMain;