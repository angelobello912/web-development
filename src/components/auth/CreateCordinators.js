import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from './../../store/actions/authActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { isEmpty, repeat } from 'lodash';
import Select from 'react-select';
import Spinner from '../../base/components/Spinner';
import { ROLE } from '../constant';

const options = [
  { value: 'design', label: 'Design' },
  { value: 'it', label: 'IT' },
  { value: 'marketing', label: 'Marketing' }
];

class CreateCordinators extends Component {
  isLoaded = false;
  state = {
    email: '',
    password: '',
    lastName: '',
    firstName: '',
    studentId: '',
    faculty: {},
    role: { value: ROLE.Cordinator, label: ROLE.Cordinator }
  };

  handeChange = e => {
    const { id, value } = e.target;
    this.setState({
      [id]: value
    });
  };

  handleSelectChange = (name, e) => {
    this.setState({
      [name]: e
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
    const { auth, authError, users, isLoading } = this.props;
    const { faculty, role } = this.state;
    if (isEmpty(auth.uid)) {
      return <Redirect to="/" />;
    }
    if (isEmpty(users) || isLoading) {
      return <Spinner isLoading />;
    }
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create Account</h5>
          <div className="input-field">
            <label htmlFor="email">Username</label>
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
          {role.value === ROLE.Cordinator && (
            <>
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
                onChange={e => this.handleSelectChange('faculty', e)}
                options={options}
              />
            </>
          )}
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">
              Create Account
            </button>
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
    isLoading: state.auth.isLoading,
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
    asd: state.firestore.ordered
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
)(CreateCordinators);
