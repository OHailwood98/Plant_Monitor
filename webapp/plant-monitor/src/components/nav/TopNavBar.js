import React from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";
import { Button, Nav, Navbar, Dropdown } from "react-bootstrap";
import Styled from "styled-components";

import { logout } from "../../actions/auth";
import Logo from "../images/pppMain.PNG";

function TopNavBar({ isAuthed, username, logout }) {
  const CenterDiv = Styled.div`
    display:inline-block;
  `;
  return (
    <Navbar bg="success" variant="light">
      <Navbar.Brand href="/">
        <img
          src={Logo}
          alt="Brands Hatch"
          className="d-inline-block align-top"
          height="60"
        />
      </Navbar.Brand>
      <Nav
        className="justify-content-center"
        variant="tabs"
        defaultActiveKey={window.location.pathname}
      >
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/mydevices">My Devices</Nav.Link>
        </Nav.Item>
      </Nav>
      {isAuthed ? (null) : null}
      <Dropdown alignRight className="ml-auto">
        {isAuthed ? (
          <div>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              style={{ color: "#000000" }}
            >
              {username}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Button
                  variant="success"
                  as={Link}
                  to="/"
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <Button variant="success" as={Link} to="/updatepassword">
                  Update Password
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </div>
        ) : (
          <div>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              style={{ color: "#000000" }}
            >
              Welcome
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Button variant="success" as={Link} to="/login">
                  Login
                </Button>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <Button variant="success" as={Link} to="/signup">
                  Signup Here
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </div>
        )}
      </Dropdown>
    </Navbar>
  );
}

TopNavBar.propTypes = {
  isAuthed: PropType.bool.isRequired,
  username: PropType.string.isRequired,
  logout: PropType.func.isRequired
};

function mapStateToProps(state) {
  if (state.user.username) {
    return {
      isAuthed: !!state.user.token,
      username: state.user.username
    };
  }
  return {
    isAuthed: !!state.user.token
  };
}

export default connect(mapStateToProps, { logout })(TopNavBar);
