// database server goes here.
const express = require('express');
const axios = require('axios');
require("dotenv").config();
// db methods
const { addPlayer, watchlist } = require('./database/models/index.js');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.get('/', (req, res) => {
  res.send("hi")
})

app.get('/watchlist', (req, res) => {

  watchlist(true, (result, err) => {
    if (err) {
      console.log('watchlist database function error', err)
    } else {
      res.send(result)
    }
  })
})

app.post('/addPlayer', (req, res) => {
  // route to our database
  addPlayer(req.body, (result, err) => {
    if (err) {
      console.log('error', err)
    } else {
      res.sendStatus(200)
    }
  })

});


const PORT = process.env.SERVER_PORT || 6000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));