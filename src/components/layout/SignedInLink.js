import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class SignedInLink extends Component {
  render() {
    return (
      <ul className="right">
        <li>
          <NavLink to="/createProject">New Projects</NavLink>
        </li>
        <li>
          <NavLink to="/">Log Out</NavLink>
        </li>
        <li>
          <NavLink to="/" className="btn btn-floating pink lighten-1">
            ThNM
          </NavLink>
        </li>
      </ul>
    );
  }
}

export default SignedInLink;
