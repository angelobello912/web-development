import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map, isEmpty, filter } from 'lodash';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { publishColumns } from '../contributions/data';
import { NavLink } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import Spinner from '../../base/components/Spinner';
import { approveProject } from '../../store/actions/projectActions';
class Dashboard extends Component {
  state = {
    checkItem: {},
    project_ids: []
  };

  onCheckItem = (item, e) => {
    const { project_ids, checkItem } = this.state;
    let checkItemState = checkItem;
    let projectIdsState = project_ids;
    if (e.target.checked) {
      checkItemState[item.id] = item.fileURL;
      projectIdsState.push(item.id);
    } else {
      projectIdsState = filter(projectIdsState, projectId => {
        return projectId !== item.id;
      });
      delete checkItemState[item.id];
    }
    this.setState({
      checkItem: checkItemState,
      project_ids: projectIdsState
    });
  };

  getPostsDataTable = () => {
    const { posts } = this.props;
    let postsData = posts;
    postsData = posts.filter(item => {
      return item.status === 'publish';
    });
    let data = { columns: publishColumns };
    const postsMap = map(postsData, item => {
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
        ),
        download: (
          <a href={item.fileURL} style={{ color: 'blue' }}>
            Download
          </a>
        )
      };
    });
    data.rows = postsMap;
    return data;
  };

  render() {
    const { posts, isLoading } = this.props;

    if (isLoading) {
      return <Spinner isLoading />;
    }

    if (isEmpty(posts)) {
      return <Spinner isLoading />;
    }
    return (
      <div className="container">
        <MDBDataTable striped bordered small data={this.getPostsDataTable()} />
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

const mapDispatchToProps = dispatch => {
  return {
    dispatchApproveProjects: (project_ids, status) =>
      dispatch(approveProject(project_ids, status))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(['projects', 'users', 'posts'])
)(Dashboard);
