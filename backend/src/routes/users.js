const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const UserModel = require("../src/models/users");

const routes = express.Router();

// Ruta de Signup
routes.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Verify is the email already registered
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: 'User created succesfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
});

//  Login
routes.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not founded' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        res.status(200).json({ message: 'Login susccesfully' });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ error: 'Error in login' });
    }
});

// Exportar el router
module.exports = routes;