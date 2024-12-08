// import React, { useState } from 'react';
// import AdminAddCourses from './AdminAddCourses';
// import AdminEditCourses from './AdminEditCourses';

// const AdminCourseManager = () => {
//     const [course, setCourse] = useState({
//         CourseName: '',
//         CourseCode: '',
//         Term: '',
//         StartDate: '',
//         EndDate: '',
//         Department: '',
//         Program: '',
//         Description: ''
//     });

//     // Function to add a course from AdminAddCourses
//     const handleAddCourse = (newCourse) => {

//         // this might have issues may need to re-write it.
//         const allCourses = JSON.parse(localStorage.getItem('courses')) || [];
//         alert(allCourses[0].CourseName);
//         allCourses.push(newCourse);
//         localStorage.setItem('courses', JSON.stringify(allCourses));
        

//         // I don't think we need this one
//         setCourse(newCourse);
//     };

//     // Function to edit course in AdminEditCourses
//     const handleEditCourse = (editedCourse) => {
//         setCourse(editedCourse);
//     };

//     return (
//         <div>
//             <AdminAddCourses onAddCourse={handleAddCourse} />
//             <AdminEditCourses course={course} onEditCourse={handleEditCourse} />
//         </div>
//     );
// };

// export default AdminCourseManager;
