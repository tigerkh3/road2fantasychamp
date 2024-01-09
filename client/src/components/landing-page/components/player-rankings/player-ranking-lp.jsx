// player ranking section for our landing-page
// watch list carousel for our landing page.
const axios = require('axios');
// import dotenv variables for this section
import {PROXY_URL, REACT_APP_SEASON, REACT_APP_LEAGUE, REACT_APP_SWID, REACT_APP_ESPN} from "@env"
// react imports
import React, { useState, useEffect } from "react";
// global styles for bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Container, Row, Col, Media, Card } from "reactstrap";
import { data, images } from "../mock-data/lp-data.js";
import "../../../../dist/style.css";
import icon from "../../../../dist/icons/star.png"




// we need to look into the following questions:
// how many pings can we make to the api in an hour?
  // we can make 60 requests per minute
// should we store our data in our own data base just in case we exceed the limit?
  // note: we can store the data as a whole very easily to a table in postgres
// how do I want the data displayed?
// should we pre-sort by categories to start?
// could we do that in a database query to start with?

// idea: we can filter out the players already on a roster
// we ping for the player_kona_info and u se the header x-fantasy-filter
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
// the only thing we need to make available for change would be the "filterStatsforcurrentSeasonScoringPeriodId" and "sortStatIdForScoringPeriodId":{"additionalValue":46,"}"

// as soon as our app loads we can grab the current scoring periodid
// this wille be located in our landing page section

// this gives us a list of players that are free agents and their current scores
// the stats breakdown are: '0' = PTS | '1' = STL | '2' = BLK | '3' = AST  | '6' = RBs | '11' = TOs| '17' = 3PM |'19' = FG%| | '20'  = FT%


function PlayerRankingLP (prop) {
  const date = new Date();


  // useState here
  const [currentDate, setCurrentDate] = useState(getDate());
  const [playerData, setPlayerData] = useState([])
  const [scoringPeriodId, setScoringPeriodId] = useState()
  // useEffect here
  useEffect( () => {
    axios.get(`${PROXY_URL}/leagueData`)
    .then ((res, err) => {
      if (err) {
        console.log('error', err)
      } else {
        setScoringPeriodId(res.data.scoringPeriodId);

        var options = {
          'url': `${PROXY_URL}/playerData`,
          'params': {
            scoringPeriod: res.data.scoringPeriodId
          }
        }

        axios.default.request(options)
        .then ( (res) => {
          setPlayerData(res.data.players)
        })
      }
    })
  }, [])

  // currentDate
  function getDate() {
    const today = new Date().toString().split(' ');
    const day = today[0]
    const month = today[1]
    const numDay = today[2]
    const year = today[3]
    return month + " " +  numDay + ", " + year + " "
  }

  return (
    <Container style={{background: "#424242", maxHeight: "50vh", borderRadius: "12.5px", marginBottom: "5%"}}>
      <Row style={{background: "#313131", maxHeight: "15vh", textAlign: "center", borderTopLeftRadius: "12.5px", borderTopRightRadius: "12.5px"}}>
        <h1 style={{marginBottom: "0", padding: "15px", color: "white"}}>Player Rankings</h1>
      </Row>
      <Row style={{textAlign: "center", color: "white", padding: "1% 0%"}}>
        <h4> {currentDate} </h4>
      </Row>
      <Row style={{overflow: "auto", maxHeight: "38vh", padding: "0% 1.5% 1% 0%"}}>
        <Table>
          <thead style={{position: "sticky", top: "0", zIndex: "1", background: "#313131", boxShadow: "inset 0px 1px black, 0px 1px black"}}>
            <tr style={{textAlign: "center"}}>
              <th style={{textAlign: "left"}}>
                Player
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
              <th>
                ADD
              </th>
            </tr>
          </thead>
          <tbody>
            {playerData.map( (currentPlayer, index) => {
              if (Object.keys(currentPlayer.player.stats[0].stats).length > 0) {
                return (
                  <tr style={{textAlign: "center"}} key={"table" + index}>
                    <th style={{textAlign: "left"}}>
                    {currentPlayer.player.fullName}
                    </th>
                    <th style={{height: "2%"}}>
                      {(currentPlayer.player.stats[0].stats[19] * 100).toFixed(1)}%
                    </th>
                    <th style={{height: "2%"}}>
                      {(currentPlayer.player.stats[0].stats[20] * 100).toFixed(1)}%
                    </th>
                    <th style={{height: "2%"}}>
                      {currentPlayer.player.stats[0].stats[17]}
                    </th>
                    <th style={{height: "2%"}}>
                      {currentPlayer.player.stats[0].stats[6]}
                    </th>
                    <th style={{height: "2%"}}>
                      {currentPlayer.player.stats[0].stats[3]}
                    </th>
                    <th style={{height: "2%"}}>
                      {currentPlayer.player.stats[0].stats[1]}
                    </th>
                    <th style={{height: "2%"}}>
                      {currentPlayer.player.stats[0].stats[2]}
                    </th>
                    <th style={{height: "2%"}}>
                      {currentPlayer.player.stats[0].stats[11]}
                    </th>
                    <th style={{height: "2%"}}>
                      {currentPlayer.player.stats[0].stats[0]}
                    </th>
                    <th style={{height: "2%", width: "2%", paddingTop: "3px"}}>
                      <img onClick={(e) => {
                                if(window.confirm('Add Player to Watchlist?')) {
                                  prop.addMethod(e)
                                }
                              }}
                            alt={currentPlayer.player.fullName}
                            style={{maxHeight: "50%", maxWidth: "50%"}}
                            src={icon}
                      >
                      </img>
                    </th>
                  </tr>
                )
              } else {
                return (
                  <tr style={{textAlign: "center"}} key={"table" + index}>
                    <th style={{textAlign: "left"}}>
                    {currentPlayer.player.fullName}
                    </th>
                    <th style={{height: "2%"}}>
                      {'-'}
                    </th>
                    <th style={{height: "2%"}}>
                      {'-'}
                    </th>
                    <th style={{height: "2%"}}>
                      {'-'}
                    </th>
                    <th style={{height: "2%"}}>
                      {'-'}
                    </th>
                    <th style={{height: "2%"}}>
                      {'-'}
                    </th>
                    <th style={{height: "2%"}}>
                      {'-'}
                    </th>
                    <th style={{height: "2%"}}>
                      {'-'}
                    </th>
                    <th style={{height: "2%"}}>
                      {'-'}
                    </th>
                    <th style={{height: "2%"}}>
                      {'-'}
                    </th>
                    <th style={{height: "2%", width: "2%", paddingTop: "3px"}}>
                      <img onClick={(e) => {
                                if(window.confirm('Add Player to Watchlist?')) {
                                  prop.addMethod(e)
                                }
                              }}
                            alt={currentPlayer.player.fullName}
                            style={{maxHeight: "50%", maxWidth: "50%"}}
                            src={icon}
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
      {/* <Row xs={12} style={{textAlign: "center", width: "100%", marginBottom: "5%"}}>
        <Col>
         <Button name={"previousPage"} onClick={updatePageIndex} style={{marginRight: "0.5%"}}>
          Prev
         </Button>

          Page {pageIndex}

          <Button name={"nextPage"} onClick={updatePageIndex} style={{marginLeft: "0.5%"}}>
            Next
         </Button>
        </Col>
      </Row> */}
    </Container>
  )
}

// 10 players max if logic
// if (index <= 9 * pageIndex && index >= ((pageIndex * 9) - 9)) {}

export default PlayerRankingLP;