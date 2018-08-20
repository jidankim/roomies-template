import React from 'react';
import PropTypes from 'prop-types';

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        };
        this.toggleEdit = this.toggleEdit.bind(this);
    }

    toggleEdit() {
        this.setState({
            editMode: !this.state.editMode
        });
    }

    render() {
      const { data, ownership } = this.props;
      const eDate = data.contents.endDate.split('-');
      const sDate = data.contents.startDate.split('-');

      const eventView = ( ownership ? (
          <div className="card">
              <div className="info">
                  <span className="date">{`${sDate[1]}/${sDate[2]} ~ ${eDate[1]}/${eDate[2]}`}</span>
                  <div className="option-button">
                      <a className='dropdown-button' id={`dropdown-button-${data.id}`} data-activates={`dropdown-${data.id}`}>
                          <i className="material-icons icon-button">more_vert</i>
                      </a>
                      <ul id={`dropdown-${data.id}`} className='dropdown-content'>
                          <li><a onClick={this.toggelEdit}>Edit</a></li>
                          <li><a>Remove</a></li>
                      </ul>
                  </div>
              </div>
              <div className="card-content">
                  {`Event name: ${data.contents.eventName}`}
              </div>
          </div>
        ) : undefined
      );

        const editView = (
            <div>EDIT</div>
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
