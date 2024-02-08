// watch list carousel for our landing page.
const axios = require('axios');
// react imports
import React, { useState, useEffect } from "react";
// global styles for bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col, Media, Card } from "reactstrap"
import { data, images } from "./mock-data/lp-data.js"
import PlayerRankingLP from "./player-rankings/player-ranking-lp.jsx";
import "../../../dist/style.css";
import remove from "../../../dist/icons/remove.png";
import {SERVER_PORT} from "@env"


function WatchlistLP () {

  // do i want to retrieve my data from DB here?
  // could be a possibility so I don't have too many things stacked up

  const [imageIndex, setImageIndex] = useState(0);
  const [trueCount, setTrueCount] = useState(0)
  const [watchedPlayers, setWatchedPlayers] = useState(['filler'])
  const [watchListObj, setWatchListObj] = useState({})
  const [watchlist, setWatchlist] = useState(0);

  useEffect( () => {
    axios.get(`http://localhost:${SERVER_PORT}/watchlist`)
    .then ( (result, err) => {
      if (err) {
        console.log('watchlist database GET req denied', err)
      } else {
        if (result.data.length !== 0) {
          setWatchedPlayers(result.data);
          var watchlistObj = {}
          for (var i = 0; i < result.data.length; i++) {
            watchlistObj[result.data[i].player_name] = true;
          }
          setWatchListObj(watchlistObj);
        }
      }
    })
  }, [watchlist])

  // method #2
  function addToWatchlist (e) {
    e.preventDefault();
    var playerInfo = e.target.alt.split(", ")
    axios.post(`http://localhost:${SERVER_PORT}/addPlayer`, {playerName: playerInfo[0], playerId: playerInfo[1]})
    .then ( (result, err) => {
      if (err) {
        console.log('failed to add to watchlist database client res', err)
      } else {
        setWatchlist(watchlist + 1)
      }
    })
  }

  function removeFromWatchlist (e) {
    e.preventDefault();
    var playerInfo = e.target.alt.split(", ")
    axios.post(`http://localhost:${SERVER_PORT}/removePlayer`, {playerName: playerInfo[0], playerId: playerInfo[1]})
    .then ( (result, err) => {
      if (err) {
        console.log('failed to remove from watchlist database client res', err)
      } else {
        setWatchedPlayers(['filler'])
        setWatchlist(watchlist - 1)
      }
    })
  }

  if (watchedPlayers[0] === "filler") {
    return ([
      <Container key='watchlist' style={{background: "#424242", marginBottom: "2.5%", color: "white", borderRadius: "12.5px"}}>
        <Row style={{background: "#313131", borderBottom: "solid black 1px", textAlign: "center", borderTopLeftRadius: "12.5px", borderTopRightRadius: "12.5px"}}>
          <h1 style={{padding: "2%"}}>Player Watchlist</h1>
        </Row>
        <Row>
          <h2 style={{textAlign: "center", padding: "15% 0%", background: "#313131"}}>
            Watchlist Empty!
          </h2>
        </Row>
      </Container>,
      <Container key='ranking'>
        <Row>
          <PlayerRankingLP watchlist={watchedPlayers} addMethod={addToWatchlist}/>
        </Row>
      </Container>
    ])
  } else {
    return ([
      <Container key='watchlist' style={{background: "#313131", marginBottom: "2.5%", color: "white", borderRadius: "12.5px"}}>
        <Row style={{background: "#212121", borderBottom: "solid black 1px", textAlign: "center", borderTopLeftRadius: "12.5px", borderTopRightRadius: "12.5px"}}>
          <h1 style={{padding: "2%"}}>Player Watchlist</h1>
        </Row>
        <Row style={{marginBottom: "5%"}}>
          <Col style={{maxHeight: "35vh", overflow: "auto"}}>
            <Container style={{padding: "0"}} >
              {watchedPlayers.map( (currentPlayer, index) => {
                    return (
                      <div key={"wl-" + index} style={{position: "relative", width: "20%", display: "inline-block", margin: "2.5% 2.5% 0% 2.5%"}}>
                        <div style={{padding: "2%", borderRadius: "12.5px"}}>
                          <img style={{background: "#212121", height: "100%", width: "100%", borderRadius: "12.5px"}} src={`http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${watchedPlayers[index].player_id}.png&w=184&h=134&cb=1`}></img>
                        </div>
                        <div style={{maxHeight: "20%", overflow: "auto", padding: "5% 2% 0% 2%"}}>
                          <div style={{textAlign: "center"}}>
                            <h6> {watchedPlayers[index].player_name} </h6>
                          </div>
                        </div>
                        <div style={{width: "15%", height: "15%",display: "inline-block", position: "absolute", margin: "0", left: "82.5%", top: "02.5%"}}>
                          <img style={{height: "100%", width: "100%", padding: "25%"}}src={remove} alt={`${watchedPlayers[index].player_name}, ${watchedPlayers[index].player_id}`} onClick={(e) => {
                                  if(window.confirm('Remove Player from Watchlist?')) {
                                    removeFromWatchlist(e)
                                  }
                                }}></img>
                        </div>
                      </div>
                    )
              })}
            </Container>
          </Col>
        </Row>
      </Container>,
      <Container key='ranking'>
        <Row>
          <PlayerRankingLP watchlist={watchListObj} removeMethod={removeFromWatchlist} addMethod={addToWatchlist}/>
        </Row>
      </Container>
    ])
  }
}

// move to left and right
// if (index < imageIndex + 4 && index >= imageIndex) {}

export default WatchlistLP;