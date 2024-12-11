import React from 'react';
import axios from 'axios';
import './LogOutPage.style.css';

const LogOutPage = () => {
  const handleLogout = async () => {
    try {
      
      const response = await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });

      if (response.status === 200) {
        // Clear token
        localStorage.removeItem('authToken');
        alert('Logged out successfully!');
        window.location.href = '/logInPage';
      } else {
        alert('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>Log Out</h1>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default LogOutPage;
