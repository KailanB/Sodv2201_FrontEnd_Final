import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CoursePageNew.style.css';
import ProgramSpecificCourseDiv from './ProgramSpecificCourseDiv.component.jsx';

const ProgramSpecificCourses = () => {
  const { programParam } = useParams(); 
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch courses for the specific program from the backend
    const fetchProgramCourses = async () => {
      try {
        
        const response = await axios.get(`http://localhost:5000/api/admin/courses/program/${programParam}`, { withCredentials: true });
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching program-specific courses:', err);
        setError('Failed to load courses for this program.');
        setLoading(false);
      }
    };

    fetchProgramCourses();
  }, [programParam]);

  if (loading) {
    return <p>Loading program-specific courses...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="programPageContent">
      <h2>Program Courses</h2>
      {/* 
         For now, we just show the courses returned. */}
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
