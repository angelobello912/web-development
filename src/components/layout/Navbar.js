import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignedInLink from './SignedInLink';
import SignedOutLink from './SignedOutLink';
import { connect } from 'react-redux';
class Navbar extends Component {
  render() {
    const { auth } = this.props;
    return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <Link to="/home" className="brand-logo left">
            Greenwich University
          </Link>
          {auth.uid ? <SignedInLink /> : <SignedOutLink />}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Navbar);
