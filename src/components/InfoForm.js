import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  CardActions,
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
      userProfile: Object.keys(props.userProfile).reduce((result, key) => {
        const val = props.userProfile[key];
        result[key] = val === null ? '' : val;
        return result;
      }, {}),
      userPref: Object.keys(props.userPref).reduce((result, key) => {
        const val = props.userPref[key];
        result[key] = val === null ? '' : val;
        return result;
      }, {})
    };
  }

  handleChange = name => e => {
    this.setState({
      ...this.state,
      [name]: {
        ...this.state[name],
        [e.target.name]: e.target.value
      }
    });
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

  handleEditPref = () => {
    this.props.onEditPref(this.state.userPref);
  }

  handleEditProfile = () => {
    this.props.onEditProfile(this.state.userProfile);
  }

  render() {
    const { classes, mode } = this.props;

    const profileView = (
      [
        <CardContent key="content">
          <TextField
            autoFocus
            disabled
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            label="StudentID"
            margin="normal"
            name="student_id"
            onChange={this.handleChange('userProfile')}
            required
            value={this.state.userProfile.student_id}
          />
          <TextField
            disabled
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            label="Password"
            margin="normal"
            name="pw"
            onChange={this.handleChange('userProfile')}
            required
            type="password"
            value={this.state.userProfile.pw}
          />
          <TextField
            disabled
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            label="Room ID"
            margin="normal"
            name="room_id"
            onChange={this.handleChange('userProfile')}
            value={this.state.userProfile.room_id}
          />
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            label="First Name"
            margin="normal"
            name="first_name"
            onChange={this.handleChange('userProfile')}
            required
            value={this.state.userProfile.first_name}
          />
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            label="Last Name"
            margin="normal"
            name="last_name"
            onChange={this.handleChange('userProfile')}
            required
            value={this.state.userProfile.last_name}
          />
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            label="Age"
            margin="normal"
            name="age"
            onChange={this.handleChange('userProfile')}
            type="number"
            value={this.state.userProfile.age}
          />
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
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
            InputLabelProps={{
              shrink: true,
            }}
            label="Phone Number"
            margin="normal"
            name="phonenumber"
            onChange={this.handleChange('userProfile')}
            placeholder="XXX-XXXX-XXXX"
            value={this.state.userProfile.phonenumber}
          />
        </CardContent>,
        <CardActions key="actions" className={classes.centering}>
          <Button onClick={this.handleEditProfile}>Update</Button>
        </CardActions>
      ]
    );

    const prefView = (
      [
        <CardContent key="content">
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
            InputLabelProps={{
              shrink: true,
            }}
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
            InputLabelProps={{
              shrink: true,
            }}
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
            InputLabelProps={{
              shrink: true,
            }}
            label="Music Preference"
            margin="normal"
            name="music_Preference"
            onChange={this.handleChange('userPref')}
            select
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            value={this.state.userPref.music_Preference}
          >
            {musicPrefs.map((music, index) => (
              <MenuItem key={index} value={music}>
                {music}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
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
            InputLabelProps={{
              shrink: true,
            }}
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
        </CardContent>,
        <CardActions key="actions" className={classes.centering}>
          <Button onClick={this.handleEditPref}>Update</Button>
        </CardActions>
      ]
    );

    return (
      <div>
        {mode ? profileView : prefView}
      </div>
    );
  }
}

export default withStyles(styles)(InfoForm);
