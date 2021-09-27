import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function NavHome(props) {
  const history = useHistory();

  function logoutHandler(){
    localStorage.removeItem("Token");
    history.push("/");
  }

  return (
      <Navbar expand="lg" className="mt-2" bg="light" sticky="top">
        <Navbar.Brand href="/">Heroes</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {props.home ? (
            <Link className="nav-link disabled" to="/home">
              Home
            </Link>
          ) : (
            <Link className="nav-link" to="/home">
              Home
            </Link>
          )}
          {props.search ? (
            <Link className="nav-link disabled" to="/search">
              Buscar
            </Link>
          ) : (
            <Link className="nav-link" to="/search">
              Buscar
            </Link>
          )}
          {props.detail ? (
            <Link className="nav-link disabled" to="/search">
              Detalle
            </Link>
          ) : (
            <></>
          )}
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
        <Nav className="me-auto"></Nav>
        <Nav>
        <Button type="button" variant="light"onClick={logoutHandler}>Logout</Button>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
  );
}

export default NavHome;
