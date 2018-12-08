import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@material-ui/core';

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
  }
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
        room_id: ''
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
    this.handleEditPref = this.handleEditPref.bind(this);
    this.handleEditProfile = this.handleEditProfile.bind(this);
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

  handleEditPref() {

  }

  handleEditProfile() {

  }

  hanldeTabChange = (event, value) => {
    this.setState({
      ...this.state,
      value
    });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={this.handleTabChange}
          indicateColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Profile" />
          <Tab label="Preference" />
        </Tabs>
        { value === 0 && <TabContainer>Item One</TabContainer> }
        { value === 1 && <TabContainer>Item Two</TabContainer> }
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
