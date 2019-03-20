import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

class SignedInLink extends Component {
  render() {
    const { dispatchSignOut }  = this.props;
    return (
      <ul className="right">
        <li>
          <NavLink to="/createProject">New Projects</NavLink>
        </li>
        <li>
          <a href="/" onClick={dispatchSignOut}>Log Out</a>
        </li>
        <li>
          <NavLink to="/home" className="btn btn-floating pink lighten-1">
            ThNM
          </NavLink>
        </li>
      </ul>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSignOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLink);
