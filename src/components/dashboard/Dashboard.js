import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
class Dashboard extends Component {
  render() {
    const { projects, auth, profile } = this.props;
    console.log(profile, 'profiel');
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    return (
      <div>
        {map(projects, (item, index) => {
          return (
            <div key={index}>
              <h1>
                {item.name}-{item.class}
              </h1>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    users: state.firestore.ordered,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(['projects','users', 'posts'
  ])
)(Dashboard);
