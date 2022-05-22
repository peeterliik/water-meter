const express = require("express");
const Reading = require("../models/reading");
const dateFns = require("date-fns");
const dateValidation = require("../utils/dateValidation");

const router = new express.Router();

//GET consumption of a given month (example: ?month=3&?year=2022). Default is current
router.get("/consumption/month", async (req, res) => {
	const today = new Date();
	const currentMonth = today.getMonth();
	const currentYear = today.getFullYear();
	let month = Number(req.query.month);
	let year = Number(req.query.year);

	let queryDateStart;
	let queryDateEnd;

	if ((!month && !year) || (month === currentMonth && year === currentYear)) {
		queryDateStart = dateFns.startOfMonth(new Date());
		queryDateEnd = new Date();
	} else {
		if (!dateValidation(month, year)) {
			return res.status(404).send({ error: "Incorrect month or year" });
		}
		queryDateStart = new Date(year, month);
		queryDateEnd = dateFns.endOfMonth(queryDateStart);
	}

	try {
		const readingStart = await Reading.findOne({
			time: {
				$gte: queryDateStart,
				$lte: dateFns.endOfDay(queryDateStart),
			},
		});
		const readingEnd = await Reading.findOne({
			time: {
				$gte: dateFns.startOfDay(queryDateEnd),
				$lte: dateFns.endOfDay(queryDateEnd),
			},
		});

		if (!readingStart || !readingEnd) {
			return res.status(404).send({ error: "No data for the month" });
		}
		const value = readingEnd.value - readingStart.value;
		return res.send({ value });
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
