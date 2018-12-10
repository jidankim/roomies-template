import React from 'react';
import { connect } from 'react-redux';
import { DormGrid, Notification } from 'components';
import { dormListRequest } from 'actions/dorm';
import { openNotif } from 'actions/notification';
import { getPrefRequest, getProfileRequest } from 'actions/profile';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      // LOAD USER PROFILE, PREFERENCE, and DORM
      this.props.getPrefRequest();
      this.props.getProfileRequest();
      this.props.dormListRequest();
    }

    // LOAD NEW EVENT EVERY 5 SECONDS
    // const loadEventLoop = () => {
    //   this.loadNewEvent().then(() => {
    //     this.eventLoaderTimeoutId = setTimeout(loadEventLoop, 1000);
    //   });
    // };
    //
    // this.props
    //   .eventListRequest(this.props.displayedMonthIndex, this.props.filter)
    //   .then(() => {
    //     // BEGIN NEW EVENT LOADING LOOP
    //     loadEventLoop();
    //   });
  }

  // componentWillUnmount() {
  //   // STOPS THE loadEventLoop
  //   clearTimeout(this.eventLoaderTimeoutId);
  // }
  //
  // loadNewEvent = () => {
  //   // CANCEL IF THERE IS A PENDING REQUEST
  //   if (this.props.listStatus === 'WAITING')
  //     return new Promise((resolve, reject) => {
  //       resolve();
  //     });
  //
  //   console.log(this.props.eventData);
  //   return this.props.eventListRequest(
  //     this.props.displayedMonthIndex,
  //     this.props.filter
  //   );
  // };

  // /* POST EVENT */
  // handlePost = contents => {
  //   return this.props.eventPostRequest(contents).then(() => {
  //     if (this.props.postStatus.status === 'SUCCESS') {
  //       // TRIGGER LOAD NEW EVENT
  //       this.loadNewEvent().then(() => {
  //         this.props.openNotif('Success!', 'success');
  //       });
  //     } else {
  //       /*
  //                       ERROR CODES
  //                           1: NOT LOGGED IN
  //                           2: EMPTY CONTENTS
  //                           3: INVALID DATES
  //                   */
  //       switch (this.props.postStatus.error) {
  //         case 1:
  //           // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
  //           this.props.openNotif('You are not logged in', 'error');
  //           setTimeout(() => {
  //             location.reload(false);
  //           }, 2000);
  //           break;
  //         case 2:
  //           this.props.openNotif('Please write something', 'error');
  //           break;
  //         case 3:
  //           this.props.openNotif(
  //             'Make sure end date is after start date',
  //             'error'
  //           );
  //           break;
  //         default:
  //           this.props.openNotif('Something broke', 'error');
  //           break;
  //       }
  //     }
  //   });
  // };
  //
  // handleEdit = (id, index, contents) => {
  //   return this.props.eventEditRequest(id, index, contents).then(() => {
  //     if (this.props.editStatus.status === 'SUCCESS') {
  //       this.props.openNotif('Success!', 'success');
  //     } else {
  //       /*
  //                       ERROR CODES
  //                           1: INVALID ID,
  //                           2: EMPTY CONTENTS,
  //                           3: INVALID DATES,
  //                           4: NOT LOGGED IN,
  //                           5: NO RESOURCE,
  //                           6: PERMISSION FAILURE
  //                   */
  //       let errorMessage = [
  //         'Something broke',
  //         'Please write something',
  //         'Make sure end date is after start date',
  //         'You are not logged in',
  //         'That event does not exist anymore',
  //         'You do not have permission'
  //       ];
  //
  //       let error = this.props.editStatus.error;
  //
  //       // NOTIFY ERROR
  //       this.props.openNotif(errorMessage[error - 1], 'error');
  //
  //       // IF NOT LOGGED IN, REFRESH THE PAGE AFTER 2 SECONDS
  //       if (error === 4) {
  //         setTimeout(() => {
  //           location.reload(false);
  //         }, 2000);
  //       }
  //     }
  //   });
  // };
  //
  // handleRemove = (id, index) => {
  //   this.props.eventRemoveRequest(id, index).then(() => {
  //     if (this.props.removeStatus.status === 'SUCCESS') {
  //       // LOAD MORE EVENT IF THERE IS NO SCROLLBAR 1 SECOND LATER
  //       setTimeout(() => {
  //         if ($('body').height() < $(window).height()) {
  //           this.loadOldEvent();
  //         }
  //       }, 1000);
  //     } else {
  //       // ERROR
  //       /*
  //         DELETE EVENT: DELETE /api/event/:id
  //         ERROR CODES
  //           1: INVALID ID
  //           2: NOT LOGGED IN
  //           3: NO RESOURCE
  //           4: PERMISSION FAILURE
  //       */
  //       let errorMessage = [
  //         'Something broke',
  //         'You are not logged in',
  //         'That event does not exist',
  //         'You do not have permission'
  //       ];
  //
  //       // NOTIFY ERROR
  //       this.props.openNotif(
  //         errorMessage[this.props.removeStatus.error - 1],
  //         'error'
  //       );
  //
  //       // IF NOT LOGGED IN, REFRESH THE PAGE
  //       if (this.props.removeStatus.error === 2) {
  //         setTimeout(() => {
  //           location.reload(false);
  //         }, 2000);
  //       }
  //     }
  //   });
  // };

  render() {
    const mockData = {
      N20: {
        name: 'Shilloe',
        fee: 400000,
        capacity: 0
      },
      N17: {
        name: 'Seongsil',
        fee: 400000,
        capacity: 0
      },
      W4: {
        name: 'Heemang',
        fee: 600000,
        capacity: 0
      },
      W6: {
        name: 'Miru',
        fee: 600000,
        capacity: 0
      }
    }

    return (
      <div
        style={{
          marginTop: 20
        }}
      >
        {this.props.isLoggedIn ? (
          <div>
            <DormGrid dormData={this.props.dormData} />
            <Notification
              message={this.props.message}
              open={this.props.open}
              variant={this.props.variant}
            />
          </div>
        ) : (
          <div
            style={{
              marginLeft: 50
            }}
          >
            Welcome. Please log in.
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dormData: state.dorm.list.data,
    isLoggedIn: state.authentication.status.isLoggedIn,
    message: state.notification.message,
    open: state.notification.open,
    variant: state.notification.variant
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dormListRequest: () => dispatch(dormListRequest()),
    getPrefRequest: () => dispatch(getPrefRequest()),
    getProfileRequest: () => dispatch(getProfileRequest()),
    openNotif: (message, variant) => dispatch(openNotif(message, variant)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
