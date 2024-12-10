
import {React, useState, useEffect } from 'react';
import './AdminDashboard.style.css'; 
import AdminDashboardDiv from './AdminDashboardDiv.component.jsx';
import { GetCookieByName } from '../../Utilities.js';
import axios from 'axios';



const AdminDashboard = () => {

  // const[users, setUsers] = useState([]);

  const[user, setUser] = useState([]);

  const[loading, setLoading] = useState(true);
  const[error, setError] = useState(null);


  // // executed first
  // useEffect(() => {
  //   // pull user data from local storage
  //   const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
  //   setUsers([...savedUsers]);

  // }, []);



  useEffect(() => {

    axios.get('http://localhost:5000/api/admin/byId', {withCredentials: true})
        .then(res => {
            setUser(res.data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false);
        });

  }, []);




  // executed after user data is pulled
  // useEffect(() => {
   
  //   // get cookie
  //   let userEmail = GetCookieByName("userEmail=");
  //   // find mathcing user within saved users and save user data to variable
  //   let userExists = users.find(savedUser => savedUser.email.toLowerCase() === userEmail.toLowerCase());
  //   if(userExists)
  //   {
  //     // user user state with collected user info
  //     setUser(userExists);
  //   }
  // }, [users]);

  if(loading)
    {
      return (
      <div>
        <p>Loading student data...</p>
      </div>
        );
    }
    if(error)
      {
        return (
        <div>
          <p>Error loading data ...{error}</p>
        </div>
          );
      }


  return (
    <div>
      <AdminDashboardDiv user={user} />
    </div>
    
  );
};

export default AdminDashboard;
