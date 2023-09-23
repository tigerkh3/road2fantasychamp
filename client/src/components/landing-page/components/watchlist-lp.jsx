// watch list carousel for our landing page.

// react imports
import React, { useState, useEffect } from "react";
// global styles for bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col, Media, Card } from "reactstrap"
import { data, images } from "./mock-data/lp-data.js"

function WatchlistLP () {

  // do i want to retrieve my data from DB here?
  // could be a possibility so I don't have too many things stacked up

  const [imageIndex, setImageIndex] = useState(0);
  const [trueCount, setTrueCount] = useState(data.length)
  const [dataSet, setDataSet] = useState(data)

  useEffect( () => {
    var length = data.length
    while (length % 4 !== 0) {
      var addFiller = dataSet
      addFiller.push('filler');
      setDataSet(addFiller)
      length += 1
    }
  })

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
      <Row style={{height: "90%", border: "solid black 1px"}}>
        <Col style={{padding: "0"}} xs="1">
          <Button style={{marginLeft: "22.5%", marginTop: "122.5%"}} name="back" onClick={nextPlayers}> Left </Button>
        </Col>
        <Col style={{padding: "0"}} xs="10">
          <Row style={{height: "100%"}}>
            <Container>
              <Row style={{border: "solid green 1px", height: "100%", margin: "0"}} xs="12">
                {data.map( (currentPlayer, index) => {
                  if (index > imageIndex && index < imageIndex + 4 && index >= trueCount) {

                    return (
                      <Col key={"wl-" + index} style={{border: "solid black 3px", margin: "20px"}}>
                        <Row style={{border: "solid orange 3px", height: "80%", marginBottom: "1px"}}>
                          <img style={{minWidth: "100%", maxHeight: "100%", border: "solid black 3px", padding: "0"}} src={images.gray}></img>
                        </Row>
                        <Row style={{border: "solid orange 3px", maxHeight: "20%"}}>
                          <Col style={{border: "solid blue 3px", padding: "12", maxHeight: "99%"}}> Add Player </Col>
                        </Row>
                      </Col>
                    )
                  } else if (index < imageIndex + 4 && index >= imageIndex) {
                      return (
                        <Col key={"wl-" + index} style={{border: "solid black 3px", margin: "20px"}}>
                          <Row style={{border: "solid orange 3px", height: "80%", marginBottom: "1px"}}>
                            <img style={{minWidth: "100%", maxHeight: "100%", border: "solid black 3px", padding: "0"}} src={images.image}></img>
                          </Row>
                          <Row style={{border: "solid orange 3px", height: "20%"}}>
                            <Col style={{border: "solid blue 3px", padding: "12", maxHeight: "99%"}}>
                              <div style={{overflowY: "scroll", maxHeight: "99%"}}> {data[index].player.first_name} {data[index].player.last_name} </div>
                            </Col>
                          </Row>
                      </Col>
                      )
                  }
                })}
              </Row>
            </Container>
          </Row>
        </Col>
        <Col style={{padding: "0"}} xs="1">
          <Button style={{marginLeft: "20%", marginTop: "122.5%"}} name="next" onClick={nextPlayers}> Right </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default WatchlistLP;