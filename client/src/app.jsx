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


  return (
    <Container style={{height: "100%", maxWidth: "90%"}}>
      <Row xs="12" md="12" lg="12">
        <NavigationBar/>
      </Row>
      <Row xs="12"style={{height: "100%", margin: "0", width: "100%"}}>
        <LandingPage/>
      </Row>
    </Container>
  )
}

export default App;