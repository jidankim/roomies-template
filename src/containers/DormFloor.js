import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Button, Divider, Paper, Typography } from '@material-ui/core';
import { roomListRequest } from 'actions/dorm';

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
  }

  componentDidMount() {
    const { match } = this.props;
    const dormID = match.params.dormID;
    this.props.roomListRequest(dormID);
  }

  render() {
    const { match, dormData } = this.props;
    const dormID = match.params.dormID;
    const { capacity, name, rooms } = dormData[dormID];
    console.log(rooms);

    return (
      <div>
        <Typography gutterBottom variant="headline" component="h2">
          {name}
        </Typography>
        {rooms !== undefined && Array(rooms.length).fill().map((cur, ind) => {
          const curFl = rooms.length - ind - 1;
          return <Floor key={curFl} fl={curFl} list={rooms[curFl]}/>
        })}
      </div>
    );
  }
}

const Floor = withStyles(styles)(props => {
  const { classes, fl, list } = props;

  return (
    [
      <Divider key={`${fl}0`} />,
      <div key={`${fl}1`} className={classes.floor}>
        <Typography className={classes.label} variant="title">FL {fl+1}</Typography>
        {list.map((cur) => <Room key={cur.room_id} room={cur}/>)}
      </div>
    ]
  );
})

const Room = withStyles(styles)(props => {
  const { classes, room } = props;
  return (
    <div className={classes.roomSlot}>
      <Typography>{`Room ${room.room_id.split('_')[1]}`}</Typography>
      <Paper className={classes.roomBox}>
        <Typography component="p">{`${room.capacity} left`}</Typography>
      </Paper>
    </div>
  );
})

const mapStateToProps = state => {
  return {
    dormData: state.dorm.list.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    roomListRequest: dormID => dispatch(roomListRequest(dormID))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DormFloor));
