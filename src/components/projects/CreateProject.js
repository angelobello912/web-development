import React, { Component } from 'react';
import { createProject } from '../../store/actions/projectActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
class CreateProject extends Component {
  state = {
    title: '',
    description: '',
    wordFile: '',
    url: ''
  };
  handleSubmit = e => {
    const { dispatchCreateProject } = this.props;
    e.preventDefault();
    dispatchCreateProject(this.state);
  };

  handleChange = e => {
    const { id, value } = e.target;
    this.setState({
      [id]: value
    });
  };

  handleFileUpload = e => {
    const { id, value, files } = e.target;
    this.setState({
      [id]: value,
      wordFile: files[0]
    });
  };

  render() {
    const { auth } = this.props;
    console.log(this.state);
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create Contributions</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="description">Description</label>
            <input type="text" id="description" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <input type="file" id="url" onChange={this.handleFileUpload} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchCreateProject: project => dispatch(createProject(project))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProject);
