import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  CardContent,
  FormControlLabel,
  MenuItem,
  Switch,
  TextField,
} from '@material-ui/core';

const styles = theme => ({
  menu: {
    width: 400
  },
});

const majors = [
  'Biological Sciences', 'Chemistry', 'Computer Science',
  'Electrical Engineering', 'Mathematical Sciences',
  'Mechanical Engineering', 'Physics'
];

const musicPrefs = [
  'Pop', 'Jazz', 'EDM', 'Country', 'Dubstep'
];

const hobbies = [
  'Basketball', 'Boardgames', 'Dancing', 'DJ', 'Exercise', 'Movies',
  'Reading', 'Running', 'Singing', 'Soccer', 'Swimming', 'Tennis', 'Videogame'
];

const clubs = [
  'Baobab', 'Gaori', 'Haje', 'Illusion', 'Line', 'Lunatic', 'Muse', 'Puple',
  'Sixlines', 'Stroke'
];

class InfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: props.userProfile,
      userPref: props.userPref
    };
  }

  handleChange = name => e => {
    this.setState({
      ...this.state,
      [name]: [
        ...this.state[name],
        [e.target.name] = e.target.value
      ]
    })
  };

  handleCheck = e => {
    this.setState({
      ...this.state,
      userPref: {
        ...this.state.userPref,
        smoker: e.target.checked ? 'Y' : 'N'
      }
    });
  }

  render() {
    const { classes, mode } = this.props;

    const profileView = (
      <CardContent>
        <TextField
          autoFocus
          fullWidth
          disabled
          label="StudentID"
          margin="normal"
          name="student_id"
          onChange={this.handleChange('userProfile')}
          required
          value={this.state.userProfile.student_id}
        />
        <TextField
          fullWidth
          disabled
          label="Password"
          margin="normal"
          name="pw"
          onChange={this.handleChange('userProfile')}
          required
          type="password"
          value={this.state.userProfile.pw}
        />
        <TextField
          fullWidth
          label="Room ID"
          margin="normal"
          name="room_id"
          onChange={this.handleChange('userProfile')}
          value={this.state.userProfile.room_id}
        />
        <TextField
          fullWidth
          label="First Name"
          margin="normal"
          name="first_name"
          onChange={this.handleChange('userProfile')}
          required
          value={this.state.userProfile.first_name}
        />
        <TextField
          fullWidth
          label="Last Name"
          margin="normal"
          name="last_name"
          onChange={this.handleChange('userProfile')}
          required
          value={this.state.userProfile.last_name}
        />
        <TextField
          fullWidth
          label="Age"
          margin="normal"
          name="age"
          onChange={this.handleChange('userProfile')}
          type="number"
          value={this.state.userProfile.age}
        />
        <TextField
          fullWidth
          label="Major"
          margin="normal"
          name="major"
          onChange={this.handleChange('userProfile')}
          select
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          value={this.state.userProfile.major}
        >
          {majors.map(major => (
            <MenuItem key={major} value={major}>
              {major}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Phone Number"
          margin="normal"
          name="phonenumber"
          onChange={this.handleChange('userProfile')}
          placeholder="XXX-XXXX-XXXX"
          value={this.state.userProfile.phonenumber}
        />
      </CardContent>
    );

    const prefView = (
      <CardContent>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.userPref.smoker === 'Y'}
              onChange={this.handleCheck}
              value="smoker"
            />
          }
          label="Smoker? "
        />
        <TextField
          defaultValue="00:00"
          fullWidth
          inputProps={{
            step: 3600
          }}
          label="Sleep Start Time"
          margin="normal"
          name="sleep_start_time"
          onChange={this.handleChange('userPref')}
          type="time"
          value={this.state.userPref.sleep_start_time}
        />
        <TextField
          defaultValue="00:00"
          fullWidth
          inputProps={{
            step: 3600
          }}
          label="Sleep End Time"
          margin="normal"
          name="sleep_end_time"
          onChange={this.handleChange('userPref')}
          type="time"
          value={this.state.userPref.sleep_end_time}
        />
        <TextField
          fullWidth
          label="Music Preference"
          margin="normal"
          name="music_preference"
          onChange={this.handleChange('userPref')}
          select
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          value={this.state.userPref.music_preference}
        >
          {musicPrefs.map((music, index) => (
            <MenuItem key={index} value={music}>
              {music}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Hobby"
          margin="normal"
          name="hobby"
          onChange={this.handleChange('userPref')}
          select
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          value={this.state.userPref.hobby}
        >
          {hobbies.map((hobby, index) => (
            <MenuItem key={index} value={hobby}>
              {hobby}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Club"
          margin="normal"
          name="club"
          onChange={this.handleChange('userPref')}
          select
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          value={this.state.userPref.club}
        >
          {clubs.map((club, index) => (
            <MenuItem key={index} value={club}>
              {club}
            </MenuItem>
          ))}
        </TextField>
      </CardContent>
    );

    return (
      <div>
        {mode ? profileView : prefView}
      </div>
    );
  }
}

export default withStyles(styles)(InfoForm);
