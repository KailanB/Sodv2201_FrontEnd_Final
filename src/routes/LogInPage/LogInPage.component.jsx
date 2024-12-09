import React, { useState } from 'react';
import './LogInPage.style.css';
import { Link } from 'react-router-dom';


// our final project involves integrating with a backend API for user authentication (so, I made authController.js file which is linked to login and logout file)
//Here's an updated version of the LogInPage to align it with backend integration:
const LogInPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear any previous error messages

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                // Store user details or token as needed
                document.cookie = `authToken=${data.token}; path=/;`;
                alert('Login successful! Redirecting...');

                if (data.user.status === 'Student') {
                    window.location.href = '/studentDashboard';
                } else {
                    window.location.href = '/adminDashboard';
                }
            } else {
                setError(data.message || 'Login failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <div className="logInPageMain">
                <div className="logInPageHalf">
                    <div className="logInDiv">
                        <form onSubmit={handleSubmit}>
                            <div className="labelInputDiv">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="standardInput"
                                    required
                                />
                            </div>
                            <div className="labelInputDiv">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="standardInput"
                                    required
                                />
                            </div>
                            {error && <p className="errorMessage">{error}</p>}
                            <button className="standardButton" type="reset">Reset</button>
                            <button className="standardButton" type="button" onClick={() => setFormData({ email: '', password: '' })}>
                                Cancel
                            </button>
                            <input type="submit" value="Log In" className="standardButton" />
                        </form>
                    </div>
                </div>

                <div className="logInPageHalf">
                    <p>
                        Don't have an account? Make one <Link to="/signUpPage">here</Link>!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LogInPage;


//using axios
// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5000/api/auth/login', { email, password }, { withCredentials: true });
//             console.log(response.data);
//         } catch (err) {
//             setError(err.response?.data?.error || 'Login failed');
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
//                 <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                 <button type="submit">Login</button>
//             </form>
//             {error && <p>{error}</p>}
//         </div>
//     );
// };

// export default LogInPage;

