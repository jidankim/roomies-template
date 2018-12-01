import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import LogoutIcon from '@material-ui/icons/lockOpen';
import LoginIcon from '@material-ui/icons/vpnKey';

const styles = {
  root: {
    flexGrow: 1
  },
  icon: {
    color: '#000',
    fontSize: 20
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
    margin: 0
  },
  hidden: {
    marginRight: 'auto',
    visibility: 'hidden'
  },
  right: {
    marginLeft: 'auto'
  }
};

class Header extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar color="primary" position="static">
          <Toolbar className={classes.header}>
            <IconButton className={classes.hidden}>
              <LogoutIcon className={classes.icon} />
            </IconButton>

            <Link to="/">
              <Typography variant="display1">Roomies</Typography>
            </Link>

            {this.props.isLoggedIn ? (
              <IconButton
                className={classes.right}
                color="inherit"
                aria-label="logout"
                onClick={this.props.onLogout}
              >
                <LogoutIcon className={classes.icon} />
              </IconButton>
            ) : (
              <IconButton
                className={classes.right}
                color="inherit"
                aria-label="login"
              >
                <Link to="/login">
                  <LoginIcon className={classes.icon} />
                </Link>
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func
};

Header.defaultProps = {
  isLoggedIn: false,
  onLogout: () => {
    console.error('logout function not defined');
  }
};

export default withStyles(styles)(Header);
