
import React from "react";
import {Modal, Button} from 'react-bootstrap'


function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
          Event ID: DF13S
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Please type in the email address(s) of the attendees and they will get access via your Event ID</p>
          <h6>Enter Email Address(s)</h6><input className="rounded-pill"></input>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={props.onHide}>Send</Button>
          <Button variant="secondary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default MyVerticallyCenteredModal