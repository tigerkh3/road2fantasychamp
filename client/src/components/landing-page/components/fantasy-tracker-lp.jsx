// fantasy connection for our landing page
// react imports
import React, { useState, useEffect } from "react";
// global styles for bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Container, Row, Col, Media, Card } from "reactstrap"
import { data, images } from "./mock-data/lp-data.js"
const axios = require('axios');

// also need my own swid and espn_s2 cookies to access private leagues
// import dotenv variables for this section
import {PROXY_URL, REACT_APP_SEASON, REACT_APP_LEAGUE, REACT_APP_SWID, REACT_APP_ESPN} from "@env"



function FantasyTrackerLP () {

  // useStates
  const [matchupMetaData, setMatchupMetaData] = useState({});
  const [matchupData, setMatchupData] = useState({})
  const [teamIds, setTeamIds] = useState({})

  // need to start with a useEffect should ping the ESPN api for data
  useEffect( () => {
    // make a request to the cors proxy server which will return us API data!
    axios.get(`${PROXY_URL}` + "/api")
    .then ((res, err) => {
      if (err) {
        console.log('error', err)
      } else {
        console.log('fantasy tracker data', res.data);
        setMatchupMetaData(res.data);
        var ids = {};
        // create an object of key values pairs of id to name
        for (var i = 0; i < res.data.teams.length; i++) {
          var currentTeam = res.data.teams[i];
          ids[currentTeam.id] = currentTeam.abbrev + " " + currentTeam.location;
        }

        setTeamIds(ids);

        //res.data.schedule is our array of games, each match up period is 6 objects
        // we know this because we can take the number of teams and divide it by 2 to find the #
        // of match ups per week which would be 6 aka 6 objects
        var matchupPeriodSet = res.data.teams.length / 2;
        // that gives us our ending index for the current week
        var endingIndex = ((res.data.status.currentMatchupPeriod - 15) * matchupPeriodSet);
        // to find our starting index we subtract that by the matchup period set and minus
        // the matchupPeriod set since our ending index is inclusive in slice minus one after
        var startingIndex = endingIndex - (matchupPeriodSet);
        // we can iterate over the starting index until the ending index and if either the home
        // or the away team has an id of 15 then we set out matchupData to that because
        // our id is 15, whether we are home or away is irrelevant
        for (var j = startingIndex; j <= endingIndex; j++) {

          if (res.data.schedule[j].away.teamId === 15 || res.data.schedule[j].home.teamId === 15) {
            var dataSet = res.data.schedule[j];
            setMatchupData(dataSet)
          }
        }
      }
    })
    // we will eventually move this around to a conditional to first check database for stored data
    // this can reduce overall website transmission and calls to the API since the data set is so large
    // can parse the data into the parts we need instead

    // it will also include a request to the API in the case that our database does not have the current
    // date's information we will run an axios call to our imported env variables
    // const API_URL = "https://fantasy.espn.com/apis/v3/games/fba/seasons/" + REACT_APP_SEASON + "/segments/0/leagues/" + REACT_APP_LEAGUE // Replace this URL with your own
    // var options = {
    //   'url': `${API_URL}`,
    //   'method': "get",
    //   'headers': {
    //     'Cookie': `SWID={${process.env.REACT_APP_SWID}}; espn_s2=${process.env.REACT_APP_ESPN};`
    //   },
    //   'withCredentials': 'true'
    // }
    // axios.get(API_URL, options)
    // .then ( (response, error) => {
      // setMatchupData(response.data)
    // })
  }, [])

    // create all related components and render out table using map on the data received from api
    if (matchupData.home) {
      return (
        <Container>
          <Row>
            <Col style={{borderLeft: "solid 1px", borderTop: "solid 1px", borderRight: "solid 1px", textAlign: "center"}}>
              <h2>
                Home
              </h2>
            </Col>
            <Col style={{borderTop: "solid 1px", textAlign: "center"}}>

            </Col>
            <Col style={{borderLeft: "solid 1px", borderTop: "solid 1px", borderRight: "solid 1px", textAlign: "center"}}>
              <h2>
                Away
              </h2>
            </Col>
          </Row>
          <Row style={{border: "solid 1px ", textAlign: "center"}}>
            <Col style={{borderRight: "solid 1px", textAlign: "center"}}>
              <h2>
                {teamIds[matchupData.home.teamId]}
              </h2>
            </Col>
            <Col style={{borderRight: "solid 1px ", textAlign: "center"}}>
              <h2>
                {matchupData.home.cumulativeScore.wins}-{matchupData.away.cumulativeScore.wins}-{matchupData.away.cumulativeScore.ties}
              </h2>
            </Col>
            <Col>
              <h2>
                {teamIds[matchupData.away.teamId]}
              </h2>
            </Col>
          </Row>
          <Row style={{border: "solid 1px "}}>
            <Table>
            <thead>
              <tr style={{textAlign: "center"}}>
                <th style={{textAlign: "left"}}>
                  Team
                </th>
                <th>
                  FG %
                </th>
                <th>
                  FT %
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
                <th>
                  ADD
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{textAlign: "center"}}>
                <th style={{textAlign: "left"}}>
                  {teamIds[matchupData.home.teamId]}
                </th>
                <th>
                  {(matchupData.home.cumulativeScore.scoreByStat["20"].score * 100).toFixed(1)}%
                </th>
                <th>
                  {(matchupData.home.cumulativeScore.scoreByStat["19"].score * 100).toFixed(1)}%
                </th>
                <th>
                  {matchupData.home.cumulativeScore.scoreByStat["17"].score}
                </th>
                <th>
                  {matchupData.home.cumulativeScore.scoreByStat["11"].score}
                </th>
                <th>
                  {matchupData.home.cumulativeScore.scoreByStat["6"].score}
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
                  {matchupData.home.cumulativeScore.scoreByStat["0"].score}
                </th>
              </tr>
              <tr style={{textAlign: "center"}}>
                 <th style={{textAlign: "Left"}}>
                  {teamIds[matchupData.away.teamId]}
                </th>
                <th>
                  {(matchupData.away.cumulativeScore.scoreByStat["20"].score * 100).toFixed(1)}%
                </th>
                <th>
                  {(matchupData.away.cumulativeScore.scoreByStat["19"].score * 100).toFixed(1)}%
                </th>
                <th>
                  {matchupData.away.cumulativeScore.scoreByStat["17"].score}
                </th>
                <th>
                  {matchupData.away.cumulativeScore.scoreByStat["11"].score}
                </th>
                <th>
                  {matchupData.away.cumulativeScore.scoreByStat["6"].score}
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