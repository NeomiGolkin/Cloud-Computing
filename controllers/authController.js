// controllers/authController.js
const { createUser, getUserByCredentials } = require('../models/userModel');

const bcrypt = require('bcrypt');

async function registerUser(req, res) {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); 
        await createUser(username, hashedPassword);
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Registration error: ', error);
        res.status(500).send('Error registering user');
    }
}

async function loginUser(req, res) {
    const { username, password } = req.body; 
    console.log('Request body:', req.body); 

    try {
        const user = await getUserByCredentials(username); 
        console.log('User found in DB:', user); 
        if (user) {
            const hashedPassword = user.Password;
            console.log('Hashed password from DB:', hashedPassword); 
            console.log('Entered password:', password); 

            const isMatch = await bcrypt.compare(password, hashedPassword); 
            console.log('Password match:', isMatch); 

            if (isMatch) {
                res.send('Logged in successfully'); 
                          
            } else {
                res.status(401).send('Invalid login credentials'); 
            }
        } else {
            res.status(401).send('Invalid login credentials'); 
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Connection error'); 
    }
}

module.exports = { registerUser, loginUser };