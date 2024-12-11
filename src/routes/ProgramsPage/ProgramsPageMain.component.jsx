import React, { useState, useEffect } from 'react';
import './ProgramsPage.style.css';
import ProgramDiv from './ProgramDiv.component.jsx';
import ProgramSearch from './ProgramSearch.component.jsx'; //I Uncomment this part to use and try
import axios from 'axios';

const ProgramsPageMain = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/programs')
            .then(res => {
                setPrograms(res.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div>
                <h2>Software Development Programs:</h2>
                <p>Programs Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h2>Software Development Programs:</h2>
                <p>Error retrieving data: {error}</p>
            </div>
        );
    }

    // Filter programs based on search term
    const filteredPrograms = programs.filter(program =>
        program.Department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.Credential.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (program.Code && program.Code.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div>
            <h2>Software Development Programs:</h2>
            <ProgramSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <br />
            <div className="programDisplay">
                {filteredPrograms.map((program, index) => (
                    <div key={index}>
                        <ProgramDiv program={program} />
                        <br />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgramsPageMain;
