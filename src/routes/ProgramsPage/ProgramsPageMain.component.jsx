import React, { useState, useEffect } from 'react';
import './ProgramsPage.style.css';
import ProgramDiv from './ProgramDiv.component.jsx';
import ProgramSearch from './ProgramSearch.component.jsx'; 
import axios from 'axios';

const ProgramsPageMain = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/programs')
            .then(res => {
                console.log('Response from /api/programs:', res); // Debug log here
                if (res && res.data) {
                    setPrograms(res.data);
                } else {
                    console.error('No data in response');
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching programs:', error);
                setError(err);
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
                <p>Error: {error.response.data.error}. Status Code: {error.response.status}</p>
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
