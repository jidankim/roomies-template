import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  MenuItem,
  TextField,
  Typography
} from '@material-ui/core';

const styles = theme => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 50
  },
  card: {
    width: 400
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    marginTop: theme.spacing.unit,
    textAlign: 'center',
    width: 400
  },
  menu: {
    width: 400
  },
  right: {
    marginLeft: 'auto'
  }
});

const majors = [
  'Biological Sciences', 'Chemistry', 'Computer Science',
  'Electrical Engineering', 'Mathematical Sciences',
  'Mechanical Engineering', 'Physics'
];

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: '',
      firstName: '',
      lastName: '',
      major: '',
      phoneNumber: '',
      studentID: '',
      password: '',
      passwordAgain: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange = e => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  handleLogin = () => {
    let id = this.state.studentID;
    let pw = this.state.password;

    this.props.onLogin(id, pw).then(success => {
      if (!success) {
        this.setState({
          ...this.state,
          password: ''
        });
      }
    });
  };

  handleRegister = () => {
    let id = this.state.studentID;
    let pw = this.state.password;
    let pwa = this.state.passwordAgain;
    let fn = this.state.firstName;
    let ln = this.state.lastName;
    let age = this.state.age;
    let maj = this.state.major;
    let pn = this.state.phoneNumber;

    this.props
    .onRegister(id, pw, pwa, fn, ln, age, maj, pn)
    .then(result => {
      if (!result) {
        this.setState({
          studentID: '',
          password: '',
          passwordAgain: ''
        });
      }
    });
  };

  handleKeyPress = e => {
    if (e.charCode == 13) {
      if (this.props.mode) {
        this.handleLogin();
      }
      // else {
      //   this.handleRegister();
      // }
    }
  };

  render() {
    const { classes } = this.props;

    const inputBoxes = (
      <div>
        <TextField
          autoFocus
          fullWidth
          label="StudentID"
          margin="normal"
          name="studentID"
          onChange={this.handleChange}
          required
          type="number"
          value={this.state.studentID}
        />
        <TextField
          fullWidth
          label="Password"
          margin="normal"
          name="password"
          onChange={this.handleChange}
          required
          type="password"
          value={this.state.password}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    );

    const loginView = (
      <div>
        <CardContent>{inputBoxes}</CardContent>
        <CardActions>
          <Button onClick={this.handleLogin}>Submit</Button>
          <div className={classes.right}>
            New Here? <Link to="/register">Create an account</Link>
          </div>
        </CardActions>
      </div>
    );

    const registerView = (
      <div>
        <CardContent>
          {inputBoxes}
          <TextField
            fullWidth
            label="Confirm Password"
            margin="normal"
            name="passwordAgain"
            onChange={this.handleChange}
            required
            type="password"
            value={this.state.passwordAgain}
          />
          <TextField
            fullWidth
            label="First Name"
            margin="normal"
            name="firstName"
            onChange={this.handleChange}
            required
            value={this.state.firstName}
          />
          <TextField
            fullWidth
            label="Last Name"
            margin="normal"
            name="lastName"
            onChange={this.handleChange}
            required
            value={this.state.lastName}
          />
          <TextField
            fullWidth
            label="Age"
            margin="normal"
            name="age"
            onChange={this.handleChange}
            type="number"
            value={this.state.age}
          />
          <TextField
            fullWidth
            label="Major"
            margin="normal"
            name="major"
            onChange={this.handleChange}
            select
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            value={this.state.major}
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
            name="phoneNumber"
            onChange={this.handleChange}
            placeholder="XXX-XXXX-XXXX"
            value={this.state.phoneNumber}
          />
        </CardContent>
        <CardActions className={classes.centering}>
          <Button onClick={this.handleRegister}>Create</Button>
        </CardActions>
      </div>
    );

    return (
      <div className={classes.root}>
        <Link to="/">
          <Typography variant="display2">Roomies</Typography>
        </Link>
        <div className={classes.header}>
          <Typography variant="headline">
            {this.props.mode ? 'LOGIN' : 'REGISTER'}
          </Typography>
        </div>
        <Card className={classes.card}>
          {this.props.mode ? loginView : registerView}
        </Card>
      </div>
    );
  }
}

Authentication.propTypes = {
  mode: PropTypes.bool,
  onLogin: PropTypes.func,
  onRegister: PropTypes.func
};

Authentication.defaultProps = {
  mode: true,
  onLogin: (id, pw) => {
    console.error('login function not defined');
  },
  onRegister: (id, pw, pwa, fn, ln, age, maj, pn) => {
    console.error('register function not defined');
  }
};

export default withStyles(styles)(Authentication);
