import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
});

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            contents: props.data.contents,
            editMode: false,
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
    }

    // canceling dialog and dropdown menu
    handleCancel() {
        this.setState({
          ...this.state, anchorEl: null, editMode: !this.state.editMode
        });
    }

    // handling change in edit dialog
    handleChange(e) {
        this.setState({
            ...this.state, contents: {
                ...this.state.contents,
                [e.target.name]: e.target.value
            }
        });
    }

    // clicking on the options of the dropdown menu
    handleClick(e) {
        this.setState({
            ...this.state, anchorEl: e.currentTarget
        });
    }

    // closing the dropdown menu
    handleClose() {
        this.setState({
            ...this.state, anchorEl: null
        });
    }

    // toggling edit dialog
    toggleEdit() {
        if (this.state.editMode) {
            let id = this.props.data._id;
            let index = this.props.index;
            let contents = this.state.contents;

            this.props.onEdit(id, index, contents).then(() => {
                this.setState({
                    ...this.state, editMode: !this.state.editMode
                });
            })
        } else {
            this.setState({
                ...this.state, anchorEl: null, editMode: !this.state.editMode
            });
        }
    }

    render() {
      const { classes, data, ownership } = this.props;
      const eDate = data.contents.endDate.split('-');
      const sDate = data.contents.startDate.split('-');

      const eventView = ( ownership ? (
          <div className="card">
              <div className="info">
                  <span className="date">{`${sDate[1]}/${sDate[2]} ~ ${eDate[1]}/${eDate[2]}`}</span>
                  <div className="option-button">
                      <i
                        aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                        aria-haspopup="true"
                        className="material-icons icon-button"
                        onClick={this.handleClick}
                      >
                        more_vert
                      </i>
                      <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}
                      >
                        <MenuItem onClick={this.toggleEdit}>Edit</MenuItem>
                        <MenuItem onClick={this.handleClose}>Remove</MenuItem>
                      </Menu>
                  </div>
              </div>
              <div className="card-content">
                  {`Event name: ${data.contents.eventName}`}
              </div>
          </div>
        ) : undefined
      );

        const editView = (
          <div className="modalContainer write">
            <Dialog
              open={this.state.editMode}
              onClose={this.handleCancel}
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
                <Button onClick={this.handleCancel}>Cancel</Button>
                <Button onClick={this.toggleEdit}>Update</Button>
              </DialogActions>
            </Dialog>
          </div>
        );

        return (
            <div className="container event">
              { this.state.editMode ? editView : eventView }
            </div>
        );
    }
}

Event.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object,
    ownership: PropTypes.bool,
    onEdit: PropTypes.func,
    index: PropTypes.number,
};

Event.defaultProps = {
    data: {
        _id: 'id1234567890',
        writer: 'Writer',
        contents: {},
        is_edited: false
    },
    ownership: true,
    onEdit: (id, index, contents) => {
        console.error('onEdit function not defined');
    },
    index: -1
}

export default withStyles(styles)(Event);
