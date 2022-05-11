const express = require("express");
const getReadingById = require("./get-reading-id");
const getReadings = require("./get-readings");
const getLatestReading = require("./get-latest");
const getConsumptionMonth = require("./get-consumption-month");
const getReadingMonth = require("./get-reading-month");
const sendReading = require("./put-send-reading");
const postReading = require("./post-reading");
const postUser = require("./post-user");
const getUser = require("./get-user");
const putUser = require("./put-user");

const router = new express.Router();

router.use(getReadingById);
router.use(getReadings);
router.use(getLatestReading);
router.use(getConsumptionMonth);
router.use(getReadingMonth);
router.use(sendReading);
router.use(postReading);
router.use(postUser);
router.use(getUser);
router.use(putUser);

/* 
List of routers TO-BE-DONE
OK 1) GET a reading object by ID
OK 2) GET a latest reading
OK 2) GET a month reading
OK 3) GET consumption of the current month
OK 4) GET consumtpion of a given month(s)
5) GET consumption of a given week(s)
5) GET total consumption of current day
6) GET hourly consumption of a given day
7) GET price of the current month

OK a) POST a reading
d) (UPDATE) SEND a reading to a given email
e) 

*/

module.exports = router;
