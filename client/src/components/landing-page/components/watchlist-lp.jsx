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
        if (result.data.length !== 0) {
          setDataSet(result.data);
        } else {
            while (result.data.length % 4 !== 0) {
              result.data.push('filler')
            }
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
    <Container key='watchlist' style={{background: "#424242", marginBottom: "2.5%", color: "white", borderRadius: "12.5px"}}>
      <Row style={{background: "#313131", borderBottom: "solid black 1px", textAlign: "center", borderTopLeftRadius: "12.5px", borderTopRightRadius: "12.5px"}}>
        <h1 style={{padding: "2%"}}>Player Watchlist</h1>
      </Row>
      <Row>
        <Col style={{maxHeight: "35vh", overflow: "scroll"}}>
          <Container style={{padding: "0"}} >
            {dataSet.map( (currentPlayer, index) => {
              if (currentPlayer === 'filler') {
                return (
                  <div key={"wl-" + index} style={{height: "100%", width: "20%", display: "inline-block", border: "solid black 1px", margin: "2.5% 2.5%"}}>
                    <div style={{padding: "3px", marginBottom: "1px"}}>
                      <img style={{height: "100%", width: "100%"}} src={images.image}></img>
                    </div>
                    <div style={{maxHeight: "20%", overflow: "scroll", padding: "0% 2% 2% 2%"}}>
                      <div style={{height: "5vh", padding: "12"}}>
                        <div style={{maxHeight: "99%"}}> Add Player </div>
                      </div>
                    </div>
                  </div>
                )
              } else {
                  return (
                    <div key={"wl-" + index} style={{height: "100%", width: "20%", display: "inline-block", margin: "2.5% 2.5%"}}>
                      <div style={{padding: "2%"}}>
                        <img style={{height: "100%", width: "100%"}} src={images.image}></img>
                      </div>
                      <div style={{maxHeight: "20%", overflow: "scroll", padding: "0% 2% 2% 2%"}}>
                        <div style={{height: "5vh", textAlign: "center"}}>
                          <h7> {dataSet[index].player_data} </h7>
                        </div>
                      </div>
                    </div>
                  )
              }
            })}
          </Container>
        </Col>
      </Row>
      {/* <Row style={{border: "solid black 1px"}}>
        <Col style={{padding: "0"}}>
          <Button name="back" onClick={nextPlayers}> Left </Button>
        </Col>
        <Col style={{padding: "0"}}>
          <Button style={{display: "inline"}} name="next" onClick={nextPlayers}> Right </Button>
        </Col>
      </Row> */}
    </Container>,
    <Container key='ranking'>
      <Row>
        <PlayerRankingLP addMethod={addToWatchlist}/>
      </Row>
    </Container>
  ])
}

// move to left and right
// if (index < imageIndex + 4 && index >= imageIndex) {}

export default WatchlistLP;