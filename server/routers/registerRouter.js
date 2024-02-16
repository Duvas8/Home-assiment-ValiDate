const express = require('express');
const { registerNewUser, generateIdealPartnerDepiction } = require('../controllers/registerController');

const router = express.Router();

router.route('/').post(async (req, res) => {
    const { email, selfDepiction } = req.body;  
    if (!email) return res.status(400).json("Missing email");
    
    try {
        const result = await registerNewUser({ email, selfDepiction }, res);
        res.json(result);
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
});

router.route('/test').post(async (req, res) => {
    console.log('====================================');
    console.log(req.body);
    console.log('====================================');
    const { selfDepiction } = req.body;  
    console.log(selfDepiction);
    try {
        const result = await generateIdealPartnerDepiction({ selfDepiction });
        res.json(result);
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
});

module.exports = router;
