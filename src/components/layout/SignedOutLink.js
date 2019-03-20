import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class SignedOutLink extends Component {
  render() {
    return (
      <ul className="right">
        <li>
          <NavLink to="/signUp">Sign Up</NavLink>
        </li>
        <li>
          <NavLink to="/signin">Log In</NavLink>
        </li>
      </ul>
    );
  }
}

export default SignedOutLink;
