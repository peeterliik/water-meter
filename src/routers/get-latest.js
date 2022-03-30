const express = require('express');
const Reading = require('../models/reading');

const router = new express.Router();

router.get('/readings/latest', async (req, res) => {
    try {
        const reading = await Reading.findOne().sort({'_id':-1}).limit(1);
        if (!reading) {
            return res.status(404).send();
        }
        res.send(reading)
    } catch (error) {
        res.status(500).send(error)
    };
});

module.exports = router;