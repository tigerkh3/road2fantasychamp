import React, { useState } from "react";
// global styles for bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import { Navbar, NavItem, NavbarToggler, Collapse, NavLink, Nav, NavbarBrand} from "reactstrap";

function NavigationBar () {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <Navbar color="dark" dark>
        <NavbarBrand href="/">KingMaker.io</NavbarBrand>
        <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
        <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
        </Nav>
        </Collapse>
      </Navbar>
    </Container>
  )
}


export default NavigationBar;