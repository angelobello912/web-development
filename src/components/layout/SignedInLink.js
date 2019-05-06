import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { isEmpty } from 'lodash';
import Spinner from '../../base/components/Spinner';
import { ROLE } from '../constant';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
class SignedInLink extends Component {
  render() {
    const {
      dispatchSignOut,
      profile: { firstName = '', lastName = '' },
      profile
    } = this.props;

    if (isEmpty(profile)) {
      return <Spinner isLoading />;
    }

    if (profile.role === ROLE.Student) {
      return (
        <>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>
                <NavLink to="/createProject">New Contribution</NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink to="/contributions">Contributions</NavLink>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>
                <a href="/" onClick={dispatchSignOut}>
                  Log Out
                </a>
              </Nav.Link>
              <Nav.Link href="/">
                <NavLink className="btn pink lighten-1">
                  {firstName.charAt(0) + lastName.charAt(0)}
                </NavLink>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      );
    }

    if (profile.role === ROLE.Cordinator) {
      return (
        <>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>
                <NavLink to="/createStudents">Create Students</NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink to="/students">Manage Students</NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink to="/contributions">Contributions</NavLink>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>
                <a href="/" onClick={dispatchSignOut}>
                  Log Out
                </a>
              </Nav.Link>
              <Nav.Link href="/">
                <NavLink className="btn pink lighten-1">
                  {firstName.charAt(0) + lastName.charAt(0)}
                </NavLink>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      );
    }

    if (profile.role === ROLE.Marketing_Manager) {
      return (
        <>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>
                <NavLink to="/createCordinators">Create Coordinators</NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink to="/students">Manage Account</NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink to="/contributions">Contributions</NavLink>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>
                <a href="/" onClick={dispatchSignOut}>
                  Log Out
                </a>
              </Nav.Link>
              <Nav.Link href="/">
                <NavLink className="btn pink lighten-1">
                  {firstName.charAt(0) + lastName.charAt(0)}
                </NavLink>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      );
    }

    if (profile.role === ROLE.Admin) {
      return (
        <>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>
                <NavLink to="/createAccount">Create Account</NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink to="/students">Manage Account</NavLink>
              </Nav.Link>
              <NavDropdown title="Reports" id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <NavLink to="/reports">Reports</NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link>
                <a href="/" onClick={dispatchSignOut}>
                  Log Out
                </a>
              </Nav.Link>
              <Nav.Link href="/">
                <NavLink className="btn pink lighten-1">
                  {firstName.charAt(0) + lastName.charAt(0)}
                </NavLink>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      );
    }

    return (
      <>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <NavLink to="/createProject">New Contribution</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to="/contributions">Contributions</NavLink>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link>
              <a href="/" onClick={dispatchSignOut}>
                Log Out
              </a>
            </Nav.Link>
            <Nav.Link href="/">
              <NavLink className="btn pink lighten-1">
                {firstName.charAt(0) + lastName.charAt(0)}
              </NavLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchSignOut: () => dispatch(signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignedInLink);
