import React from 'react';
import { Button, Input, Modal, Row } from 'react-materialize';

class Write extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleToggleModal = this.handleToggleModal.bind(this);
    this.state = {
      contents: {
        eventName: '',
        endDay: '',
        endMonth: '',
        startDay: '',
        startMonth: '',
      },
      toggleModal: false
    };
  }

  createSelectItems(start, end) {
    let items = [];
    for (let i = start; i <= end; i++) {
      items.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return items;
  }

  handleChange(e) {
    this.setState({
        ...this.state, contents: {
            ...this.state.contents,
            [e.target.name]: e.target.value
        }
    });
  }

  handlePost() {
    let contents = this.state.contents;

    this.props.onPost(contents).then(
        () => {
            this.setState({
                ...this.state, contents: {
                    eventName: '',
                    endDay: '',
                    endMonth: '',
                    startDay: '',
                    startMonth: '',
                }
            });
        }
    );
  }

  handleToggleModal() {
    this.setState({
      toggleModal: !this.state.toggleModal
    });
  }

  render() {
    return (
      <div className="modalContainer write">
        <a className="btn" onClick={this.handleToggleModal}>
          Add Event
        </a>
        <Modal
          actions={
            <div>
              <Button modal="close" flat>
                Close
              </Button>
              <Button modal="close" flat onClick={this.handlePost}>
                Post
              </Button>
            </div>
          }
          header="Add Event"
          open={this.state.toggleModal}
          modalOptions={{ complete: this.handleToggleModal }}
        >
          <div>
            <Row>
              <Input s={12} label="Event Name" />
              <Row>
                <Input
                  s={6}
                  type="select"
                  label="Start Month"
                  name="startMonth"
                  onChange={this.handleChange}
                >
                  {this.createSelectItems(1, 10)}
                </Input>
                <Input
                  s={6}
                  type="select"
                  label="Start Day"
                  name="startDay"
                  onChange={this.handleChange}
                >
                  {this.createSelectItems(1, 31)}
                </Input>
              </Row>
              <Row>
                <Input
                  s={6}
                  type="select"
                  label="End Month"
                  name="endMonth"
                  onChange={this.handleChange}
                >
                  {this.createSelectItems(1, 10)}
                </Input>
                <Input
                  s={6}
                  type="select"
                  label="End Day"
                  name="endDay"
                  onChange={this.handleChange}
                >
                  {this.createSelectItems(1, 31)}
                </Input>
              </Row>
            </Row>
          </div>
        </Modal>
      </div>
    );
  }
}

Write.propTypes = {
    onPost: PropTypes.func
};

Write.defaultProps = {
    onPost: (contents) => { console.error('post function not defined'); }
};

export default Write;
