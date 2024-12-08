import React from 'react';
import './HomePage.style.css'; 

const Home = () => {
    return (
        <div className="home-page">
            <header className="home-header">
                <h1>Welcome to Our Platform</h1>
                <p>Your pathway to excellence in education</p>
            </header>
            <section className="mission-section">
                <h2>Our Mission</h2>
                <p> We strive to provide a comprehensive education that fosters innovation, critical thinking, and personal growth.</p>
            </section>
            <section className="departments-section">
                <h3>Explore Our Departments</h3>
                <ul>
                    <li>Computer Science</li>
                    <li>Engineering</li>
                    <li>Business Administration</li>
                    <li>Health Sciences</li>
                    <li>Arts and Humanities</li>
                </ul>
            </section>
            <section className="features-section">
                <h3>Key Features</h3>
                <ul>
                    <li>Sign up</li>
                    <li>All programs</li>
                    <li>Course Registration</li>
                    <li>Student Portal</li>
                </ul>
            </section>
            <div className="cta-buttons">
                <button className="standardButton" onClick={() => window.location.href='/programsPage'}>View Programs</button>
                <button className="standardButton" onClick={() => window.location.href='/signUpPage'}>Apply Now</button>
                 
            </div>
        </div>
    );
};

export default Home;