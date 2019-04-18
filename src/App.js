import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import SignIn from './components/auth/SignIn';
import Dashboard from './components/dashboard/Dashboard';
import CreateProject from './components/projects/CreateProject';
import SignUp from './components/auth/SignUp';
import Contributions from './components/contributions/Contributions';
import ContributionDetail from './components/contributions/ContributionDetail';
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
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
