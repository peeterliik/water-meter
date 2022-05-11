const express = require("express");
const User = require("../models/user");

const router = new express.Router();

router.get("/user", async (req, res) => {
	try {
		const user = await User.findOne();
		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
