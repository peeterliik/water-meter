const express = require('express');
const Reading = require('../models/reading');
const dateFns = require('date-fns');
const dateValidation = require('../utils/dateValidation');

const router = new express.Router();

//GET reading of a given month. Current reading for an ongoing month. Default is current month. --?month=2&year=2022
router.get('/readingmonth', async (req, res) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    let month = req.query.month;
    let year = req.query.year;
    let queryDate;
    
    if ((!month && !year) || (month === currentMonth && year === currentYear)) {
        queryDate = today;
    } else {
        if (!month) {
            month = currentMonth;
        }
        if (!year) {
            year = currentYear
        }
        if (!dateValidation(month, year)) {
            return res.status(404).send({error: 'Incorrect month or year'});
        } 
        queryDate = dateFns.endOfMonth(new Date(year, month));
    }
    
    try {
        const reading = await Reading.findOne({ 
            time: {
                $gte: dateFns.startOfDay(queryDate),
                $lte: queryDate
            }     
        });
        if (!reading) {   //TO-DO . Should check previous day if current day data not valid
            return res.status(404).send({error: 'No data for the month'})
        }
        return res.send(reading);

    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router;