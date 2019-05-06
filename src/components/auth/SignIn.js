import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';
import Spinner from '../../base/components/Spinner';
export class SignIn extends Component {
  state = {
    email: '',
    password: ''
  };

  handeChange = e => {
    const { id, value } = e.target;
    this.setState({
      [id]: value
    });
  };

  handleSubmit = e => {
    const { dispatchSignIn } = this.props;
    e.preventDefault();
    dispatchSignIn(this.state);
  };

  render() {
    const { auth, authError, authIsLoading } = this.props;
    if (authIsLoading) {
      return <Spinner isLoading />;
    }
    if (auth.uid) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handeChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handeChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Login</button>
          </div>
          <h5 style={{ color: 'red' }}>{authError}</h5>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    authIsLoading: state.auth.isLoading,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchSignIn: creds => dispatch(signIn(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
