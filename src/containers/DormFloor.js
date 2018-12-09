import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class DormFloor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { match } = this.props;
    const dormID = match.params.dormID;
    // this.props.roomListRequest(dormID);
  }

  render() {
    const { match, dormData } = this.props;
    const dormID = match.params.dormID;
    console.log(dormData);
    console.log(dormID);
    const { capacity, maxFloor, name, rooms } = dormData[dormID];

    return (
      <div>
        <Typography>
          {name}
        </Typography>
        {Array(maxFloor).fill().map(() => {
          return <Floor />
        })}
      </div>
    );
  }
}

const Floor = props => {
  return (
    <div>FLOOR</div>
  );
}

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
