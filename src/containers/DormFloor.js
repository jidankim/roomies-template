import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, Typography } from '@material-ui/core';
import { roomListRequest } from 'actions/dorm';
import { moveInRequest, moveOutRequest } from 'actions/profile';

const styles = theme => ({
  floor: {
    alignItems: 'stretch',
    display: 'flex',
    height: 100
  },
  label: {
    marginRight: theme.spacing.unit * 2,
    verticalAlign: 'top'
  },
  roomBox: {
    alignItems: 'center',
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  roomSlot: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: theme.spacing.unit * 2
  }
});

class DormFloor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room_id: ''
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const dormID = match.params.dormID;
    this.props.roomListRequest(dormID);
  }

  handleClick = room_id => {
    this.setState({ room_id });
  }

  handleClose = () => {
    this.setState({
      room_id: ''
    });
  }

  handleMoveIn = room_id => {
    this.props.moveInRequest(room_id).then(() => {
      if (this.props.status === 'SUCCESS') {
        this.props.history('/');
        return true;
      }
    })
  }

  render() {
    const { currentRoom, dormData, match, moveInRequest, moveOutRequest } = this.props;
    const { room_id } = this.state;
    const dormID = match.params.dormID;
    const { capacity, name, rooms } = dormData[dormID];
    
    return (
      <div>
        <Typography gutterBottom variant="headline">
          {name}
        </Typography>
        {rooms !== undefined && Array(rooms.length).fill().map((cur, ind) => {
          const curFl = rooms.length - ind - 1;
          return <Floor key={curFl} fl={curFl} handleClick={this.handleClick} list={rooms[curFl]}/>
        })}
        <Dialog open={room_id !== ''} onClose={this.handleClose}>
          <DialogTitle>
            <Typography gutterBottom variant="title">
              {`Room ${room_id.split('_')[1]}`}
            </Typography>
          </DialogTitle>
          <DialogContent>

          </DialogContent>
          <DialogActions>
            {currentRoom === room_id ? (
              <Button onClick={() => moveOutRequest()}>Move out</Button>
            ) : (
              <Button onClick={() => moveInRequest(room_id)}>Move in</Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const Floor = withStyles(styles)(props => {
  const { classes, fl, handleClick, list } = props;

  return (
    [
      <Divider key={`${fl}0`} />,
      <div key={`${fl}1`} className={classes.floor}>
        <Typography className={classes.label} variant="subheading">FL {fl+1}</Typography>
        {list.map((cur) => <StyleRoom key={cur.room_id} handleClick={handleClick} room={cur}/>)}
      </div>
    ]
  );
})

class Room extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    const { handleClick, room } = this.props;
    handleClick(room.room_id);
  }

  render() {
    const { classes, room } = this.props;
    return (
      <div className={classes.roomSlot} onClick={this.handleClick}>
        <Typography>{`Room ${room.room_id.split('_')[1]}`}</Typography>
        <Paper className={classes.roomBox}>
          <Typography component="p">{`${room.capacity} left`}</Typography>
        </Paper>
      </div>
    );
  }
}

const StyleRoom = withStyles(styles)(Room);

const mapStateToProps = state => {
  return {
    currentRoom: state.profile.userProfile.data.room_id,
    dormData: state.dorm.list.data,
    status: state.profile.userProfile.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    moveInRequest: newRoomID => dispatch(moveInRequest(newRoomID)),
    moveOutRequest: () => dispatch(moveOutRequest()),
    roomListRequest: dormID => dispatch(roomListRequest(dormID))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DormFloor));
