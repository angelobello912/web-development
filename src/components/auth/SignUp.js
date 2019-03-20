import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from './../../store/actions/authActions';
class SignUp extends Component {
  state = {
    email: '',
    password: '',
    lastName: '',
    firstName: '',
  };

  handeChange = e => {
    const { id, value } = e.target;
    this.setState({
      [id]: value
    });
  };

  handleSubmit = e => {
    const { dispatchSignUp } = this.props;
    e.preventDefault();
    dispatchSignUp(this.state)
  };


  render() {
    const { auth, authError } = this.props;
    if(auth.uid) {
      return <Redirect to='/'/>
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
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={this.handeChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.handeChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">SIGN up</button>
          </div>
          {authError && <h7 className="red-text text-darken-3">{authError}</h7>}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  }
} 

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSignUp: (creds) => dispatch(signUp(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
