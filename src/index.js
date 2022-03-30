const express = require('express');
require('dotenv').config();
require('./db/mongoose');
const readingRouter = require('./routers');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(readingRouter);

app.listen(port, () => {
  console.log(`Water-meter is listening at http://localhost:${port}`)
});