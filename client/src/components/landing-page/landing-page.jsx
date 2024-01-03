import React, { useState } from "react";
// global styles for bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import WatchlistLP from "./components/watchlist-lp.jsx";
import FantasyTrackerLP from "./components/fantasy-tracker-lp.jsx";



function LandingPage () {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container style={{height: "100%"}}>
      <Row style={{height: "30vh", margin: 0}}>
        <FantasyTrackerLP style={{height: "90%"}}/>
      </Row>
      <Row style={{height: "65vh"}}>
        <WatchlistLP style={{height: "90%"}}/>
      </Row>

    </Container>
  )
}

export default LandingPage;