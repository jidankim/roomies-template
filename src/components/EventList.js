import React from 'react';
import PropTypes from 'prop-types';
import { Event } from 'components';

class EventList extends React.Component {
    render() {
        const mapToComponents = data => {
            return data.map((event, i) => {
                return (<Event
                            data={event}
                            ownership={ (event.writer === this.props.currentUser || event.writer === "admin") }
                            key={event._id}
                        />);
            });
        };

        return (
            <div>
                {mapToComponents(this.props.data)}
            </div>
        );
    }
}

EventList.propTypes = {
  data: PropTypes.array,
  currentUser: PropTypes.string
};

EventList.defaultProps = {
  data: [],
  currentUser: ''
};

export default EventList;
