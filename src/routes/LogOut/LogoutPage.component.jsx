import React from 'react';
// I created this page because we have used token for our backend, and this file was needed to actually logout on browser.
const LogOutPage = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.ok) {
        // Clear token and redirect to login
        localStorage.removeItem('authToken');
        alert('Logged out successfully!');
        window.location.href = '/logInPage';
      } else {
        const data = await response.json();
        alert(data.error || 'Logout failed');
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
