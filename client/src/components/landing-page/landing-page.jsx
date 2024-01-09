import React, { useState } from "react";
// global styles for bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import WatchlistLP from "./components/watchlist-lp.jsx";
import FantasyTrackerLP from "./components/fantasy-tracker-lp.jsx";



function LandingPage () {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <Row>
        <FantasyTrackerLP />
      </Row>
      <Row>
        <WatchlistLP />
      </Row>

    </Container>
  )
}

export default LandingPage;