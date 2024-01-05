// watch list carousel for our landing page.
const axios = require('axios');
// react imports
import React, { useState, useEffect } from "react";
// global styles for bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col, Media, Card } from "reactstrap"
import { data, images } from "./mock-data/lp-data.js"
import PlayerRankingLP from "./player-rankings/player-ranking-lp.jsx";

function WatchlistLP () {

  // do i want to retrieve my data from DB here?
  // could be a possibility so I don't have too many things stacked up

  const [imageIndex, setImageIndex] = useState(0);
  const [trueCount, setTrueCount] = useState(0)
  const [dataSet, setDataSet] = useState(['filler', 'filler', 'filler', 'filler'])
  const [watchlist, setWatchlist] = useState(0);

  useEffect( () => {
    axios.get('http://localhost:6001/watchlist')
    .then ( (result, err) => {
      if (err) {
        console.log('watchlist database GET req denied', err)
      } else {
        console.log(result.data)
        if (result.data.length > 0) {
          setTrueCount(result.data.length - 1)
          if (result.data.length >= 1) {
            while (result.data.length % 4 !== 0) {
              result.data.push('filler')
            }
          }
          setDataSet(result.data);
        }
      }
    })
  }, [watchlist])

  // methods go here

  // method #1
  function nextPlayers (e) {
    // we want to get the next 4 players in the data
    // we map over all of them but we can choose our starting/stopping point?
    // we always start with 0 and can go up or down by increments of 4
    // this state would be updated when we click on left or right
    e.preventDefault();

    if (e.target.name === "next") {
      var currIndex = imageIndex
      if (imageIndex + 4 < dataSet.length) {
        setImageIndex(currIndex + 4)
      }
    } else if (e.target.name === "back") {
      var currIndex = imageIndex
      if (!(imageIndex - 4 < 0)) {
        setImageIndex(currIndex - 4)
      }
    }
  }

  // method #2
  function addToWatchlist (e) {
    e.preventDefault();
    axios.post('http://localhost:6001/addPlayer', {playerName: e.target.alt})
    .then ( (result, err) => {
      if (err) {
        console.log('failed to add to watchlist database client res', err)
      } else {
        console.log('successful addition', result)
        setWatchlist(watchlist + 1)
      }
    })
  }

  return ([
    <Container key='watchlist' style={{marginBottom: "2.5%"}}>
      <Row style={{border: "solid black 1px", textAlign: "center"}}>
        <h2>Player Watchlist</h2>
      </Row>
      <Row style={{border: "solid black 1px"}}>
        <Col xs="4" sm="3" md="2" lg="2" xl="2">
          <Button name="back" onClick={nextPlayers}> Left </Button>
        </Col>
        <Col style={{overflowY: "scroll"}} xs="4" sm="6" md="8" lg="8" xl="8">
          <Container style={{padding: "0"}}>
            {dataSet.map( (currentPlayer, index) => {
              if (index < imageIndex + 4 && index >= imageIndex) {
                if (currentPlayer === 'filler') {
                  return (
                    <div key={"wl-" + index} style={{height: "100%", width: "20%", display: "inline-block", border: "solid black 3px", margin: "2%"}}>
                      <div style={{border: "solid orange 3px", marginBottom: "1px"}}>
                        <img style={{height: "100%", width: "100%", border: "solid black 3px"}} src={images.image}></img>
                      </div>
                      <div style={{maxHeight: "20%", overflow: "scroll", border: "solid orange 3px"}}>
                        <div style={{height: "4vh", border: "solid blue 3px", padding: "12"}}>
                          <div style={{overflowY: "scroll", maxHeight: "99%"}}> Add Player</div>
                        </div>
                      </div>
                    </div>
                  )
                } else {
                    return (
                      <div key={"wl-" + index} style={{height: "100%", width: "20%", display: "inline-block", border: "solid black 3px", margin: "2%"}}>
                        <div style={{border: "solid orange 3px", marginBottom: "1px"}}>
                          <img style={{height: "100%", width: "100%", border: "solid black 3px"}} src={images.image}></img>
                        </div>
                        <div style={{maxHeight: "20%", overflow: "scroll", border: "solid orange 3px"}}>
                          <div style={{height: "4vh", border: "solid blue 3px", padding: "12"}}>
                            <div style={{overflowY: "scroll", maxHeight: "99%"}}> {dataSet[index].player_data} </div>
                          </div>
                        </div>
                      </div>
                    )
                }
              }
            })}
          </Container>
        </Col>
        <Col xs="4" sm="3" md="2" lg="2" xl="2">
          <Button style={{display: "inline"}} name="next" onClick={nextPlayers}> Right </Button>
        </Col>
      </Row>
    </Container>,
    <Container key='ranking'>
      <Row>
        <PlayerRankingLP addMethod={addToWatchlist}/>
      </Row>
    </Container>
  ])
}

export default WatchlistLP;