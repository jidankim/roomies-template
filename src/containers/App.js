import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getStatusRequest, logoutRequest } from 'actions/authentication';
import { openNotif } from 'actions/notification';
import { Header, Notification } from 'components';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    // get cookie by name
    function getCookie(name) {
      var value = '; ' + document.cookie;
      var parts = value.split('; ' + name + '=');
      if (parts.length == 2)
        return parts
          .pop()
          .split(';')
          .shift();
    }

    // get loginData from cookie
    let loginData = getCookie('key');

    // if loginData is undefined, do nothing
    if (typeof loginData === 'undefined') return;

    // decode base64 & parse json
    loginData = JSON.parse(atob(loginData));

    // if not logged in, do nothing
    if (!loginData.isLoggedIn) return;

    // page refresehed & has a session in cookie,
    // check whether this cookie is valid or not
    this.props.getStatusRequest().then(() => {
      console.log(this.props.status);
      // if session is not valid
      if (!this.props.status.valid) {
        // logout the session
        loginData = {
          isLoggedIn: false,
          username: ''
        };

        document.cookie = 'key=' + btoa(JSON.stringify(loginData));

        // and notify
        this.props.openNotif(
          'Your session id expired, please log in again',
          'info'
        );
      }
    });
  }

  handleLogout() {
    this.props.logoutRequest().then(() => {
      this.props.openNotif('Good bye!', 'success');

      // EMPTIES THE SESSION
      let loginData = {
        isLoggedIn: false,
        username: ''
      };

      document.cookie = 'key=' + btoa(JSON.stringify(loginData));
    });
  }

  render() {
    /* Check whether current route is login or register using regex */
    let re = /(login|register)/;
    let isAuth = re.test(this.props.location.pathname);

    return (
      <div>
        {isAuth ? (
          undefined
        ) : (
          <div>
            <Header
              isLoggedIn={this.props.status.isLoggedIn}
              onLogout={this.handleLogout}
            />
            <Notification
              message={this.props.message}
              open={this.props.open}
              variant={this.props.variant}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    message: state.notification.message,
    open: state.notification.open,
    status: state.authentication.status,
    variant: state.notification.variant
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStatusRequest: () => dispatch(getStatusRequest()),
    logoutRequest: () => dispatch(logoutRequest()),
    openNotif: (message, variant) => dispatch(openNotif(message, variant))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
