import React from "react";
import { Modal, Button } from "react-bootstrap";

function ShareForm(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Event ID: {props.eventID}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Please type in the email address(s) of the attendees and they will get
          access via your Event ID
        </p>
        <h6>Enter Email Address(s)</h6>
        <form className="form-signin">
          <div className="form-label-group">
            <input
              type="email"
              id="inputUser"
              className="form-control"
              placeholder="Email"
              name="username"
              // onChange={this.changeHandler}
              required
              autofocus
            />
            <label for="inputUser">Email</label>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={props.onHide}>
          Send
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ShareForm;
