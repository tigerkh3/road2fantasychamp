// client sided server to get it up and running
const express = require('express');
require('dotenv').config();
const app = express();

//static file
app.use(express.static('../src/dist'))


app.listen(process.env.PORT, () => {
  console.log('running on port ' + process.env.PORT)
})