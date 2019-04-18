import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map, isEmpty } from 'lodash';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { columns } from './data';
import { NavLink } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import Spinner from '../../base/components/Spinner';

class Contributions extends Component {
  getPostsDataTable = () => {
    const { posts } = this.props;
    let data = { columns: columns };
    const postsMap = map(posts, item => {
      return {
        title: item.title,
        studentId: item.studentId,
        studentName: item.studentName,
        createdDateTime: item.createdDateTime,
        fileUrl: (
          <NavLink
            to={`/contributionDetail/${item.id}`}
            style={{ color: 'blue' }}
          >
            View File
          </NavLink>
        )
      };
    });
    data.rows = postsMap;
    return data;
  };

  render() {
    const { auth, posts } = this.props;
    if (isEmpty(posts)) {
      return <Spinner isLoading />;
    }
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    return (
      <MDBDataTable striped bordered small data={this.getPostsDataTable()} />
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered,
    posts: state.firestore.ordered.posts
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(['projects', 'users', 'posts'])
)(Contributions);
