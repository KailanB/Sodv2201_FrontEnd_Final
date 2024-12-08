import React, { useState, useEffect } from 'react';
import './ProgramsPage.style.css';
import ProgramDiv from './ProgramDiv.component.jsx';
// import ProgramSearch from './ProgramSearch.component.jsx';
import axios from 'axios';


const ProgramsPageMain = () => {

    const[programs, setPrograms] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    useEffect(() => {

        axios.get('http://localhost:5000/api/programs')
        .then(res => {
            setPrograms([...res.data]);
            setLoading(false);
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false);
        })

    }, []);


    if(loading) return (

        <div>
            <h2>Software Development Programs:</h2>
            <p>Programs Loading...</p>
        </div>
    );

    if(error) return (

        <div>
            <h2>Software Development Programs:</h2>
            <p>Error retrieving data: {error}</p>
        </div>
    );

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