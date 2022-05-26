const express = require("express");
const User = require("../models/user");

const router = new express.Router();

router.patch("/user", async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["name", "address", "recipient", "schedule"];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid updates!" });
	}
	try {
		const user = await User.findOne();
		updates.forEach((update) => (user[update] = req.body[update]));
		await user.save();
		res.send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

module.exports = router;
