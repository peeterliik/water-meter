import express from express;
require('dotenv').config();

const app = express();
const port = 3000;


app.listen(port, () => {
  console.log(`Water-meter is listening at http://localhost:${port}`)
});