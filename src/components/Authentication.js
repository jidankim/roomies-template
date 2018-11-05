import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
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
  right: {
    marginLeft: 'auto'
  }
});

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
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
    let id = this.state.username;
    let pw = this.state.password;

    this.props.onLogin(id, pw).then(success => {
      if (!success) {
        this.setState({
          password: ''
        });
      }
    });
  };

  handleRegister = () => {
    let id = this.state.username;
    let pw = this.state.password;

    this.props.onRegister(id, pw).then(result => {
      if (!result) {
        this.setState({
          username: '',
          password: ''
        });
      }
    });
  };

  handleKeyPress = e => {
    if (e.charCode == 13) {
      if (this.props.mode) {
        this.handleLogin();
      } else {
        this.handleRegister();
      }
    }
  };

  render() {
    const { classes } = this.props;

    const inputBoxes = (
      <div>
        <TextField
          autoFocus
          fullWidth
          label="Username"
          margin="normal"
          name="username"
          onChange={this.handleChange}
          value={this.state.username}
        />
        <TextField
          autoFocus
          fullWidth
          label="Password"
          margin="normal"
          name="password"
          onChange={this.handleChange}
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
        <CardContent>{inputBoxes}</CardContent>
        <CardActions className={classes.centering}>
          <Button onClick={this.handleRegister}>Create</Button>
        </CardActions>
      </div>
    );

    return (
      <div className={classes.root}>
        <Link to="/">
          <Typography variant="display2">Due dates</Typography>
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
  onRegister: (id, pw) => {
    console.error('register function not defined');
  }
};

export default withStyles(styles)(Authentication);
