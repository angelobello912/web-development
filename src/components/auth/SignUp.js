import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from './../../store/actions/authActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { isEmpty, repeat } from 'lodash';
import Select from 'react-select';
import Spinner from '../../base/components/Spinner';

const options = [
  { value: 'design', label: 'Design' },
  { value: 'it', label: 'IT' },
  { value: 'marketing', label: 'Marketing' }
];
class SignUp extends Component {
  isLoaded = false;
  state = {
    email: '',
    password: '',
    lastName: '',
    firstName: '',
    studentId: '',
    faculty: {}
  };

  handeChange = e => {
    const { id, value } = e.target;
    this.setState({
      [id]: value
    });
  };

  handleSelectChange = e => {
    this.setState({
      faculty: e
    });
  };

  componentDidUpdate() {
    const { users } = this.props;
    if (!this.isLoaded && !isEmpty(users)) {
      this.setState({
        studentId: `GCS${repeat('0', 5 - users.length.toString().length)}${
          users.length
        }`
      });
      this.isLoaded = true;
    }
  }

  handleSubmit = e => {
    const { dispatchSignUp } = this.props;
    e.preventDefault();
    dispatchSignUp(this.state);
  };

  render() {
    const { auth, authError, users } = this.props;
    const { faculty } = this.state;

    if (auth.uid) {
      return <Redirect to="/" />;
    }
    if (isEmpty(users)) {
      return <Spinner isLoading />;
    }
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handeChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handeChange} />
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={this.handeChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.handeChange} />
          </div>
          <label>Choose the faculty:</label>
          <Select
            styles={{
              option: (provided, state) => ({
                ...provided,
                borderBottom: '1px dotted pink',
                color: state.isSelected ? 'red' : 'blue',
                padding: 10
              }),
              singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = 'opacity 300ms';

                return { ...provided, opacity, transition };
              }
            }}
            value={faculty}
            onChange={this.handleSelectChange}
            options={options}
          />
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">SIGN up</button>
          </div>
          {authError && <h7 className="red-text text-darken-3">{authError}</h7>}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    users: state.firestore.ordered.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchSignUp: creds => dispatch(signUp(creds))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(['users'])
)(SignUp);
