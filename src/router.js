import React from 'react';
import { connect } from 'react-redux';

// Router
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

// Container Components
import { App, DormFloor, Home, Login, Profile, Register } from 'containers';

// const PrivateRoute = ({ component: Component, authed, ...rest }) => (
//   <Route {...rest} render={(props) =>
//     authed
//     ? <Component {...props} />
//     : <Redirect to={{ pathname: '/login', state: { from: props.location.pathname } }} /> }
//   />
// );

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
  <Route {...rest} render={(props) =>
    authed
    ? <Component {...props} />
    : <Redirect to={{ pathname: '/login', state: { from: '/' } }} /> }
  />
);

const router = (props) => (
  <div>
    <Router>
      <div>
        <App />
        <Switch>
          <PrivateRoute authed={props.isLoggedIn} exact path="/profile" component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute authed={props.isLoggedIn} exact path="/:dormID" component={DormFloor} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  </div>
);

const mapStateToProps = state => {
  return {
    isLoggedIn: state.authentication.status.isLoggedIn
  }
}

export default connect(mapStateToProps)(router);
