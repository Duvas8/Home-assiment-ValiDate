const express = require('express');
//const loginController = require('../controllers/loginController')
const axios = require('axios');

const USERS_URL = "http://localhost:5000/users"

const router = express.Router();



router.route('/').post(async (req, res) => {
    
        const  {email}  = req.body;
   
    try {
        // Check if the provided email matches a user
        const response = await axios.get(USERS_URL);
        const { data: users } = response;
        console.log(users, "t");
        const foundUserByEmail = users.find(user => user.email === email);
        console.log(foundUserByEmail);
        if (!foundUserByEmail) return res.sendStatus(401); // Unauthorized
        // If user is found, you can proceed with authentication logic
        // For example, you can generate a JWT token and send it back to the client
        // Or you can set a session cookie for the authenticated user
        // You can add your authentication logic here
         res.status(200).json({foundUserByEmail, message: 'Authentication successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
      
});

module.exports = router;

