import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeNotif } from 'actions/notification';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import green from '@material-ui/core/colors/green';

const variantIcon = {
  error: ErrorIcon,
  info: InfoIcon,
  success: CheckCircleIcon
};

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    marginRight: theme.spacing.unit,
    opacity: 0.9
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  message: {
    alignItems: 'center',
    display: 'flex'
  },
  success: {
    backgroundColor: green[600]
  }
});

const NotificationContent = props => {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={`${classes[variant]} ${className}`}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={`${classes.icon} ${classes.iconVariant}`} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
};

NotificationContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'info', 'success']).isRequired
};

const NotificationContentWrapper = withStyles(styles)(NotificationContent);

const Notification = props => {
  const { closeNotif, message, open, variant } = props;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={open}
      autoHideDuration={6000}
      onClose={closeNotif}
    >
      <NotificationContentWrapper
        onClose={closeNotif}
        variant={variant}
        message={message}
      />
    </Snackbar>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    closeNotif: () => dispatch(closeNotif())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Notification);
