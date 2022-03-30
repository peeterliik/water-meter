const express = require('express');
const getReadingById = require('./get-reading-id');
const getReadings = require('./get-readings');
const getLatestReading = require('./get-latest');

const Reading = require('../models/reading');
const router = new express.Router();
const sendMail = require('../utils/email-sender');

router.use(getReadingById);
router.use(getReadings);
router.use(getLatestReading);

//GET month reading (example: ?month=3?year=2022). Default is current
router.get('/reading/', async (req,res) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const month = req.query.month;
    if (!month) {
        month = currentMonth;
    } else {
        month-=1;
    }
    
    const year = req.query.year;
    if (!year) {
        year = currentYear
    }
    
    try {
        const reading = await Reading.find({ time: {
            $gte: new Date()
        } })
    } catch (error) {
        
    }
})

//POST a reading
router.post('/reading', async (req, res) => {
    const reading = new Reading(req.body);
    try {
        await reading.save();
        res.status(201).send(reading);
    } catch (error) {
        res.status(400).send(error);
    };
});

//(UPDATE) SEND a reading to a given email
router.patch('/reading/:id/to/:email', async (req, res) => {

})

/* 
List of routers TO-BE-DONE
OK 1) GET a reading object by ID
OK 2) GET a latest reading
2) GET a month reading
3) GET consumption of the current month
4) GET consumtpion of a given month(s)
5) GET consumption of a given week(s)
5) GET total consumption of current day
6) GET hourly consumption of a given day
7) GET price of the current month
8) GET current month compared to previous month

OK a) POST a reading
d) (UPDATE) SEND a reading to a given email
e) 

*/

module.exports = router;
