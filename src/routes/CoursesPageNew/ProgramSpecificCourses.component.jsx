import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CoursePageNew.style.css';
import ProgramSpecificCourseDiv from './ProgramSpecificCourseDiv.component.jsx';

const ProgramSpecificCourses = () => {

  const { programParam } = useParams(); 

  const [program, setProgram] = useState();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    // Fetch courses for the specific program from the backend
    const fetchProgramCourses = async () => {
      try {
        
        
        const response = await axios.get(`http://localhost:5000/api/courses/program/${programParam}`);
        setCourses(response.data);

        const programResponse = await axios.get(`http://localhost:5000/api/programs/${programParam}`);
        setProgram(programResponse.data);

        setLoading(false);

      } catch (err) {
        console.error('Error fetching program-specific courses:', err);
        setError('Failed to load courses for this program.');
        setLoading(false);
      }

    };

    fetchProgramCourses();
  }, []);

  if (loading) {
    return <p>Loading program-specific courses...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="programPageContent">  

      <h2>{program.Department} {program.Credential} Program</h2>
      <div className="courseDiv" >
      
        <p><strong>Start Date: </strong>{program.StartDate}</p>
        <p><strong>Start Date:</strong> {program.EndDate}</p>
        <p><strong>Description:</strong> {program.Description}</p>
        <p><strong>Fee:</strong> ${program.Fee}</p>
      </div>
      <br></br>
      <h3>Courses Available</h3>
      <div>
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div key={index}>
              <ProgramSpecificCourseDiv Course={course} />
              <br />
            </div>
          ))
        ) : (
          <p>No courses found for this program.</p>
        )}
      </div>
      <p>To register, please visit the main courses page.</p>
    </div>
  );
};

export default ProgramSpecificCourses;
