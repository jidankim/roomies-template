import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActions,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@material-ui/core';
import { getPrefRequest, getProfileRequest } from 'actions/profile';
import { InfoForm, Notification } from 'components';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const styles = {
  root: {
    flexGrow: 1
  },
  card: {
    width: 400
  },
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: {
        age: '',
        first_name: '',
        last_name: '',
        major: '',
        phone_number: '',
        room_id: '',
        student_id: '',
        pw: ''
      },
      userPref: {
        smoker: 'N',
        sleep_start_time: '',
        sleep_end_time: '',
        music_preference: '',
        hobby: '',
        club: ''
      },
      value: 0
    };
  }

  componentDidMount() {
    this.props.getPrefRequest()
    .then( userPref => {
      this.setState({
        ...this.state,
        userPref
      });
    });

    this.props.getProfileRequest()
    .then( userProfile => {
      this.setState({
        ...this.state,
        userProfile
      });
    });
  }

  handleEditPref = () => {

  }

  handleEditProfile = () => {

  }

  handleTabChange = (event, value) => {
    this.setState({
      ...this.state,
      value
    });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    console.log(this.state.userProfile);
    console.log(this.state.userPref);

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
        <TabContainer>
          <Card className={classes.card}>
            {value === 0 &&
              [
                <InfoForm
                  mode={true}
                  userProfile={this.state.userProfile}
                  userPref={this.state.userPref}
                />,
                <CardActions className={classes.centering}>
                  <Button onClick={this.handleEditProfile}>Update</Button>
                </CardActions>
              ]
            }
            {value === 1 &&
              [
                <InfoForm
                  mode={false}
                  userProfile={this.state.userProfile}
                  userPref={this.state.userPref}
                />,
                <CardActions className={classes.centering}>
                  <Button onClick={this.handleEditPref}>Update</Button>
                </CardActions>
              ]
            }
          </Card>
        </TabContainer>
      </Paper>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPrefRequest: () => dispatch(getPrefRequest()),
    getProfileRequest: () => dispatch(getProfileRequest())
  }
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(Profile));
