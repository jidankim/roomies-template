import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  modal: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    display: 'flex',
    flexWrap: 'wrap',
    left: '25%',
    padding: theme.spacing.unit * 4,
    position: 'absolute',
    top: '25%',
    width: theme.spacing.unit * 50,
  },
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
    this.handleToggleModal = this.handleToggleModal.bind(this);
    this.state = {
      contents: {
        eventName: '',
        endDate: new Date(),
        startDate: new Date(),
      },
      toggleModal: false
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
                ...this.state, contents: {
                    eventName: '',
                    endDate: new Date(),
                    startDate: new Date(),
                }
            });
        }
    );
  }

  handleToggleModal() {
    this.setState({
      toggleModal: !this.state.toggleModal
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="modalContainer write">
        <Button onClick={this.handleToggleModal}>Add Event</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.toggleModal}
          onClose={this.handleToggleModal}
        >
          <form onSubmit={this.handlePost} className={classes.modal}>
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
            <Button type="submit">Post</Button>
          </form>
        </Modal>
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
