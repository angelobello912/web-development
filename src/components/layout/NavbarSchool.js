import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignedInLink from './SignedInLink';
import SignedOutLink from './SignedOutLink';
import { connect } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
class NavbarSchool extends Component {
  render() {
    const { auth } = this.props;
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <div className="container">
          <Navbar.Brand>
            <NavLink to="/home">Greenwich University</NavLink>
          </Navbar.Brand>
          {auth.uid ? <SignedInLink /> : <SignedOutLink />}
        </div>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(NavbarSchool);
