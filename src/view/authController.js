import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { modelGetAdminWithEmail, modelGetAdminPasswordByEmail } from '../models/adminModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
// I created this file only to manage the user authentication and session handling.
// Login endpoint
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await modelGetAdminWithEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const dbPassword = await modelGetAdminPasswordByEmail(email);
        const passwordMatch = await bcrypt.compare(password, dbPassword.Password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.AdminId, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' }); // this is just a temporary expiry you can switch out for testing.
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        console.error('Error during login: ', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Logout endpoint
export const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};
