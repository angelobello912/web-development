import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty, filter, reduce } from 'lodash';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../../base/components/Spinner';
import { Bar } from 'react-chartjs-2';

class Reports extends Component {
  state = {
    checkItem: {},
    project_ids: []
  };

  getContributionsByFaculty = faculty => {
    const { posts } = this.props;
    const facultyContributions = filter(posts, item => {
      return item.faculty === faculty;
    });
    const years = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const contributionsByMonth = reduce(
      years,
      (result, year) => {
        let resultReduce = result;
        const a = filter(facultyContributions, contribution => {
          return new Date(contribution.createdDateTime).getMonth() === year;
        });
        if (isEmpty(a)) {
          return [...resultReduce, 0];
        }

        return [...resultReduce, a.length];
      },
      []
    );
    console.log(contributionsByMonth, 'contributionsByMonth');
    return contributionsByMonth;
  };

  getChartData = () => {
    const data = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      datasets: [
        {
          label: 'Marketing',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.getContributionsByFaculty('Marketing')
        },
        {
          label: 'IT',
          backgroundColor: 'rgba(152,251,152, 0.2)',
          borderColor: 'rgba(0,100,0)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(152,251,152, 0.6)',
          hoverBorderColor: 'rgba(0,100,0)',
          data: this.getContributionsByFaculty('IT')
        },
        {
          label: 'Design',
          backgroundColor: 'rgba(135,206,250, 0.2)',
          borderColor: 'rgba(0,191,255)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(135,206,250, 0.4)',
          hoverBorderColor: 'rgba(0,191,255)',
          data: this.getContributionsByFaculty('Design')
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
          Number of Reports By Month of Each Faculty
        </h5>
        <Bar
          data={this.getChartData()}
          height={500}
          options={{
            maintainAspectRatio: false
          }}
        />
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
)(Reports);
