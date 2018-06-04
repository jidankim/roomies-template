import React from 'react';
import PropTypes from 'prop-types';

class Event extends React.Component {
    render() {
      const { data, ownership } = this.props;
      const eventView = ( ownership ? (
          <div className="card">
              <div className="info">
                  <a className="username">{data.writer}</a>
                  <div className="option-button">
                      <a className='dropdown-button' id={`dropdown-button-${data.id}`} data-activates={`dropdown-${data.id}`}>
                          <i className="material-icons icon-button">more_vert</i>
                      </a>
                      <ul id={`dropdown-${data.id}`} className='dropdown-content'>
                          <li><a>Edit</a></li>
                          <li><a>Remove</a></li>
                      </ul>
                  </div>
              </div>
              <div className="card-content">
                  {data.contents.eventName}
              </div>
          </div>
        ) : undefined
      );

        return (
            <div className="container event">
              { eventView }
            </div>
        );
    }
}

Event.propTypes = {
    data: PropTypes.object,
    ownership: PropTypes.bool
};

Event.defaultProps = {
    data: {
        _id: 'id1234567890',
        writer: 'Writer',
        contents: {},
        is_edited: false
    },
    ownership: true
}

export default Event;
