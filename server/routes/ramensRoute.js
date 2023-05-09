const express = require('express');
const router = express.Router();
const Ramen = require('../models/ramenModel');

router.get('/getallramens', async (req, res) => {
    try {
        const ramens = await Ramen.find({});
        res.send(ramens);
    } catch (error) {
        return res.status(400).json({ error });
    }
    
});

module.exports = router;