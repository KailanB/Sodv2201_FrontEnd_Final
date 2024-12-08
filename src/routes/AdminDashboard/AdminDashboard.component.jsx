
import {React, useState, useEffect } from 'react';
import './AdminDashboard.style.css'; 
import AdminDashboardDiv from './AdminDashboardDiv.component.jsx';
import { GetCookieByName } from '../../Utilities.js';

const AdminDashboard = () => {

  const[users, setUsers] = useState([]);

  const[user, setUser] = useState([]);

  // executed first
  useEffect(() => {
    // pull user data from local storage
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers([...savedUsers]);

  }, []);

  // executed after user data is pulled
  useEffect(() => {
   
    // get cookie
    let userEmail = GetCookieByName("userEmail=");
    // find mathcing user within saved users and save user data to variable
    let userExists = users.find(savedUser => savedUser.email.toLowerCase() === userEmail.toLowerCase());
    if(userExists)
    {
      // user user state with collected user info
      setUser(userExists);
    }
  }, [users]);

  return (
    <div>
      <AdminDashboardDiv user={user} />
    </div>
    
  );
};

export default AdminDashboard;
