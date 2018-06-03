import React from 'react';

// Router
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

// Container Components
import { App, Home, Login, Register } from 'containers';

const router = () => (
  <div>
    <Router>
      <div>
        <App />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default router;
