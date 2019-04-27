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
class App extends Component {
  render() {
    const baseUrl = '/testschool-30bdb.firebaseapp.com'
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path={baseUrl + '/signin'} component={SignIn} />
            <Route path={baseUrl + "/home"} component={Dashboard} />
            <Route path={baseUrl + "/createProject"} component={CreateProject} />
            <Route
              path={baseUrl + "/contributionDetail/:id"}
              component={ContributionDetail}
            />
            <Route path={baseUrl + "/contributions"} component={Contributions} />
            <Route path={baseUrl + "/signUp"} component={SignUp} />
            <Route path={baseUrl + "/createAccount"} component={CreateAccount} />
            <Route path={baseUrl + "/createCordinators"} component={CreateCordinators} />
            <Route path={baseUrl + "/students"} component={Students} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
