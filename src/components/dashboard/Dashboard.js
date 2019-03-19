import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
class Dashboard extends Component {
  render() {
    const { projects } = this.props;
    return (
      <div>
        {map(projects, (item, index) => {
          return (
            <div key={index}>
              <h1>
                {item.name}-{item.class}
              </h1>
              <h2> </h2>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state, 'stateeee');
  return {
    projects: state.firestore.ordered.projects
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: 'projects'
    }
  ])
)(Dashboard);
