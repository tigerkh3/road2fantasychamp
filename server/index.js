// database server goes here.
const path = require('path');
const express = require('express');
const axios = require('axios');
require("dotenv").config();
// db methods
const { addPlayer, removePlayer, watchlist } = require('./database/models/index.js');

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

const API_URL = "https://fantasy.espn.com/apis/v3/games/fba/seasons/" + process.env.REACT_APP_SEASON + "/segments/0/leagues/" + process.env.REACT_APP_LEAGUE // Replace this URL with your own

app.use(express.static(path.join(__dirname, "../client/src/dist")))

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

app.post('/removePlayer', (req, res) =>{
  removePlayer(req.body, (result, err) => {
    if (err) {
      console.log('error', err)
    } else {
      res.sendStatus(200)
    }
  })
})

app.get('/playerData', (req, res) => {
  var scoringPeriod = req.query.scoringPeriod;
  var filter = `{"players":{"filterSlotIds":{"value":[0,5,11,1,2,6,3,4]},"filterStatsForCurrentSeasonScoringPeriodId":{"value":[${scoringPeriod}]},"sortAppliedStatTotal":null,"sortAppliedStatTotalForScoringPeriodId":null,"sortStatId":null,"sortStatIdForScoringPeriodId":{"additionalValue":${scoringPeriod},"sortAsc":false,"sortPriority":2,"value":0},"sortPercOwned":{"sortPriority":3,"sortAsc":false},"filterStatus":{"value":["FREEAGENT","WAIVERS"]},"limit":50}}`
  var options = {
    'url': `${API_URL}`,
    'params': {},
    'method': "get",
    'headers': {
      'Cookie': `SWID={${process.env.REACT_APP_SWID}}; espn_s2=${process.env.REACT_APP_ESPN};`
    },
    'withCredentials': 'true'
  }
  options.params.view = 'kona_player_info';
  options.headers['x-fantasy-filter'] = filter;
  axios.default.request(options)
  .then (result => {
    console.log('requested player data')
    res.send(result.data)
  })
})

app.get('/leagueData', (req, res) => {
  var options = {
    'url': `${API_URL}`,
    'params': {},
    'method': "get",
    'headers': {
      'Cookie': `SWID={${process.env.REACT_APP_SWID}}; espn_s2=${process.env.REACT_APP_ESPN};`
    },
    'withCredentials': 'true'
  }

  axios.default.request(options)
  .then (result => {
    console.log('requested league data')
    res.send(result.data)
  })
})

app.get('/matchupData', (req, res) => {
  // get request to public espn api
  var matchupPeriod = req.query.matchupPeriod
  var matchupFilter = `{"schedule":{"filterMatchupPeriodIds":{"value":[${matchupPeriod}]}}}`
  var params = new URLSearchParams()
  params.append("view", 'mMatchupScore')
  params.append("view", 'mBoxscore')
  var options = {
    'url': `${API_URL}`,
    'params': params,
    'method': "get",
    'headers': {
      'Cookie': `SWID={${process.env.REACT_APP_SWID}}; espn_s2=${process.env.REACT_APP_ESPN};`
    },
    'withCredentials': 'true'
  }

  options.headers['x-fantasy-filter'] = matchupFilter;


  axios.default.request(options)
  .then (result => {
    console.log('requested matchup data')
    res.send(result.data)
  })

});


const PORT = process.env.SERVER_PORT || 6001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));