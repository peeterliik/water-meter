const express = require('express');
const Reading = require('../models/reading');

const router = new express.Router();

router.get('/readings', async (req,res) => {
    try {
        const readings = await Reading.find({});
        if (!readings) {
            return res.status(404).send();
        }
        res.send(readings)
    } catch (error) {
        res.status(500).send(error)
    }
    });

module.exports = router;