import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { isEmpty } from 'lodash';
import Spinner from '../../base/components/Spinner';
import { ROLE } from '../constant';
import { Navbar, Nav, NavDropdown, ListGroup } from 'react-bootstrap';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Popup from 'reactjs-popup';
import { readNoti } from '../../store/actions/projectActions';
import { withRouter } from 'react-router';
class SignedInLink extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = ({ target }) => {
      this.setState(s => ({ target, show: !s.show }));
    };

    this.state = {
      show: false
    };
  }

  readNoti = (e, id, postId) => {
    const { dispatchReadNoti } = this.props;
    e.preventDefault();
    dispatchReadNoti(id);
    this.props.history.push(`/viewDetail/${postId}`);
  };

  renderNotifications = () => {
    const {
      profile: { firstName = '', lastName = '' },
      notifications,
      profile
    } = this.props;

    const myNoti = notifications.filter(item => {
      return item.recieverId === profile.userId;
    });

    const myNotReadNoti = myNoti.filter(item => {
      return !item.isRead;
    });

    if (!isEmpty(myNotReadNoti)) {
      return (
        <Popup
          trigger={
            <button className="btn pink lighten-1">
              {myNotReadNoti.length}
            </button>
          }
          modal
          closeOnDocumentClick
        >
          <ListGroup>
            {myNoti.map(item => {
              return (
                <ListGroup.Item
                  action
                  style={{ marginBottom: 10 }}
                  active={!item.isRead}
                  onClick={e => this.readNoti(e, item.id, item.postId)}
                >
                  {`${item.senderName} ${item.text}`}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Popup>
      );
    }

    return (
      <Popup
        trigger={
          <button className="btn pink lighten-1">
            {firstName.charAt(0) + lastName.charAt(0)}
          </button>
        }
        modal
        closeOnDocumentClick
      >
        <ListGroup>
          {myNoti.map(item => {
            return (
              <ListGroup.Item
                action
                style={{ marginBottom: 10 }}
                active={!item.isRead}
                onClick={e => this.readNoti(e, item.id, item.postId)}
              >
                {`${item.senderName} ${item.text}`}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Popup>
    );
  };

  render() {
    const {
      dispatchSignOut,
      profile: { firstName = '', lastName = '' },
      profile,
      notifications
    } = this.props;

    if (isEmpty(notifications)) {
      return null;
    }
    if (isEmpty(profile)) {
      return <Spinner isLoading />;
    }

    if (profile.role === ROLE.Student) {
      return (
        <>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            style={{
              backgroundColor: '#202020',
              marginTop: -15,
              zIndex: 10,
              paddingLeft: 15
            }}
          >
            <Nav className="mr-auto">
              <Nav.Link>
                <NavLink to="/createProject">New Contribution</NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink to="/contributions">Contributions</NavLink>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>
                <a href="/" onClick={dispatchSignOut}>
                  Log Out
                </a>
              </Nav.Link>
              <Nav.Link>{this.renderNotifications()}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      );
    }

    if (profile.role === ROLE.Cordinator) {
      return (
        <>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            style={{
              backgroundColor: '#202020',
              marginTop: -15,
              zIndex: 10,
              paddingLeft: 15
            }}
          >
            <Nav className="mr-auto">
              <Nav.Link>
                <NavLink to="/createStudents">Create Students</NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink to="/students">Manage Students</NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink to="/contributions">Contributions</NavLink>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>
                <a href="/" onClick={dispatchSignOut}>
                  Log Out
                </a>
              </Nav.Link>
              <Nav.Link href="/">
                <NavLink className="btn pink lighten-1">
                  {firstName.charAt(0) + lastName.charAt(0)}
                </NavLink>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      );
    }

    if (profile.role === ROLE.Marketing_Manager) {
      return (
        <>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            style={{
              backgroundColor: '#202020',
              marginTop: -15,
              zIndex: 10,
              paddingLeft: 15
            }}
          >
            <Nav className="mr-auto">
              <Nav.Link>
                <NavLink to="/createCordinators">Create Coordinators</NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink to="/students">Manage Account</NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink to="/contributions">Contributions</NavLink>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>
                <a href="/" onClick={dispatchSignOut}>
                  Log Out
                </a>
              </Nav.Link>
              <Nav.Link href="/">
                <NavLink className="btn pink lighten-1">
                  {firstName.charAt(0) + lastName.charAt(0)}
                </NavLink>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      );
    }

    if (profile.role === ROLE.Admin) {
      return (
        <>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            style={{
              backgroundColor: '#202020',
              marginTop: -15,
              zIndex: 10,
              paddingLeft: 15
            }}
          >
            <Nav className="mr-auto">
              <Nav.Link>
                <NavLink to="/createAccount">Create Account</NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink to="/students">Manage Account</NavLink>
              </Nav.Link>
              <NavDropdown title="Reports" id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <NavLink to="/reports">Number of Reports</NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink to="/reports2">Percentage of contributions</NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink to="/reports3">
                    Number of contributors within each Faculty
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link>
                <a href="/" onClick={dispatchSignOut}>
                  Log Out
                </a>
              </Nav.Link>
              <Nav.Link href="/">
                <NavLink className="btn pink lighten-1">
                  {firstName.charAt(0) + lastName.charAt(0)}
                </NavLink>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      );
    }

    return (
      <>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          style={{
            backgroundColor: '#202020',
            marginTop: -15,
            zIndex: 10,
            paddingLeft: 15
          }}
        >
          <Nav className="mr-auto">
            <Nav.Link>
              <NavLink to="/createProject">New Contribution</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to="/contributions">Contributions</NavLink>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link>
              <a href="/" onClick={dispatchSignOut}>
                Log Out
              </a>
            </Nav.Link>
            <Nav.Link href="/">
              <NavLink className="btn pink lighten-1">
                {firstName.charAt(0) + lastName.charAt(0)}
              </NavLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchSignOut: () => dispatch(signOut()),
    dispatchReadNoti: id => dispatch(readNoti(id))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(['notifications'])
)(withRouter(SignedInLink));
