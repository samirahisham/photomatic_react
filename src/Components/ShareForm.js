import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { sendEmails } from "../redux/actions";

class ShareForm extends Component {
  state = {
    sender: null,
    emails: null,
    event_id: this.props.ref,
    id: this.props.id
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Event ID: {this.props.eventID}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Please type in the email address(s) of the attendees and they will
            get access via your Event ID
          </p>
          <h6>Enter Email Address(s)</h6>
          <form className="form-signin">
            <div className="form-label-group">
              <input
                type="email"
                id="inputUser"
                className="form-control"
                placeholder="Email"
                name="email"
                onChange={this.changeHandler}
                required
                autofocus
              />
              <label for="inputUser">Email</label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={() =>
              this.props.onHide() && this.props.sendEmails(this.state)
            }
          >
            Send
          </Button>
          <Button variant="secondary" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sendEmails: (content) => dispatch(sendEmails(content))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ShareForm);
