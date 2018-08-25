import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField
} from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  chip: {
    marginTop: theme.spacing.unit / 4,
    maxWidth: 110,
    minWidth: 110
  },
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

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: {
        eventName: props.data.eventName,
        endDate: props.data.endDate,
        startDate: props.data.startDate
      },
      singleDate: props.data.endDate === props.data.startDate,
      editMode: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  // handling change in edit dialog
  handleChange = e => {
    this.setState({
      ...this.state,
      contents: {
        ...this.state.contents,
        [e.target.name]: e.target.value
      }
    });
  };

  // handling check on Single Day? switch
  handleCheck = e => {
    this.setState({
      ...this.state,
      singleDate: e.target.checked
    });
  };

  handleRemove = () => {
    let id = this.props.data._id;
    let index = this.props.index;
    this.toggleEdit();
    this.props.onRemove(id, index);
  };

  handleEdit = () => {
    if (this.state.editMode) {
      let id = this.props.data._id;
      let index = this.props.index;
      let contents = this.state.contents;

      // If single date, change startDate to match endDate, before editing
      if (this.state.singleDate) {
        contents.startDate = contents.endDate;
      }

      this.toggleEdit();
      this.props.onEdit(id, index, contents);
    } else {
      this.toggleEdit();
    }
  };

  // toggling edit dialog
  toggleEdit = () => {
    this.setState({
      ...this.state,
      editMode: !this.state.editMode
    });
  };

  render() {
    const { classes, data, ownership } = this.props;
    const { contents, editMode, singleDate } = this.state;

    const eDate = data.endDate.split('T')[0].split('-');
    const sDate = data.startDate.split('T')[0].split('-');
    const hiddenTextField = singleDate ? classes.hidden : '';
    const dummyTextField = singleDate ? classes.hidden : classes.disappear;
    const labelEndDate = singleDate ? 'Due Date' : 'End Date';
    const shortenedName =
      data.eventName.length > 11
        ? data.eventName.substring(0, 11) + '...'
        : data.eventName;

    const eventView = (
      <div className={classes.root}>
        <Chip
          className={classes.chip}
          label={shortenedName}
          onClick={this.handleEdit}
        />
      </div>
    );

    const editView = (
      <div>
        {eventView}
        <div className="modalContainer write">
          <Dialog open={editMode} onClose={this.handleCancel}>
            <DialogContent>
              <TextField
                autoFocus
                fullWidth
                label="Event Name"
                margin="normal"
                name="eventName"
                onChange={this.handleChange}
                value={contents.eventName}
              />
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch
                      checked={singleDate}
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
                  value={contents.startDate.split('T')[0]}
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
                  value={contents.endDate.split('T')[0]}
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
              <Button onClick={this.toggleEdit}>Cancel</Button>
              <Button onClick={this.handleRemove}>Remove</Button>
              <Button onClick={this.handleEdit}>Update</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );

    return (
      <div className="container event">{editMode ? editView : eventView}</div>
    );
  }
}

Event.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  index: PropTypes.number,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func
};

Event.defaultProps = {
  data: {
    _id: 'id1234567890',
    writer: 'Writer',
    contents: {},
    is_edited: false
  },
  index: -1,
  onEdit: (id, index, contents) => {
    console.error('onEdit function not defined');
  },
  onRemove: (id, index) => {
    console.error('onRemove function not defined');
  },
  ownership: true
};

export default withStyles(styles)(Event);
