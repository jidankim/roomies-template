import React from 'react';
import { connect } from 'react-redux';
import { Calendar, EventList, Notification, Write } from 'components';
import {
  eventPostRequest,
  eventListRequest,
  eventEditRequest,
  eventRemoveRequest
} from 'actions/event';
import { openNotif } from 'actions/notification';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handlePost = this.handlePost.bind(this);
    this.loadNewEvent = this.loadNewEvent.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    // LOAD NEW EVENT EVERY 5 SECONDS
    const loadEventLoop = () => {
      this.loadNewEvent().then(() => {
        this.eventLoaderTimeoutId = setTimeout(loadEventLoop, 5000);
      });
    };

    this.props.eventListRequest(true).then(() => {
      // BEGIN NEW EVENT LOADING LOOP
      loadEventLoop();
    });
  }

  componentWillUnmount() {
    // STOPS THE loadEventLoop
    clearTimeout(this.eventLoaderTimeoutId);
  }

  loadNewEvent() {
    // CANCEL IF THERE IS A PENDING REQUEST
    if (this.props.listStatus === 'WAITING')
      return new Promise((resolve, reject) => {
        resolve();
      });

    console.log(this.props.eventData);
    // IF PAGE IS EMPTY, DO THE INITIAL LOADING
    //if (this.props.eventData.length === 0)
    return this.props.eventListRequest(true);

    // return this.props.eventListRequest(
    //   false,
    //   'new',
    //   this.props.eventData[0]._id
    // );
  }

  /* POST EVENT */
  handlePost(contents) {
    return this.props.eventPostRequest(contents).then(() => {
      if (this.props.postStatus.status === 'SUCCESS') {
        // TRIGGER LOAD NEW EVENT
        this.loadNewEvent().then(() => {
          this.props.openNotif('Success!', 'success');
        });
      } else {
        /*
                        ERROR CODES
                            1: NOT LOGGED IN
                            2: EMPTY CONTENTS
                    */
        switch (this.props.postStatus.error) {
          case 1:
            // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
            this.props.openNotif('You are not logged in', 'error');
            setTimeout(() => {
              location.reload(false);
            }, 2000);
            break;
          case 2:
            this.props.openNotif('Please write something', 'error');
            break;
          default:
            this.props.openNotif('Something broke', 'error');
            break;
        }
      }
    });
  }

  handleEdit(id, index, contents) {
    return this.props.eventEditRequest(id, index, contents).then(() => {
      if (this.props.editStatus.status === 'SUCCESS') {
        this.props.openNotif('Success!', 'success');
      } else {
        /*
                        ERROR CODES
                            1: INVALID ID,
                            2: EMPTY CONTENTS,
                            3: NOT LOGGED IN,
                            4: NO RESOURCE,
                            5: PERMISSION FAILURE
                    */
        let errorMessage = [
          'Something broke',
          'Please write something',
          'You are not logged in',
          'That event does not exist anymore',
          'You do not have permission'
        ];

        let error = this.props.editStatus.error;

        // NOTIFY ERROR
        this.props.openNotif(errorMessage[error - 1], 'error');

        // IF NOT LOGGED IN, REFRESH THE PAGE AFTER 2 SECONDS
        if (error === 3) {
          setTimeout(() => {
            location.reload(false);
          }, 2000);
        }
      }
    });
  }

  handleRemove(id, index) {
    this.props.eventRemoveRequest(id, index).then(() => {
      if (this.props.removeStatus.status === 'SUCCESS') {
        // LOAD MORE EVENT IF THERE IS NO SCROLLBAR 1 SECOND LATER
        setTimeout(() => {
          if ($('body').height() < $(window).height()) {
            this.loadOldEvent();
          }
        }, 1000);
      } else {
        // ERROR
        /*
          DELETE EVENT: DELETE /api/event/:id
          ERROR CODES
            1: INVALID ID
            2: NOT LOGGED IN
            3: NO RESOURCE
            4: PERMISSION FAILURE
        */
        let errorMessage = [
          'Something broke',
          'You are not logged in',
          'That event does not exist',
          'You do not have permission'
        ];

        // NOTIFY ERROR
        this.props.openNotif(
          errorMessage[this.props.removeStatus.error - 1],
          'error'
        );

        // IF NOT LOGGED IN, REFRESH THE PAGE
        if (this.props.removeStatus.error === 2) {
          setTimeout(() => {
            location.reload(false);
          }, 2000);
        }
      }
    });
  }

  render() {
    return (
      <div className="wrapper">
        {this.props.isLoggedIn ? (
          <div>
            <Write onPost={this.handlePost} />
            <Calendar />
            <EventList
              data={this.props.eventData}
              currentUser={this.props.currentUser}
              onEdit={this.handleEdit}
              onRemove={this.handleRemove}
            />
            <Notification
              message={this.props.message}
              open={this.props.open}
              variant={this.props.variant}
            />
          </div>
        ) : (
          <div className="intro">Welcome. Please log in.</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.authentication.status.currentUser,
    editStatus: state.event.edit,
    eventData: state.event.list.data,
    isLoggedIn: state.authentication.status.isLoggedIn,
    listStatus: state.event.list.status,
    message: state.notification.message,
    open: state.notification.open,
    postStatus: state.event.post,
    removeStatus: state.event.remove,
    variant: state.notification.variant
  };
};

const mapDispatchToProps = dispatch => {
  return {
    eventPostRequest: contents => {
      return dispatch(eventPostRequest(contents));
    },
    eventListRequest: (isInitial, listType, id, username) => {
      return dispatch(eventListRequest(isInitial, listType, id, username));
    },
    eventEditRequest: (id, index, contents) => {
      return dispatch(eventEditRequest(id, index, contents));
    },
    eventRemoveRequest: (id, index) => {
      return dispatch(eventRemoveRequest(id, index));
    },
    openNotif: (message, variant) => dispatch(openNotif(message, variant))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
