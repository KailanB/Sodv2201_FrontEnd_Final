import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './ContactPage.style.css';

const ContactPage = () => {


    const[formData, setFormData] = useState({
        fullName: '', 
        email: '',
        message: '',

    });

    const handleChange = (e) => {

        const {name, value} = e.target;
        setFormData({
            ...formData, 
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddUser(formData);
        setFormData({
            fullName: '', 
            email: '',
            message: '',

        });
    }

    const onAddUser = (message) => {

       
        // pull local storage of messages
        const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
        //if storage exists
        // add new message
        savedMessages.push(message);
        // save updated array
        localStorage.setItem('messages', JSON.stringify(savedMessages));
      
    };


    return (
        <div className="admin-page">
            <h3>Contact Us</h3>
            <div className="contact-container">
                {/* Left Box */}
                <div className="contact-info">
                    <h4>Get in Touch</h4><br></br>
                    <p>Email: bvc@gmail.com</p><br></br>
                    <p>Phone: (123) 456-7890</p><br></br>
                    <p>Or Contact Us Via:</p><br></br>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} size="2x" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} size="2x" />
                        </a>
                    </div>
                </div>

                {/* Right Box - Contact Form */}
                <form className="new-group" action="/submit" method="POST" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name:</label>
                        <input 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        type="text" 
                        id="fullName" 
                        className="standardInput" 
                        required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email" 
                        id="email" 
                        className="standardInput" 
                        required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        id="message" 
                        className="standardInput" 
                        rows="4" 
                        required />
                    </div>
                    <button type="submit" className="submitButton">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
