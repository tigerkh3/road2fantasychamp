// watch list carousel for our landing page.

// react imports
import React, { useState } from "react";
// global styles for bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col } from "reactstrap"
import { data } from "./mock-data/wl-lp-data.js"

function WatchlistLP () {

  return (
    <Container style={{height: "100%"}}>
      <Row style={{height: "10%"}}>
        <h2 style={{border: "solid black 1px"}}>Player Watchlist</h2>
      </Row>
      <Row style={{height: "90%"}}>
        <Col xs="1">
          <Button> Left </Button>
        </Col>
        <Col>
          <Row style={{height: "100%"}}>
          <Container>
            <Row style={{border: "solid green 3px", height: "100%"}} xs="12">
              {data.map((currPlayer, index) => {
                return (
                  <Col key={index} style={{border: "solid black 3px", margin: "20px"}}>
                      <Row style={{border: "solid orange 3px", height: "80%"}}>
                        <Col style={{border: "solid blue 3px"}}> image here </Col>
                      </Row>
                      <Row style={{border: "solid orange 3px", height: "20%"}}>
                        <Col style={{border: "solid blue 3px"}}> player name here </Col>
                      </Row>
                  </Col>
                )
              })}
            </Row>
          </Container>
        </Row>
        </Col>
        <Col xs="1">
          <Button> Right </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default WatchlistLP;