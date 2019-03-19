import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignedInLink from './SignedInLink';
import SignedOutLink from './SignedOutLink';
class Navbar extends Component {
  render() {
    return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <Link to="/" className="brand-logo left">
            School
          </Link>
          <SignedInLink />
          <SignedOutLink />
        </div>
      </nav>
    );
  }
}

export default Navbar;
