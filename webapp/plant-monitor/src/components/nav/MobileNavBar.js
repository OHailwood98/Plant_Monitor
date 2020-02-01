import React from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Nav, Navbar, Dropdown } from "react-bootstrap";

import { logout } from "../../actions/auth";
import SmallLogo from "../images/pppSmall.PNG";
import burger from "../images/Hamburger_icon.png";

function MobileNavBar({ isAuthed, username, logout }) {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="/">
        <img
          src={SmallLogo}
          alt="Brands Hatch"
          className="d-inline-block align-top"
          height="51"
        />
      </Navbar.Brand>
      <Nav>
        <Dropdown>
          <Dropdown.Toggle
            variant="primary"
            id="dropdown-basic"
            style={{ color: "#000000" }}
          >
            <img src={burger} alt="Menu" height={30} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Button as={Link} to="/">
                Home
              </Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Button as={Link} to="/leaderboard">
                Leaderboard
              </Button>
            </Dropdown.Item>
            {isAuthed ? (
              <div>
                <Dropdown.Item>
                  <Button as={Link} to="/newtime">
                    Add a Time
                  </Button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Button as={Link} to="/mytimes">
                    My Times
                  </Button>
                </Dropdown.Item>
              </div>
            ) : null}
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
      <Dropdown alignRight className="ml-auto">
        {isAuthed ? (
          <div>
            <Dropdown.Toggle
              variant="primary"
              id="dropdown-basic"
              style={{ color: "#000000" }}
            >
              {username}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Button as={Link} to="/" onClick={() => logout()}>
                  Logout
                </Button>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <Button as={Link} to="/updatepassword">
                  Update Password
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </div>
        ) : (
          <div>
            <Dropdown.Toggle
              variant="primary"
              id="dropdown-basic"
              style={{ color: "#000000" }}
            >
              Welcome
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Button as={Link} to="/login">
                  Login
                </Button>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <Button as={Link} to="/signup">
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

MobileNavBar.propTypes = {
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

export default connect(mapStateToProps, { logout })(MobileNavBar);
