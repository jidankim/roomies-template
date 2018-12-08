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

  handleEditPref = newUserPref => {
    return this.props.editPrefRequest(newUserPref).then(() => {
      if (this.props.profileStatus === 'SUCCESS') {
        this.props.openNotif('Perference updated successfully', 'success');
        return true;
      } else {
        this.props.openNotif('Update Failed', 'error');
        return false;
      }
    })
  }

  handleEditProfile = newUserProfile => {
    return this.props.editProfileRequest(newUserProfile).then(() => {
      if (this.props.prefStatus === 'SUCCESS') {
        this.props.openNotif('Profile updated successfully', 'success');
        return true;
      } else {
        this.props.openNotif('Update Failed', 'error');
        return false;
      }
    })
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
    prefStatus: state.profile.editPref.status,
    profileStatus: state.profile.editProfile.status,
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
    },
    openNotif: (message, variant) => dispatch(openNotif(message, variant)),
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Profile));
