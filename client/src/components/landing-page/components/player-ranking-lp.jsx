// player ranking section for our landing-page
// watch list carousel for our landing page.
const axios = require('axios');
// import dotenv variables for this section
import {PROXY_URL, REACT_APP_SEASON, REACT_APP_LEAGUE, REACT_APP_SWID, REACT_APP_ESPN} from "@env"
// react imports
import React, { useState, useEffect } from "react";
// global styles for bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Container, Row, Col, Media, Card } from "reactstrap"
import { data, images } from "./mock-data/lp-data.js"

// we need to look into the following questions:
// how many pings can we make to the api in an hour?
  // we can make 60 requests per minute
// should we store our data in our own data base just in case we exceed the limit?
  // note: we can store the data as a whole very easily to a table in postgres
// how do I want the data displayed?
// should we pre-sort by categories to start?
// could we do that in a database query to start with?

// idea: we can filter out the players already on a roster
// we ping for the player_kona_info and use the header x-fantasy-filter
// this allows us to filter by fantasy leage and our value should be the JSON string of
// {"players":{"filterStatus":{"value":["FREEAGENT","WAIVERS"]},"limit":2000,"sortPercOwned":{"sortAsc":false,"sortPriority":1}}}

// investigation #2, the above gives us what we are looking for in terms of only waiver players and their averages
// we need to find out our daily leaders for the current scoring period which can be found using
// {"players":{"filterStatus":{"value":["FREEAGENT","WAIVERS"]},"filterSlotIds":{"value":[0,5,11,1,2,6,3,4]},"sortAppliedStatTotal":null,"sortAppliedStatTotalForScoringPeriodId":null,"sortStatId":{"additionalValue":"002022","sortAsc":false,"sortPriority":2,"value":0},"sortStatIdForScoringPeriodId":null,"sortPercOwned":{"sortPriority":3,"sortAsc":false},"limit":50,"filterStatsForTopScoringPeriodIds":{"value":5,"additionalValue":["002023","102023","002022","012023","022023","032023","042023"]}}}
// I believe the filter for top scoring period ids gives us the 5 most recent scoring periods
// need to do investigation on this

// the information we want is this:

// {"players":{"filterSlotIds":{"value":[0,5,11,1,2,6,3,4]},"filterStatsForCurrentSeasonScoringPeriodId":{"value":[2]},"sortAppliedStatTotal":null,"sortAppliedStatTotalForScoringPeriodId":null,"sortStatId":null,"sortStatIdForScoringPeriodId":{"additionalValue":2,"sortAsc":false,"sortPriority":2,"value":0},"sortPercOwned":{"sortPriority":3,"sortAsc":false},"filterStatus":{"value":["FREEAGENT","WAIVERS"]},"limit":50}}

// the above header is exactly the request that we need to send over to the ESPN fantasy server
// the only thing we need to make available for change would be the "filterStatsforcurrentSeasonScoringPeriodId"

// this gives us a list of players that are free agents and their current scores
// the stats breakdown are: '0' = PTS | '1' = STL | '2' = BLK | '3' = AST  | '6' = RBs | '11' = TOs| '17' = 3PM |'19' = FG%| | '20'  = FT%


function PlayerRankingLP () {

  // useState here
  const [pageIndex, setPageIndex] = useState(1);
  // useEffect here
  useEffect( () => {
    // here we make a call to our cors-proxy api
    // we want to get all our player infomation for the waiver wire
    axios.get(`${PROXY_URL}` )
    .then( (result, err) => {
      if (err) {
        console.log('error', err)
      } else {
        console.log('result', result.data)
      }
    })
  })

  // update pageIndex here
  function updatePageIndex (e) {
    console.log(e.target.name);
    e.preventDefault();
    if (e.target.name === "previousPage" && pageIndex > 1) {
      var newIndex = pageIndex - 1
      setPageIndex(newIndex)
    } else if (e.target.name === "nextPage" && pageIndex < (data.length / 10)) {
      var newIndex = pageIndex + 1
      setPageIndex(newIndex)
    }
  }

  function addToWatchlist (e) {
    e.preventDefault();
    var playerObject = JSON.parse(e.target.alt)
    console.log('should be object', playerObject);
    axios.post('http://localhost:5000/addPlayer', playerObject)
    .then ( (result, err) => {
      if (err) {
        console.log('error', err)
      } else {
        console.log('successful addition', result)
      }
    })
  }

  return (
    <Container style={{height: "100%"}}>
      <Row style={{height: "5%"}}>
        <h2 style={{border: "solid black 1px", marginBottom: "0"}}>Player Rankings</h2>
      </Row>
      <Row style={{minHeight: "35%"}}>
        <Table style={{border: "solid 1px"}}>
          <thead>
            <tr style={{textAlign: "center"}}>
              <th style={{textAlign: "left"}}>
                Player
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
            {data.map( (currentPlayer, index) => {
              var fg = currentPlayer.fg_pct;
              var ft = currentPlayer.ft_pct;

              if (!fg) {
                fg = "0.00"
              } else if (fg === 1) {
                fg = "100"
              } else {
                fg = (currentPlayer.fg_pct * 100).toFixed(1)
              }
              if (!ft) {
                ft = "0.00"
              } else if (ft === 1) {
                ft = "100"
              } else {
                ft = (currentPlayer.ft_pct * 100).toFixed(1)
              }

              if (index <= 10 * pageIndex && index >= ((pageIndex * 10) - 10)) {
                return (
                  <tr style={{textAlign: "center"}} key={"table" + index}>
                    <th style={{textAlign: "left"}}>
                    {currentPlayer.player.first_name} {currentPlayer.player.last_name}
                    </th>
                    <th style={{height: "2%"}}>
                      {fg}%
                    </th>
                    <th style={{height: "2%"}}>
                      {ft}%
                    </th>
                    <th style={{height: "2%"}}>
                      {currentPlayer.fg3m}
                    </th>
                    <th style={{height: "2%"}}>
                      {currentPlayer.reb}
                    </th>
                    <th style={{height: "2%"}}>
                      {currentPlayer.ast}
                    </th>
                    <th style={{height: "2%"}}>
                      {currentPlayer.stl}
                    </th>
                    <th style={{height: "2%"}}>
                      {currentPlayer.blk}
                    </th>
                    <th style={{height: "2%"}}>
                      {currentPlayer.turnover}
                    </th>
                    <th style={{height: "2%"}}>
                      {currentPlayer.pts}
                    </th>
                    <th style={{height: "2%", width: "2%", paddingTop: "3px"}}>
                      <img onClick={(e) => {
                                if(window.confirm('Add Player to Watchlist?')) {
                                  addToWatchlist(e);
                                }
                              }}
                            alt={JSON.stringify(currentPlayer)}
                            style={{maxHeight: "95%", maxWidth: "99%"}}
                            src={"https://www.svgrepo.com/show/326119/star-small.svg"}
                      >
                      </img>
                    </th>
                  </tr>
                )
              }
            })}
          </tbody>
        </Table>
      </Row>
      <Row xs={12} style={{textAlign: "center", width: "100%", marginBottom: "5%"}}>
        <Col>
         <Button name={"previousPage"} onClick={updatePageIndex} style={{marginRight: "0.5%"}}>
          Prev
         </Button>

          Page {pageIndex}

          <Button name={"nextPage"} onClick={updatePageIndex} style={{marginLeft: "0.5%"}}>
            Next
         </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default PlayerRankingLP;