import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useHistory } from "react-router";
import Button from "react-bootstrap/Button";

function Footer(props) {
  const history = useHistory();


  function logoutHandler(){
    localStorage.removeItem("Token");
    history.push("/");
  }

  return (
    <Navbar  expand="lg" bg="light" fixed="bottom">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto"></Nav>
        <Nav>
        <Button type="button" variant="light"onClick={logoutHandler}>Logout</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    
  );
}

export default Footer;
