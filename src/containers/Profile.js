import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@material-ui/core';
import { InfoForm, Notification } from 'components';

const styles = {
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  card: {
    margin: 30,
    width: 400
  },
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  // handleRegister = (id, pw, pwa, fn, ln, age, maj, pn) => {
  //   if (pw !== pwa) {
  //     this.props.openNotif('Password does not match', 'error');
  //     return new Promise.resolve(false);
  //   }
  //   return this.props.registerRequest(id, pw, fn, ln, age, maj, pn).then(() => {
  //     if (this.props.status === 'SUCCESS') {
  //       this.props.openNotif('Success! Please log in', 'success');
  //       this.props.history.push('/login');
  //       return true;
  //     } else {
  //       /*
  //                       ERROR CODES:
  //                           1: BAD USERNAME
  //                           2: BAD PASSWORD
  //                           3: USERNAME EXISTS
  //                   */
  //       let errorMessage = [
  //         'Invalid Username',
  //         'Password is too short',
  //         'StudentID already exists'
  //       ];
  //
  //       this.props.openNotif(errorMessage[this.props.errorCode - 1], 'error');
  //       return false;
  //     }
  //   });
  // }

  handleEditPref = newUserPref => {
    // return this.props.editPrefRequest(newUserPref).then(() => {
    //
    // })
  }

  handleEditProfile = () => {

  }

  handleTabChange = (event, value) => {
    this.setState({ value });
  }

  render() {
    const { classes, userPref, userProfile } = this.props;
    const { value } = this.state;

    return (
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Profile" />
          <Tab label="Preference" />
        </Tabs>
        <Card className={classes.card}>
          <InfoForm
            mode={value === 0}
            userPref={userPref}
            userProfile={userProfile}
            onEditProfile={this.handleEditProfile}
            onEditPref={this.handleEditPref}
          />
        </Card>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.profile.userProfile.data,
    userPref: state.profile.userPref.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editPrefRequest: newUserPref => {
      dispatch(editPrefRequest(newUserPref));
    },
    editProfileRequest: newUserProfile => {
      dispatch(editProfileRequest(newUserProfile));
    }
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Profile));
