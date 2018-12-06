import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerRequest } from 'actions/authentication';
import { openNotif } from 'actions/notification';
import { Authentication, Notification } from 'components';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister = (id, pw, pwa, fn, ln, age, maj, pn) => {
    if (pw !== pwa) {
      this.props.openNotif('Password does not match', 'error');
      return new Promise.resolve(false);
    }
    return this.props.registerRequest(id, pw, fn, ln, age, maj, pn).then(() => {
      if (this.props.status === 'SUCCESS') {
        this.props.openNotif('Success! Please log in', 'success');
        this.props.history.push('/login');
        return true;
      } else {
        /*
                        ERROR CODES:
                            1: BAD USERNAME
                            2: BAD PASSWORD
                            3: USERNAME EXISTS
                    */
        let errorMessage = [
          'Invalid Username',
          'Password is too short',
          'StudentID already exists'
        ];

        this.props.openNotif(errorMessage[this.props.errorCode - 1], 'error');
        return false;
      }
    });
  }

  render() {
    return (
      <div>
        <Authentication mode={false} onRegister={this.handleRegister} />
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
    errorCode: state.authentication.register.error,
    message: state.notification.message,
    open: state.notification.open,
    status: state.authentication.register.status,
    variant: state.notification.variant
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openNotif: (message, variant) => dispatch(openNotif(message, variant)),
    registerRequest: (id, pw, fn, ln, age, maj, pn) => dispatch(registerRequest(id, pw, fn, ln, age, maj, pn))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Register)
);
