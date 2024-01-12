// react imports
import React from "react";
// global styles for bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import LandingPage from "./components/landing-page/landing-page.jsx";
import NavigationBar from "./components/navigation-bar/navigation-bar.jsx"

// components

// hooks

// context

function App () {


  return ([
    <Container key="navBar"style={{height: "100%", maxWidth: "100%", padding: "0", zoom: "70%"}}>
      <Row>
        <NavigationBar/>
      </Row>
    </Container>,
    <Container key="landingPage">
      <Row style={{height: "100%", margin: "2% 10% 0% 10%"}}>
        <LandingPage/>
      </Row>
    </Container>
  ])
}

export default App;