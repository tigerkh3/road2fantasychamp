// fantasy connection for our landing page
// react imports
import React, { useState, useEffect } from "react";
// global styles for bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Container, Row, Col, Media, Card } from "reactstrap"
import { data, images } from "./mock-data/lp-data.js"
import "../../../dist/style.css";
const axios = require('axios');

// also need my own swid and espn_s2 cookies to access private leagues
// import dotenv variables for this section
import {SERVER_PORT, PROXY_URL, REACT_APP_SEASON, REACT_APP_LEAGUE, REACT_APP_SWID, REACT_APP_ESPN} from "@env"



function FantasyTrackerLP () {

  // useStates
  const [matchupData, setMatchupData] = useState({})
  const [leagueTeams, setLeagueTeams] = useState({})
  const [matchupPeriod, setMatchupPeriod] = useState(0)

  // need to start with a useEffect should ping the ESPN api for data
  useEffect( () => {
    // make a request to our proxy server
    // we want a basic request to ESPN API to return to us our list of teams

    axios.get(`http://localhost:${SERVER_PORT}/leagueData`)
    .then ((res, err) => {
      if (err) {
        console.log('error', err)
      } else {
        var leagueIds = {};
        for (var i = 0; i < res.data.teams.length; i++) {
          leagueIds[res.data.teams[i].id] = res.data.teams[i].abbrev;
        }
        setLeagueTeams(leagueIds)
        setMatchupPeriod(res.data.status.currentMatchupPeriod)

        // send our request for our specific match up here
        var options = {
          'url': `http://localhost:${SERVER_PORT}/matchupData`,
          'params': {
            matchupPeriod: res.data.status.currentMatchupPeriod
          }
        }
        axios.default.request(options)
        .then (result => {
          for (var i = 0; i < result.data.schedule.length; i++) {
            if (result.data.schedule[i].away.teamId === 15 || result.data.schedule[i].home.teamId === 15) {
              setMatchupData(result.data.schedule[i])
            }
          }
        })
      }
    })
  }, [])

    // create all related components and render out table using map on the data received from api
    if (matchupData.home) {
      return (
        <Container style={{background: "#313131", marginBottom: "2.5%", borderRadius: "12.5px"}}>
          <Row style={{background: "#212121", borderBottom: "solid black 1px", textAlign: "center", borderTopLeftRadius: "12.5px", borderTopRightRadius: "12.5px"}}>
            <Col style={{padding: "0"}}>
              <Container>
                <h1 style={{color: "white", padding: "2%"}}>Week {matchupPeriod}
                </h1>
              </Container>
            </Col>
          </Row>
          <Row style={{borderBottom: "solid black 1px"}}>
            <Col xs="4" sm="4" md="4" style={{padding: "2.5% 0%", borderTop: "solid 1px", textAlign: "center"}}>
              <h2 style={{color: "white"}}>
                {leagueTeams[matchupData.home.teamId]}
              </h2>
              <h4 style={{color: "white"}}>
                {matchupData.home.cumulativeScore.wins}-{matchupData.away.cumulativeScore.wins}-{matchupData.away.cumulativeScore.ties}
              </h4>
            </Col>
            <Col xs="4" sm="4" md="4" style={{padding: "2.5% 0%", borderTop: "solid 1px", textAlign: "center"}}>
              <Container style={{height: "100%", width: "100%", position: "relative", padding: "0"}}>
                <h2 style={{color: "white", margin: "0", height: "50%", width: "50%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                  VS
                </h2>
              </Container>
            </Col>
            <Col xs="4" sm="4" md="4" style={{padding: "2.5% 0%", borderTop: "solid 1px", textAlign: "center"}}>
              <h3 style={{color: "white"}}>
                {leagueTeams[matchupData.away.teamId]}
              </h3>
              <h4 style={{color: "white"}}>
                {matchupData.away.cumulativeScore.wins}-{matchupData.home.cumulativeScore.wins}-{matchupData.away.cumulativeScore.ties}
              </h4>
            </Col>
          </Row>
          <Row style={{overflowY: "auto", borderBottomLeftRadius: "12.5px", borderBottomRightRadius: "12.5px"}}>
            <Table style={{margin: "0"}}>
              <thead style={{maxWidth: "100%", background: "#212121"}}>
                <tr style={{textAlign: "center"}}>
                  <th>
                    Team
                  </th>
                  <th>
                    FG%
                  </th>
                  <th>
                    FT%
                  </th>
                  <th>
                    3PM
                  </th>
                  <th>
                    REB
                  </th>
                  <th>
                    AST
                  </th>
                  <th>
                    STL
                  </th>
                  <th>
                    BLK
                  </th>
                  <th>
                    TO
                  </th>
                  <th>
                    PTS
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{textAlign: "center"}}>
                  <th>
                    {leagueTeams[matchupData.home.teamId]}
                  </th>
                  <th>
                    {(matchupData.home.cumulativeScore.scoreByStat["19"].score * 100).toFixed(1)}%
                  </th>
                  <th>
                    {(matchupData.home.cumulativeScore.scoreByStat["20"].score * 100).toFixed(1)}%
                  </th>
                  <th>
                    {matchupData.home.cumulativeScore.scoreByStat["17"].score}
                  </th>
                  <th>
                    {matchupData.home.cumulativeScore.scoreByStat["13"].score}
                  </th>
                  <th>
                    {matchupData.home.cumulativeScore.scoreByStat["3"].score}
                  </th>
                  <th>
                    {matchupData.home.cumulativeScore.scoreByStat["2"].score}
                  </th>
                  <th>
                    {matchupData.home.cumulativeScore.scoreByStat["1"].score}
                  </th>
                  <th>
                    {matchupData.home.cumulativeScore.scoreByStat["11"].score}
                  </th>
                  <th>
                    {matchupData.home.cumulativeScore.scoreByStat["0"].score}
                  </th>
                </tr>
                <tr style={{textAlign: "center"}}>
                  <th>
                    {leagueTeams[matchupData.away.teamId]}
                  </th>
                  <th>
                    {(matchupData.away.cumulativeScore.scoreByStat["19"].score * 100).toFixed(1)}%
                  </th>
                  <th>
                    {(matchupData.away.cumulativeScore.scoreByStat["20"].score * 100).toFixed(1)}%
                  </th>
                  <th>
                    {matchupData.away.cumulativeScore.scoreByStat["17"].score}
                  </th>
                  <th>
                    {matchupData.away.cumulativeScore.scoreByStat["13"].score}
                  </th>
                  <th>
                    {matchupData.away.cumulativeScore.scoreByStat["3"].score}
                  </th>
                  <th>
                    {matchupData.away.cumulativeScore.scoreByStat["2"].score}
                  </th>
                  <th>
                    {matchupData.away.cumulativeScore.scoreByStat["1"].score}
                  </th>
                  <th>
                    {matchupData.away.cumulativeScore.scoreByStat["11"].score}
                  </th>
                  <th>
                    {matchupData.away.cumulativeScore.scoreByStat["0"].score}
                  </th>
                </tr>
              </tbody>
            </Table>
          </Row>
        </Container>
      )
  }
}

export default FantasyTrackerLP;




// in postman we are able to access our private league's data by sending our league associated
// data in our request as cookies, this gives us a successful return from the api

// how can we get the data we want for our fantasy tracker?

// we mainly want to find out who we are currently playing and the match up spread

// boxscore and scoringperiod id both give us a new return on data, might be able to use this

// we have a sample return for a match up period
// can use an array to sort through the data if it has no inherent order, otherwise
// it might have order based on team id, to which we can easily find ours using index

// investigate data to see how we can access the correct information


// team id stays the same from year to year, so we can store all the team ids
// makes it easier to reflect which team we're against in our match up component

// still trying to find an efficient method of viewing match up score data
// we can only see all of the match up data all at once, can't reduce returned data set size

// we know that there are 12 teams in our league, it always has to be an even size
// we can also return teams in our api query to grab the total teams returned.

// we divide the total teams by 2, that gives us our # of matchups
// since we can only return the entire array, but we don't need the prior match up data for
// the current display, we can skip out on all the prior match ups
// since we know that there are 5 match ups per matchup period, we can multiply the
// current match up period by the current number of match ups to find our starting position
// in the array
// ie. match up period should start at week 0 actually because we need to start at the first index = 0
// of the matchups array
// so the second matchup period would start at index of 5 which is correct
// this allows us to find our match up history set
// we can render out our component based on that but we need the actual match up data now

// we can also add in our matchup boxscore has all the current stats given for that match up
// the categories can be access as such
// "0": points | "1": blocks | "2": steals | "3": assists | "6": reb
// "11": to | "17": 3pm | "19": ft% | "20": fg%

// we can now begin creating our component!