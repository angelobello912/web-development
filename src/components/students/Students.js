import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map, isEmpty, filter, get } from 'lodash';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import Spinner from '../../base/components/Spinner';
import { approveProject } from '../../store/actions/projectActions';
import { studentColumns } from '../contributions/data';
import { ROLE } from '../constant';
class Students extends Component {
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

  getUserData = () => {
    const { users, profile } = this.props;
    let data = { columns: studentColumns };
    let usersData = users;
    if (get(profile, 'role', '') === ROLE.Marketing_Manager) {
      usersData = filter(usersData, item => {
        return item.role !== ROLE.Admin;
      });
    }
    const studentsMap = map(usersData, item => {
      return {
        email: item.email,
        firstName: item.firstName,
        lastName: item.lastName,
        role: item.role,
        faculty: item.faculty
      };
    });
    data.rows = studentsMap;
    return data;
  };

  render() {
    const { auth, users } = this.props;

    if (isEmpty(users)) {
      return <Spinner isLoading />;
    }
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container">
        <MDBDataTable striped bordered small data={this.getUserData()} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    users: state.firestore.ordered.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchApproveProjects: project_ids =>
      dispatch(approveProject(project_ids))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(['users'])
)(Students);
