const express = require('express');
const Reading = require('../models/reading');
const sendMail = require('../utils/email-sender');

const router = new express.Router();
const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];

let value;
let month;

//body = { id?: _id, email: _email, value?: _value, month?: _month }
router.patch('/send', async (req,res) => {
    const email = req.body.email;
    if (!email) {
        return res.send(500).send({ error: 'Must provide an e-mail'})
    }
    const _id = req.body.id;
    if (!_id) {
        value = req.body.value;
        month = req.body.month; 
        if (!value || !month) {
            return res.send(404).send({ error: 'No Id or value or month provided'});
        }
    } else {
        try {
            const reading = await Reading.findById(_id);
            if (!reading) {
                return res.status(404).send({ error: 'Reading not found'});
            } 
            value = reading.value;
            month = monthNames[reading.time.getMonth()];
            reading.sent = true;
            reading.save();
        } catch (error) {
             return res.status(500).send(error)
        };
    };
    try {
        sendMail(month, value, email);  
    } catch (error) {
        return res.status(500).send(error);
    }
    return res.status(200).send({value, email, month})
    });

module.exports = router;