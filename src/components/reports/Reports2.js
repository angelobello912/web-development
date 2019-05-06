import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty, filter, round } from 'lodash';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../../base/components/Spinner';
import { Pie } from 'react-chartjs-2';
import windowSize from 'react-window-size';
class Reports2 extends Component {
  getPostsByFaculty = faculty => {
    const { posts } = this.props;
    const post = filter(posts, item => {
      return item.faculty === faculty;
    });
    console.log(post, 'post');
    return post;
  };

  getChartData = () => {
    const ITPosts = this.getPostsByFaculty('IT');
    const marketingPosts = this.getPostsByFaculty('Marketing');
    const designPosts = this.getPostsByFaculty('Design');
    const total = ITPosts.length + marketingPosts.length + designPosts.length;
    const ITPercent = (ITPosts.length / total) * 100;
    const marketingPercent = (marketingPosts.length / total) * 100;
    const designPercent = (designPosts.length / total) * 100;

    const data = {
      labels: ['IT', 'Marketing', 'Design'],
      datasets: [
        {
          data: [
            round(ITPercent, 2),
            round(marketingPercent, 2),
            round(designPercent, 2)
          ],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    };
    return data;
  };

  render() {
    const { auth, posts, isLoading, profile, windowWidth } = this.props;
    console.log(windowWidth, 'windowWidth');
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
          Percentage of contributions by each Faculty
        </h5>
        <Pie data={this.getChartData()} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered,
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
)(windowSize(Reports2));
