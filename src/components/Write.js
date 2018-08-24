import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  disappear: {
    display: 'none'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  // hidden placed under textField b/c it is more specific
  hidden: {
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
    width: 100,
    visibility: 'hidden'
  }
});

class Write extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleToggleDialog = this.handleToggleDialog.bind(this);
    const today = new Date().toISOString().slice(0, 10);
    this.state = {
      contents: {
        eventName: '',
        endDate: today,
        startDate: today
      },
      singleDate: false,
      toggleDialog: false
    };
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contents.startDate !== prevState.contents.startDate) {
  //     this.setState({
  //       ...this.state,
  //       contents: {
  //         ...this.state.contents,
  //         endDate: this.state.contents.startDate
  //       }
  //     });
  //   }
  // If single date, change startDate to match endDate, if already not done so
  // if (
  //   this.state.singleDate &&
  //   prevState.contents.startDate !== prevState.contents.endDate
  // ) {
  //   this.setState({
  //     ...this.state,
  //     contents: {
  //       ...this.state.contents,
  //       startDate: this.state.contents.endDate
  //     }
  //   });
  // }
  // }

  handleChange(e) {
    this.setState({
      ...this.state,
      contents: {
        ...this.state.contents,
        [e.target.name]: e.target.value
      }
    });
  }

  handleCheck(e) {
    this.setState({
      ...this.state,
      singleDate: e.target.checked
    });
  }

  handlePost() {
    let contents = this.state.contents;
    const today = new Date().toISOString().slice(0, 10);

    // If single date, change startDate to match endDate, before posting
    if (this.state.singleDate) {
      contents.startDate = contents.endDate;
    }

    this.props.onPost(contents).then(() => {
      this.setState({
        contents: {
          eventName: '',
          endDate: today,
          startDate: today
        },
        singleDate: false,
        toggleDialog: !this.state.toggleDialog
      });
    });
  }

  handleToggleDialog() {
    this.setState({
      ...this.state,
      toggleDialog: !this.state.toggleDialog
    });
  }

  render() {
    const { classes } = this.props;
    const hiddenTextField = this.state.singleDate ? classes.hidden : '';
    const dummyTextField = this.state.singleDate
      ? classes.hidden
      : classes.disappear;
    const labelEndDate = this.state.singleDate ? 'Due Date' : 'End Date';

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
              value={this.state.contents.eventName}
            />
            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.singleDate}
                    name="singleDate"
                    onChange={this.handleCheck}
                    value="singleDate"
                  />
                }
                label="Single Day?"
              />
            </FormGroup>
            <div>
              <TextField
                className={`${hiddenTextField} ${classes.textField}`}
                label="Start Date"
                margin="normal"
                name="startDate"
                onChange={this.handleChange}
                type="date"
                value={this.state.contents.startDate}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className={classes.textField}
                label={`${labelEndDate}`}
                margin="normal"
                name="endDate"
                onChange={this.handleChange}
                type="date"
                value={this.state.contents.endDate}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                className={dummyTextField}
                margin="normal"
                name="dummy"
                type="date"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
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
  onPost: contents => {
    console.error('post function not defined');
  }
};

export default withStyles(styles)(Write);
