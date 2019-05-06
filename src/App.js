import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavbarSchool from './components/layout/NavbarSchool';
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
import Reports from './components/reports/Reports';
import ViewDetail from './components/contributions/ViewDetail';
import EditProject from './components/projects/EditProject';
import Reports2 from './components/reports/Reports2';
import Reports3 from './components/reports/Reports3';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarSchool />
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/home" component={Dashboard} />
          <Route path="/createProject" component={CreateProject} />
          <Route path="/editProject/:id" component={EditProject} />
          <Route
            path="/contributionDetail/:id"
            component={ContributionDetail}
          />
          <Route path="/viewDetail/:id" component={ViewDetail} />
          <Route path="/contributions" component={Contributions} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/createStudents" component={CreateStudents} />
          <Route path="/createAccount" component={CreateAccount} />
          <Route path="/createCordinators" component={CreateCordinators} />
          <Route path="/students" component={Students} />
          <Route path="/reports" component={Reports} />
          <Route path="/reports2" component={Reports2} />
          <Route path="/reports3" component={Reports3} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
