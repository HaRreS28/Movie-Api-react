import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { Button, Container, Nav, Navbar, NavLink } from "react-bootstrap";
import AuthService from "../../api/authService";
import url from "../../api/urlConfig";

const Header = () => {
  const handleSignIn = () => {
    window.location.assign(url + "/login");
  };

  const handleSignUp = () => {
    window.location.assign(url + "/register");
  };

  const handleSignOut = () => {
    AuthService.logout();
    window.location.assign(url);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" style={{ color: "gold" }}>
          <FontAwesomeIcon icon={faVideoSlash} />
          Gold
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink className="nav-link" href="/">
              Home
            </NavLink>
            <NavLink className="nav-link" href="/watchlist">
              Watch List
            </NavLink>
          </Nav>
          {AuthService.getCurrentUser() ? (
            <Button
              variant="outline-info"
              className="me-2"
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          ) : (
            <>
              <Button
                variant="outline-info"
                className="me-2"
                onClick={handleSignIn}
              >
                Sign in
              </Button>
              <Button
                variant="outline-info"
                className="me-2"
                onClick={handleSignUp}
              >
                Sign up
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
