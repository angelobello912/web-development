import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty, filter } from 'lodash';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../../base/components/Spinner';
import { Pie } from 'react-chartjs-2';
import windowSize from 'react-window-size';
class Reports3 extends Component {
  getPostsByFaculty = faculty => {
    const { users } = this.props;
    const user = filter(users, item => {
      return item.role === 'Student' && item.faculty === faculty;
    });

    return user;
  };

  getChartData = () => {
    const ITUsers = this.getPostsByFaculty('IT');
    const marketingUsers = this.getPostsByFaculty('Marketing');
    const designUsers = this.getPostsByFaculty('Design');
    const data = {
      labels: ['IT', 'Marketing', 'Design'],
      datasets: [
        {
          data: [ITUsers.length, marketingUsers.length, designUsers.length],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    };
    return data;
  };

  render() {
    const { auth, posts, isLoading, profile } = this.props;
    if (isLoading) {
      return <Spinner isLoading />;
    }

    if (isEmpty(posts) || isEmpty(profile)) {
      return <Spinner isLoading />;
    }
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container">
        <h5 style={{ fontWeight: 'bold', marginTop: 10 }}>
          Number of contributors within each Faculty
        </h5>
        <Pie data={this.getChartData()} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
    posts: state.firestore.ordered.posts,
    isLoading: state.project.isLoading,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(['projects', 'users', 'posts'])
)(windowSize(Reports3));
