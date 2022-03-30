const express = require('express');
const Reading = require('../models/reading');

const router = new express.Router();

router.get('/reading/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const reading = await Reading.findById(_id);
        if (!reading) {
            return res.status(404).send();
        } 
        res.send(reading)
        } catch (error) {
            res.status(500).send(error)
    };
});

module.exports = router;