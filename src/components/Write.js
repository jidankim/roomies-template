import React from 'react';
import { Modal } from 'react-materialize';

class Write extends React.Component {
  render() {
    return (
      <div className="root">
        <Modal
          header="Add Event"
          trigger={<a class="waves-effect waves-light btn">Add Event</a>}
          children={
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <input id="event_name" type="text" />
                    <label for="event_name">Event Name</label>
                  </div>
                </div>
              </form>
            </div>
          }
        />
      </div>
    );
  }
}

export default Write;
