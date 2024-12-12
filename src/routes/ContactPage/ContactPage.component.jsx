import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './ContactPage.style.css';
import axios from 'axios';



const ContactPage = () => {

    const [response, setResponse] = useState(null);

    const[error, setError] = useState(null);

    const[formData, setFormData] = useState({
        FullName: '', 
        Email: '',
        Message: '',

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
        onSubmit(formData);
        setFormData({
            FullName: '', 
            Email: '',
            Message: '',

        });
    }

    const onSubmit = (message) => {


        const invalidCharacters = /['"<>&]/;
        if(invalidCharacters.test(message.FullName.toString()))
        {
            setError(`Invalid characters in Name - DO NOT use < > " ' or &`);
            return;
        }
        if(invalidCharacters.test(message.Email.toString()))
        {
            setError(`Invalid characters in Email - DO NOT use < > " ' or &`);
            return;
        }
        if(invalidCharacters.test(message.Message.toString()))
        {
            setError(`Invalid characters in Message - DO NOT use < > " ' or &`);
            return;
        }
        
        axios.post('http://localhost:5000/api/admin/messages', message)
        .then(res => {           
            setResponse(res.data.message);
        })
        .catch(error => {
            setResponse(error);
            console.error(error)}
        );
      
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
                        name="FullName"
                        value={formData.FullName}
                        onChange={handleChange}
                        type="text" 
                        id="FullName" 
                        className="standardInput" 
                        required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                        type="email" 
                        id="Email" 
                        className="standardInput" 
                        required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea 
                        name="Message"
                        value={formData.Message}
                        onChange={handleChange}
                        id="Message" 
                        className="standardInput" 
                        rows="4" 
                        required />
                    </div>
                    <button type="submit" className="submitButton">Send Message</button>
                    <br/>
                    <br/>
                    <p>{response}</p>
                    {error && <p>Error: {error}</p>}
                </form>
                
                
            </div>
        </div>
    );
};

export default ContactPage;
