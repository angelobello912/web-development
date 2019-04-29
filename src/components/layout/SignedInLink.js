import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { isEmpty } from 'lodash';
import Spinner from '../../base/components/Spinner';
import { ROLE } from '../constant';
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
        <ul className="right">
          <li>
            <NavLink to="/createProject">New Contribution</NavLink>
          </li>
          <li>
            <NavLink to="/contributions">Contributions</NavLink>
          </li>
          <li>
            <a href="/" onClick={dispatchSignOut}>
              Log Out
            </a>
          </li>
          <li>
            <NavLink className="btn pink lighten-1">
              {firstName.charAt(0) + lastName.charAt(0)}
            </NavLink>
          </li>
        </ul>
      );
    }

    if (profile.role === ROLE.Cordinator) {
      return (
        <ul className="right">
          <li>
            <NavLink to="/createStudents">Create Students</NavLink>
          </li>
          <li>
            <NavLink to="/students">Manage Students</NavLink>
          </li>
          <li>
            <NavLink to="/contributions">Contributions</NavLink>
          </li>
          <li>
            <a href="/" onClick={dispatchSignOut}>
              Log Out
            </a>
          </li>
          <li>
            <NavLink className="btn pink lighten-1">
              {firstName.charAt(0) + lastName.charAt(0)}
            </NavLink>
          </li>
        </ul>
      );
    }

    if (profile.role === ROLE.Marketing_Manager) {
      return (
        <ul className="right">
          <li>
            <NavLink to="/createCordinators">Create Coordinators</NavLink>
          </li>
          <li>
            <NavLink to="/students">Manage Account</NavLink>
          </li>
          <li>
            <NavLink to="/contributions">Contributions</NavLink>
          </li>
          <li>
            <a href="/" onClick={dispatchSignOut}>
              Log Out
            </a>
          </li>
          <li>
            <NavLink className="btn pink lighten-1">
              {firstName.charAt(0) + lastName.charAt(0)}
            </NavLink>
          </li>
        </ul>
      );
    }

    if (profile.role === ROLE.Admin) {
      return (
        <ul className="right">
          <li>
            <NavLink to="/createAccount">Create Account</NavLink>
          </li>
          <li>
            <NavLink to="/students">Manage Account</NavLink>
          </li>
          <li>
            <NavLink to="/reports">Reports</NavLink>
          </li>
          <li>
            <a href="/" onClick={dispatchSignOut}>
              Log Out
            </a>
          </li>
          <li>
            <NavLink className="btn pink lighten-1">
              {firstName.charAt(0) + lastName.charAt(0)}
            </NavLink>
          </li>
        </ul>
      );
    }

    return (
      <ul className="right">
        <li>
          <NavLink to="/createProject">New Contribution</NavLink>
        </li>
        <li>
          <NavLink to="/contributions">Contributions</NavLink>
        </li>
        <li>
          <a href="/" onClick={dispatchSignOut}>
            Log Out
          </a>
        </li>
        <li>
          <NavLink className="btn pink lighten-1">
            {firstName.charAt(0) + lastName.charAt(0)}
          </NavLink>
        </li>
      </ul>
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
