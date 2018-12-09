import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, Typography } from '@material-ui/core';
import { getRoomRequest, roomListRequest } from 'actions/dorm';
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
      comments: [],
      room_id: '',
      students: []
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const dormID = match.params.dormID;
    this.props.roomListRequest(dormID).then(() => {
      if (this.props.roomListStatus === 'SUCCESS') {
        return true;
      } else {
        return false;
      }
    });
  }

  handleClick = room_id => {
    const { match } = this.props;
    const dormID = match.params.dormID;
    this.setState({
      ...this.state,
      room_id
    });
    this.props.getRoomRequest(dormID, room_id).then(() => {
      if (this.props.roomListStatus === 'SUCCESS') {
        const i = Math.floor(parseInt(room_id.split('_')[1])/ 100) - 1;
        const j = parseInt(room_id.split('_')[1])% 10 - 1;
        const arrayRooms = this.props.dormData[dormID].rooms;
        this.setState({
          ...this.state,
          comments: arrayRooms[i][j].comments,
          students: arrayRooms[i][j].students
        });
        return true;
      } else {
        return false;
      }
    });
  }

  handleClose = () => {
    this.setState({
      room_id: ''
    });
  }

  handleMoveIn = room_id => {
    this.props.moveInRequest(room_id).then(() => {
      if (this.props.moveInStatus === 'SUCCESS') {
        this.props.history.push('/');
        return true;
      } else {
        return false;
      }
    })
  }

  render() {
    const { currentRoom, match, moveInRequest, moveOutRequest } = this.props;
    const { comments, room_id, students } = this.state;
    const dormID = match.params.dormID;
    const { capacity, name, rooms } = this.props.dormData[dormID];

    return (
      <div>
        <Typography gutterBottom variant="headline">
          {name}
        </Typography>
        {rooms !== undefined && Array(rooms.length).fill().map((cur, ind) => {
          const curFl = rooms.length - ind - 1;
          return <Floor key={curFl} dormID={dormID} fl={curFl} handleClick={this.handleClick} list={rooms[curFl]}/>
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
  const { classes, dormID, fl, handleClick, list } = props;

  return (
    [
      <Divider key={`${fl}0`} />,
      <div key={`${fl}1`} className={classes.floor}>
        <Typography className={classes.label} variant="subheading">FL {fl+1}</Typography>
        {list.map((cur) => <StyleRoom key={cur.room_id} dormID={dormID} handleClick={handleClick} room={cur}/>)}
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
    moveInStatus: state.profile.userProfile.status,
    roomListStatus: state.dorm.list.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRoomRequest: (dormID, roomID) => dispatch(getRoomRequest(dormID, roomID)),
    moveInRequest: newRoomID => dispatch(moveInRequest(newRoomID)),
    moveOutRequest: () => dispatch(moveOutRequest()),
    roomListRequest: dormID => dispatch(roomListRequest(dormID))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DormFloor));
