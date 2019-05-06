import React, { Component } from 'react';
import { createProject } from '../../store/actions/projectActions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../../base/components/Spinner';
import Checkbox from 'rc-checkbox';
import { find, isEmpty } from 'lodash';
import { firestoreConnect } from 'react-redux-firebase';
class EditProject extends Component {
  state = {
    title: '',
    description: '',
    wordFile: '',
    url: '',
    agreeTermAndPolicies: false,
    isFirstLoading: false
  };

  handleSubmit = e => {
    const { dispatchCreateProject } = this.props;
    e.preventDefault();
    dispatchCreateProject(this.state);
  };

  componentDidUpdate() {
    const { isFirstLoading } = this.state;
    const post = this.getPostById();
    if (!isFirstLoading && !isEmpty(post)) {
      this.setState(
        {
          title: post.title,
          description: post.description,
          isFirstLoading: true
        },
        () => {
          console.log(this.state);
        }
      );
    }
  }

  getPostById = () => {
    const { posts, match } = this.props;
    console.log(posts, 'posts');
    const post = find(posts, item => {
      return item.id === match.params.id;
    });
    return post;
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

  onCheckItem = e => {
    this.setState({
      agreeTermAndPolicies: e.target.checked
    });
  };

  render() {
    const { auth, profile, isLoading } = this.props;
    const { agreeTermAndPolicies, title, description, url } = this.state;
    if (isLoading) {
      return <Spinner isLoading />;
    }
    if (profile.isEmpty) {
      return <Spinner isLoading />;
    }
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create Contributions</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input
              value={title}
              type="text"
              id="title"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="description">Description</label>
            <input
              value={description}
              type="text"
              id="description"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <input type="file" id="url" onChange={this.handleFileUpload} />
          </div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              direction: 'row'
            }}
          >
            <label style={{ marginTop: 10 }}>
              <Checkbox onChange={(e, checked) => this.onCheckItem(e)} />
            </label>
            I accept Greenwich University Contribution's{' '}
            <a href="https://en.wikipedia.org/wiki/Terms_of_service">
              Terms & Conditions
            </a>
          </div>
          <div className="input-field">
            <button
              disabled={!agreeTermAndPolicies || isEmpty(url)}
              className="btn pink lighten-1 z-depth-0"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    isLoading: state.project.isLoading,
    posts: state.firestore.ordered.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchCreateProject: project => dispatch(createProject(project))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(['posts'])
)(EditProject);
