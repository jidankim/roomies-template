import React from 'react';
import { connect } from 'react-redux';
import { EventList, Write } from 'components';
import { eventPostRequest, eventListRequest } from 'actions/event';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.handlePost = this.handlePost.bind(this);
    }

    componentDidMount() {
        this.props.eventListRequest(true).then(
            () => {
                console.log(this.props.eventData);
            }
        );
    }

    /* POST EVENT */
    handlePost(contents) {
        return this.props.eventPostRequest(contents).then(
            () => {
                if (this.props.postStatus.status === "SUCCESS") {
                    // TRIGGER LOAD NEW EVENT
                    // TO BE IMPLEMENTED
                    Materialize.toast('Success!', 2000);
                } else {
                    /*
                        ERROR CODES
                            1: NOT LOGGED IN
                            2: EMPTY CONTENTS
                    */
                    let $toastContent;
                    switch(this.props.postStatus.error) {
                        case 1:
                            // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
                            $toastContent = $('<span style="color: #FFB4BA">You are not logged in</span>');
                            Materialize.toast($toastContent, 2000);
                            setTimeout(() => {location.reload(false);}, 2000);
                            break;
                        case 2:
                            $toastContent = $('<span style="color: #FFB4BA">Please write something</span>');
                            Materialize.toast($toastContent, 2000);
                            break;
                        default:
                            $toastContent = $('<span style="color: #FFB4BA">Something Broke</span>');
                            Materialize.toast($toastContet, 2000);
                            break;
                    }
                }
            }
        );
    }

    render() {
        return (
            <div className="wrapper">
                { this.props.isLoggedIn ? (
                  <div>
                    <Write onPost={this.handlePost}/>
                    <EventList data={this.props.eventData} currentUser={this.props.currentUser}/>
                  </div>
                ) : (
                  <div>
                    Welcome. Please log in.
                  </div>
                ) }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.event.post,
        currentUser: state.authentication.status.currentUser,
        eventData: state.event.list.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        eventPostRequest: (contents) => {
            return dispatch(eventPostRequest(contents));
        },
        eventListRequest: (isInitial, listType, id, username) => {
            return dispatch(eventListRequest(isInitial, listType, id, username));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
