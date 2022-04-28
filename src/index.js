const express = require("express");
require("dotenv").config();
require("./db/mongoose");
const cors = require("cors");

const readingRouter = require("./routers");

const app = express();
const port = process.env.PORT || 3008;

app.use(
	cors({
		origin: "http://localhost:3000",
	})
);
app.use(express.json());
app.use(readingRouter);

app.listen(port, () => {
	console.log(`Water-meter is listening at http://localhost:${port}`);
});
