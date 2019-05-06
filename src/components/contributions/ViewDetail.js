import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty, find, get } from 'lodash';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../../base/components/Spinner';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { STATUS } from '../constant';
import {
  commentOrReplyProject,
  approveProject
} from '../../store/actions/projectActions';
class ViewDetail extends Component {
  state = {
    textValue: ''
  };
  getPostById = () => {
    const { posts, match } = this.props;
    const post = find(posts, item => {
      return item.id === match.params.id;
    });
    return post;
  };

  getCommentData = () => {
    const post = this.getPostById();
    const replyDataComment = [
      ...get(post, 'comment', []),
      ...get(post, 'reply', [])
    ];
    console.log(replyDataComment, 'replyDataComment');
    replyDataComment.sort(function compare(a, b) {
      const dateA = new Date(a.dateTime);
      const dateB = new Date(b.dateTime);
      return dateB - dateA;
    });
    return replyDataComment;
  };

  getStatusColor = status => {
    console.log(status, 'status');
    if (status === STATUS.Reject) {
      return 'danger';
    }
    if (status === STATUS.Pending) {
      return 'warning';
    }
    if (status === STATUS.Approved) {
      return 'success';
    }
    if (status === STATUS.Publish) {
      return 'primary';
    }
  };

  approveProject = status => {
    const { dispatchApproveProjects, match } = this.props;
    dispatchApproveProjects([match.params.id], status);
  };

  onChangeText = value => {
    this.setState({
      textValue: value.target.value
    });
  };

  onCommentOrReply = () => {
    const { dispatchCommentOrReplyProject, profile, match } = this.props;
    const { textValue } = this.state;
    const status = profile.role === 'Student' ? 'reply' : 'comment';
    const comment = {
      data: textValue,
      teacherId: profile.userId,
      teacherName: profile.firstName + profile.lastName,
      dateTime: new Date().toString(),
      status: status
    };

    dispatchCommentOrReplyProject(match.params.id, comment, status);
    this.setState({
      textValue: ''
    });
  };

  onDownload = () => {
    return this.getPostById().fileURL;
  };

  render() {
    const { auth, posts, profile, isLoading, match } = this.props;
    const { textValue } = this.state;
    const post = this.getPostById();
    if (isEmpty(posts) || isEmpty(profile) || isLoading) {
      return <Spinner isLoading />;
    }

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }

    return (
      <Container>
        <Row style={{ marginTop: 20 }}>
          <Col sm={8}>
            <h2>
              {' '}
              <h4 style={{ fontWeight: 'bold' }}>Title:</h4>
              {post.title}
            </h2>
            <p>
              <h5 style={{ fontWeight: 'bold' }}>Description:</h5>
              {post.description}
            </p>
            <p>
              <h5 style={{ fontWeight: 'bold' }}>Status:</h5>
              <Button variant={this.getStatusColor(post.status)}>
                {post.status}
              </Button>
            </p>
            <p>
              <h5 style={{ fontWeight: 'bold' }}>Create Date Time:</h5>
              {post.createdDateTime}
            </p>
            <p>
              <h5 style={{ fontWeight: 'bold' }}>Updated Date Time: </h5>
              {post.updatedDateTime || 'Not Update Yet'}
            </p>
            <h3>
              <h5 style={{ fontWeight: 'bold' }}>Student Name: </h5>{' '}
              {post.studentName}
            </h3>
          </Col>
          {profile.role === 'Student' ? (
            <Col sm={4} className="right">
              {(this.getPostById().status === 'pending' ||
                this.getPostById().status === 'reject') && (
                <Button
                  variant="primary"
                  href={`/editProject/${match.params.id}`}
                >
                  Edit
                </Button>
              )}
              <Button
                variant="pink"
                href={`/contributionDetail/${match.params.id}`}
              >
                View File
              </Button>
              <Button variant="pink" href={this.getPostById().fileURL}>
                Download
              </Button>
            </Col>
          ) : (
            <Col sm={4} className="right">
              <Button
                variant="primary"
                onClick={() => this.approveProject('approved')}
              >
                Approve
              </Button>
              <Button
                variant="danger"
                onClick={() => this.approveProject('reject')}
              >
                Reject
              </Button>
              <Button
                variant="pink"
                href={`/contributionDetail/${match.params.id}`}
              >
                View File
              </Button>
              <Button variant="pink" href={this.getPostById().fileURL}>
                Download
              </Button>
            </Col>
          )}
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Feedback</Form.Label>
              <Form.Control
                value={textValue}
                onChange={this.onChangeText}
                style={{ resize: 'none' }}
                as="textarea"
                rows="4"
              />
            </Form.Group>
            <Button
              onClick={this.onCommentOrReply}
              variant="primary"
              className="right"
            >
              {profile.role === 'Student' ? 'Reply' : 'Comment'}
            </Button>
          </Col>
        </Row>
        {!isEmpty(this.getCommentData()) && (
          <Row>
            <Col>
              {this.getCommentData().map(item => {
                return (
                  <div
                    style={{
                      borderRadius: 10,
                      marginLeft: item.status === 'reply' ? 300 : 0,
                      marginRight: item.status === 'comment' ? 300 : 0,
                      marginBottom: 10,
                      padding: 10,
                      paddingBottom: 1,
                      paddingTop: 5
                    }}
                    className={
                      item.status === 'reply' ? 'light-blue' : 'light-green'
                    }
                  >
                    <h6 className="left">
                      <b>Name: </b>
                      {item.teacherName}
                    </h6>
                    <h6 className="right">
                      <b>DateTime: </b>
                      {item.dateTime}
                    </h6>
                    <br />
                    <br />
                    <p>{item.data}</p>
                  </div>
                );
              })}
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered,
    posts: state.firestore.ordered.posts,
    profile: state.firebase.profile,
    isLoading: state.project.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchCommentOrReplyProject: (project_id, commentOrReplyData, status) =>
      dispatch(commentOrReplyProject(project_id, commentOrReplyData, status)),
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
)(ViewDetail);
