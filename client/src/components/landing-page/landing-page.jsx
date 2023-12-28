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
      <Row style={{height: "25%", marginBottom: "2.5%"}}>
        <FantasyTrackerLP/>
      </Row>
      <Row style={{height: "70%"}}>
        <WatchlistLP/>
      </Row>

    </Container>
  )
}

export default LandingPage;