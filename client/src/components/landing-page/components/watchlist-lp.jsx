// watch list carousel for our landing page.

// react imports
import React, { useState } from "react";
// global styles for bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col, Media, Card } from "reactstrap"
import { data, images } from "./mock-data/wl-lp-data.js"

function WatchlistLP () {

  // do i want to retrieve my data from DB here?
  // could be a possibility so I don't have too many things stacked up

  const [imageIndex, setImageIndex] = useState(0);

  // methods go here
  function nextPlayers (e) {
    // we want to get the next 4 players in the data
    // we map over all of them but we can choose our starting/stopping point?
    // we always start with 0 and can go up or down by increments of 4

    // this state would be updated when we click on left or right
    e.preventDefault();

    if (e.target.name === "next") {
      var currIndex = imageIndex
      if (imageIndex + 4 < data.length) {
        setImageIndex(currIndex + 4)
      }
    } else if (e.target.name === "back") {
      var currIndex = imageIndex
      if (!(imageIndex - 4 < 0)) {
        setImageIndex(currIndex - 4)
      }
    }

    console.log(imageIndex)
  }

  return (
    <Container style={{height: "100%"}}>
      <Row style={{height: "10%"}}>
        <h2 style={{border: "solid black 1px"}}>Player Watchlist</h2>
      </Row>
      <Row style={{height: "90%", marginTop: "2%", border: "solid black 1px"}}>
        <Col xs="1">
          <Button name="back" onClick={nextPlayers}> Left </Button>
        </Col>
        <Col>
          <Row style={{height: "100%"}}>
          <Container>
            <Row style={{border: "solid green 3px", height: "100%"}} xs="12">
              <Col style={{border: "solid black 3px", margin: "20px"}}>
                <Row style={{border: "solid orange 3px", height: "80%"}}>
                  <img style={{minWidth: "100%", minHeight: "100%", border: "solid black 3px", padding: "0"}} src={images.image}></img>
                </Row>
                <Row style={{border: "solid orange 3px", height: "20%"}}>
                  <Col style={{border: "solid blue 3px"}}> {data[imageIndex].player.first_name} {data[imageIndex].player.last_name} </Col>
                </Row>
              </Col>
              <Col style={{border: "solid black 3px", margin: "20px"}}>
                <Row style={{border: "solid orange 3px", height: "80%"}}>
                  <img style={{minWidth: "100%", minHeight: "100%", border: "solid black 3px", padding: "0"}} src={images.image}></img>
                </Row>
                <Row style={{border: "solid orange 3px", height: "20%"}}>
                  <Col style={{border: "solid blue 3px"}}> {data[imageIndex + 1].player.first_name} {data[imageIndex + 1].player.last_name} </Col>
                </Row>
              </Col>
              <Col style={{border: "solid black 3px", margin: "20px"}}>
                <Row style={{border: "solid orange 3px", height: "80%"}}>
                  <img style={{minWidth: "100%", minHeight: "100%", border: "solid black 3px", padding: "0"}} src={images.image}></img>
                </Row>
                <Row style={{border: "solid orange 3px", height: "20%"}}>
                  <Col style={{border: "solid blue 3px"}}> {data[imageIndex + 2].player.first_name} {data[imageIndex + 2].player.last_name} </Col>
                </Row>
              </Col>
              <Col style={{border: "solid black 3px", margin: "20px"}}>
                <Row style={{border: "solid orange 3px", height: "80%"}}>
                  <img style={{minWidth: "100%", minHeight: "100%", border: "solid black 3px", padding: "0"}} src={images.image}></img>
                </Row>
                <Row style={{border: "solid orange 3px", height: "20%"}}>
                  <Col style={{border: "solid blue 3px"}}> {data[imageIndex + 3].player.first_name} {data[imageIndex + 3].player.last_name} </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Row>
        </Col>
        <Col xs="1">
          <Button name="next" onClick={nextPlayers}> Right </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default WatchlistLP;