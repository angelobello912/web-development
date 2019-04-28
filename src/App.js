import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import SignIn from './components/auth/SignIn';
import Dashboard from './components/dashboard/Dashboard';
import CreateProject from './components/projects/CreateProject';
import SignUp from './components/auth/SignUp';
import Contributions from './components/contributions/Contributions';
import ContributionDetail from './components/contributions/ContributionDetail';
import CreateAccount from './components/auth/CreateAccount';
import Students from './components/students/Students';
import CreateCordinators from './components/auth/CreateCordinators';
import CreateStudents from './components/auth/CreateStudents';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/home" component={Dashboard} />
            <Route path="/createProject" component={CreateProject} />
            <Route
              path="/contributionDetail/:id"
              component={ContributionDetail}
            />
            <Route path="/contributions" component={Contributions} />
            <Route path="/signUp" component={SignUp} />
            <Route path="/createStudents" component={CreateStudents} />
            <Route path="/createAccount" component={CreateAccount} />
            <Route path="/createCordinators" component={CreateCordinators} />
            <Route path="/students" component={Students} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
