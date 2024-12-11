import React from 'react';
import './CoursePageNew.style.css';

const ProgramSpecificCourseDiv = (props) => {
  const { Course } = props;

  return (
    <div className="courseDiv">
      <h4>Course: {Course.CourseName} ({Course.CourseCode})</h4>
      <p><strong>Term:</strong> {Course.Term}</p>
      <p><strong>Start Date:</strong> {Course.StartDate}</p>
      <p><strong>End Date:</strong> {Course.EndDate}</p>
      <p><strong>Department:</strong> {Course.Department}</p>
      <p><strong>Program:</strong> {Course.Credential || Course.ProgramID}</p>
      <p><strong>Description:</strong> {Course.Description}</p>
    </div>
  );
};

export default ProgramSpecificCourseDiv;
