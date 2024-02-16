const express = require('express');
const usersController = require('../controllers/usersController')

const router = express.Router();

  router.route('/').get(async (req,res)=> {
      try {
        const result = await usersController.getAllUsers();
        res.json(result);
      } catch (error) {
        res.json(error);
      }
    })

router.get('/filtered-users', async (req, res) => {
    try {
      console.log('====================================');
      console.log(req.query.userId);
      console.log('====================================');
        const loggedInUserId = req.query.userId; // Assuming userId is available in the request (e.g., extracted from JWT)
        const filteredUsers = await usersController.fetchFilteredUsers(loggedInUserId);
        res.json(filteredUsers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

    
  module.exports = router;