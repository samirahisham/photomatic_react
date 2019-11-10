import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { sendEmails } from "../redux/actions";
import Lottie from "react-lottie";

import * as donesend from "../assets/json/sendemail.json";

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: donesend.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

class ShareForm extends Component {
  state = {
    emails: null,
    event_ref: this.props.event_ref,
    id: this.props.id,
    done: false
  };

  resetShare = () => {
    this.props.onHide();
    this.setState({ emails: null, done: false });
  };

  sendIt = () => {
    this.setState({ done: true });
    this.props.sendEmails({
      emails: this.state.emails,
      event_ref: this.state.event_ref,
      id: this.state.id
    });
    setTimeout(() => this.resetShare(), 3500);
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
            Event ID: {this.props.event_ref.toUpperCase()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!this.state.done ? (
            <>
              <p>
                Please type in the email address(s) of the attendees and they
                will get access via your Event ID
              </p>
              <h6>Enter Email Address(s)</h6>
              <form className="form-signin">
                <div className="form-label-group">
                  <input
                    type="email"
                    id="inputUser"
                    className="form-control"
                    placeholder="Email"
                    name="emails"
                    onChange={this.changeHandler}
                    required
                    autofocus
                  />
                  <label for="inputUser">Email</label>
                </div>
              </form>
            </>
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <Lottie options={defaultOptions} height={400} width={400} />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => this.sendIt()}>
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
