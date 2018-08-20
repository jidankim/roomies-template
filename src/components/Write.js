import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
});

class Write extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleToggleDialog = this.handleToggleDialog.bind(this);
    this.state = {
      contents: {
        eventName: '',
        endDate: '',
        startDate: '',
      },
      toggleDialog: false
    };
  }

  handleChange(e) {
    this.setState({
        ...this.state, contents: {
            ...this.state.contents,
            [e.target.name]: e.target.value
        }
    });
  }

  handlePost() {
    let contents = this.state.contents;

    this.props.onPost(contents).then(
        () => {
            this.setState({
                contents: {
                    eventName: '',
                    endDate: '',
                    startDate: '',
                },
                toggleDialog: !this.state.toggleDialog
            });
        }
    );
  }

  handleToggleDialog() {
    this.setState({
      toggleDialog: !this.state.toggleDialog
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="modalContainer write">
        <Button onClick={this.handleToggleDialog}>Add Event</Button>
        <Dialog
          open={this.state.toggleDialog}
          onClose={this.handleToggleDialog}
        >
          <DialogContent>
            <TextField
              autoFocus
              fullWidth
              label="Event Name"
              margin="normal"
              name="eventName"
              onChange={this.handleChange}
            />
            <TextField
              className={classes.textField}
              label="Start Date"
              margin="normal"
              name="startDate"
              onChange={this.handleChange}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              className={classes.textField}
              label="End Date"
              margin="normal"
              name="endDate"
              onChange={this.handleChange}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleToggleDialog}>Cancel</Button>
            <Button onClick={this.handlePost}>Post</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Write.propTypes = {
  classes: PropTypes.object.isRequired,
  onPost: PropTypes.func
};

Write.defaultProps = {
    onPost: (contents) => { console.error('post function not defined'); }
};

export default withStyles(styles)(Write);
