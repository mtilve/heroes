import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function NavHome(props) {
  const history = useHistory();

  function searchHandler() {
    history.push("/search");
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
        </Navbar.Collapse>
      </Navbar>
  );
}

export default NavHome;
