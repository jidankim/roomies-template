import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginRequest } from 'actions/authentication';
import { openNotif } from 'actions/notification';
import { Authentication, Notification } from 'components';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin = (id, pw) => {
    return this.props.loginRequest(id, pw).then(() => {
      if (this.props.status === 'SUCCESS') {
        // create session data
        let loginData = {
          isLoggedIn: true,
          username: id
        };

        document.cookie = 'key=' + btoa(JSON.stringify(loginData));
        this.props.openNotif(`Welcome ${id} !`, 'info');
        this.props.history.push('/');
        return true;
      } else {
        this.props.openNotif('Incorrect username or password', 'error');
        return false;
      }
    });
  }

  render() {
    return (
      <div>
        <Authentication mode={true} onLogin={this.handleLogin} />
        <Notification
          message={this.props.message}
          open={this.props.open}
          variant={this.props.variant}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    message: state.notification.message,
    open: state.notification.open,
    status: state.authentication.login.status,
    variant: state.notification.variant
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginRequest: (id, pw) => dispatch(loginRequest(id, pw)),
    openNotif: (message, variant) => dispatch(openNotif(message, variant))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
