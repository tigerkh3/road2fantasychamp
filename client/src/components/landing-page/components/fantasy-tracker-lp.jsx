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
import {REACT_APP_SEASON, REACT_APP_LEAGUE, REACT_APP_SWID, REACT_APP_ESPN} from "@env"



function FantasyTrackerLP () {

  // useStates
  const [matchupData, setMatchupData] = useState({});
  const [matchupPeriod, setMatchupPeriod] = useState(0);

  // need to start with a useEffect should ping the ESPN api for data
  useEffect( () => {
    // make a request to the ESPN API
    // var urlPrefix = "https://fantasy.espn.com/apis/v3/games/fba/seasons/" + REACT_APP_SEASON + "/segments/0/leagues/segements/0/" + REACT_APP_LEAGUE
    // var urlSuffix = "/?view=mMatchupScore&view=mStatus&view=mBoxscore"
    // var options = {
    //   method: "GET",
    //   mode: "no-cors",
    //   credentials: "include",
    //   headers: {
    //     "Set-Cookie": `{SWID=${REACT_APP_SWID}}`,
    //     "Set-Cookie": `espn_s2=${REACT_APP_ESPN}`,
    //     "Content-Type": 'application/json',
    //   },

    // }

    // fetch(urlPrefix+urlSuffix, options)
    // .then ( (response, error) => {
    //   if (error) {
    //     console.log('error here accessing api', error)
    //   } else {
    //     response.json()
    //     .then ( (result, error) => {
    //       if (error) {
    //         console.log('error parsing api response', error)
    //       } else {
    //         console.log('worked here is data', result);
    //         // wait for the returned data and update use state with new data
    //         setMatchupData(result);
    //       }
    //     })
    //   }
    // })
    // we will eventually move this around to a conditional to first check database for stored data
    // this can reduce overall website transmission and calls to the API since the data set is so large
    // can parse the data into the parts we need instead
  }, [])

  function onClick (e) {
    e.preventDefault();

    axios.get("https://ec2-107-21-87-27.compute-1.amazonaws.com/api")
    .then ((res, err) => {
      console.log('nothing?')
      if (err) {
        console.log('error', err)
      } else {
        console.log('worked', res);
      }
    })
    // fetch(, options)
    // .then ( (response, error) => {
    //   if (error) {
    //     console.log('error here accessing api', error)
    //   } else {
    //     console.log('worked?')
    //     response.json()
    //     .then ( (result, error) => {
    //       if (error) {
    //         console.log('error parsing api response', error)
    //       } else {
    //         console.log('worked here is data', result);
    //         // wait for the returned data and update use state with new data
    //       }
    //     })
    //   }
    // })
  }

    // create all related components and render out table using map on the data received from api
    return (

      <Button onClick={onClick}></Button>
    )
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