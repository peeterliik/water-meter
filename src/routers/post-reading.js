const express = require("express");
const Reading = require("../models/reading");

const router = new express.Router();

router.post("/reading", async (req, res) => {
	const reading = new Reading(req.body);
	try {
		await reading.save();
		res.status(201).send(reading);
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
