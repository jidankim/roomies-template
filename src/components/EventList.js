import React from 'react';
import PropTypes from 'prop-types';
import { Event } from 'components';

class EventList extends React.Component {
  render() {
    const mapToComponents = data => {
      return data.map((event, i) => {
        return (
          <Event
            data={event}
            ownership={
              event.writer === this.props.currentUser ||
              event.writer === 'admin'
            }
            key={event._id}
            index={i}
            onEdit={this.props.onEdit}
            onRemove={this.props.onRemove}
          />
        );
      });
    };

    return <div>{mapToComponents(this.props.data)}</div>;
  }
}

EventList.propTypes = {
  data: PropTypes.array,
  currentUser: PropTypes.string,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func
};

EventList.defaultProps = {
  data: [],
  currentUser: '',
  onEdit: (id, index, contents) => {
    console.error('edit function not defined');
  },
  onRemove: (id, index) => {
    console.error('remove function not defined');
  }
};

export default EventList;
