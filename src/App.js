import { Route, Routes } from "react-router-dom";
import './App.css';

import Home from './routes/Home/Home';
import View from "./view/View";
import ContactPage from "./routes/ContactPage/ContactPage.component";
import ProgramsPageMain from './routes/ProgramsPage/ProgramsPageMain.component.jsx';
import CoursesPage from "./routes/CoursesPageNew/CoursesPage.component.jsx";
import ProgramSpecificCourses from "./routes/CoursesPageNew/ProgramSpecificCourses.component.jsx";

import LogInPage from './routes/LogInPage/LogInPage.component.jsx';
import LogOut from './routes/LogOut/LogoutPage.component.jsx';
 // New import for logout 
import SignUpPage from './routes/SignUpPage/SignUpPage.component.jsx';
import ProfilePage from './routes/Profile/ProfilePage.component.jsx';

import AdminAddCourses from './routes/AdminAddCourses/AdminAddCourses.component.jsx';
import AdminEditCourses from './routes/AdminEditCourses/AdminEditCourses.component.jsx';
import AdminDashboard from './routes/AdminDashboard/AdminDashboard.component.jsx';
import AdminMessagesPage from './routes/AdminMessages/AdminMessagesPage.component.jsx';
import ViewRegisteredStudents from './routes/ViewRegisteredStudents/ViewRegisteredStudents.component.jsx';

import StudentDashboard from './routes/StudentDashboard/StudentDashboard.component.jsx';



function App() {
  return (
    <div>
      <Routes>
        <Route element={<View />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/programsPage" element={<ProgramsPageMain />} />
          <Route path="/logInPage" element={<LogInPage />} />
          <Route path="/logOut" element={<LogOut />} />

          <Route path="/signUpPage" element={<SignUpPage />} />

          <Route path="/profilePage" element={<ProfilePage />} />
          <Route path="/studentDashboard" element={<StudentDashboard />} />


          {/* Protected Routes */}

          {/* <Route path="/profilePage" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/studentDashboard" element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          } /> */}

          {/* Admin Routes */}
          <Route path="/adminAddCourses" element={<AdminAddCourses />} />
          <Route path="/coursesPage" element={<CoursesPage />} />
          <Route path="/coursesPage/:programParam" element={<ProgramSpecificCourses />} />
          <Route path="/adminEditCourses" element={<AdminEditCourses />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/adminMessagesPage" element={<AdminMessagesPage />} />
          <Route path="/viewRegisteredStudents" element={<ViewRegisteredStudents />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
