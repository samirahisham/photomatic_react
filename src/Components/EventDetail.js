import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { ButtonToolbar, Button } from "react-bootstrap";

import ShareForm from "./ShareForm";
import UploadForm from "./UploadForm";

class EventDetail extends Component {
  state = {
    ShareShow: false,
    UploadShow: false,
    event: null,
    photos: []
  };

  componentDidMount() {
    let event = this.props.events.find(
      (event) => event.id === parseInt(this.props.match.params.eventID)
    );
    if (event) {
      this.setState({ event, photos: event.photos });
    }
    this.setState({ event });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.events !== this.props.events) {
      let event = this.props.events.find(
        (event) => event.id === parseInt(this.props.match.params.eventID)
      );
      if (event) {
        this.setState({ event, photos: event.photos });
      }
      this.setState({ event });
    }
  }

  setShareShow = (boolean) => {
    if (boolean === true) {
      this.setState({ ShareShow: true });
    } else {
      this.setState({ ShareShow: false });
    }
  };

  setUploadShow = (boolean) => {
    if (boolean === true) {
      this.setState({ UploadShow: true });
    } else {
      this.setState({ UploadShow: false });
      // window.location.reload()
    }
  };

  render() {
    if (!this.props.user) return <Redirect to="/homepage" />;
    const event = this.state.event;
    let photosList = [];
    if (this.state.photos) {
      photosList = this.state.photos.map((photo) => {
        return (
          <div className="card ml-4" style={{ width: "25rem" }}>
            <img src={photo.photo} className="card-img" alt={photo.photo} />
          </div>
        );
      });
    }

    return (
      <>
        <div className="container-fluid mt-3">
          <h1
            className="display-4 text-left mt-2 text-dark"
            style={{ marginLeft: 100, opacity: 1 }}
          >
            {event ? event.title.toUpperCase() : null}
          </h1>
          <p
            className="lead text-left text-muted"
            style={{ marginLeft: 100, marginTop: -25 }}
          >
            Location: {event ? event.location : null} | Date:{" "}
            {event ? event.date : null} at {event ? event.time : null}
          </p>
          <p
            className="text-left text-monospace text-primary"
            style={{ marginLeft: 100, marginTop: -20 }}
          >
            {event ? event.description : null}
          </p>
        </div>
        <div className="row justify-content-end  mt-4 mb-4 mr-5">
          <ButtonToolbar>
            <Button
              variant="outline-primary mr-5"
              size="lg"
              onClick={() => this.setUploadShow(true)}
            >
              Upload Photos
            </Button>
            <UploadForm
              eventID={this.props.match.params.eventID}
              show={this.state.UploadShow}
              onHide={() => this.setUploadShow(false)}
            />
          </ButtonToolbar>

          <ButtonToolbar>
            <Button
              variant="outline-warning"
              size="lg"
              onClick={() => this.setShareShow(true)}
            >
              Share Event's Album
            </Button>

            <ShareForm
              eventID={this.props.match.params.eventID}
              show={this.state.ShareShow}
              onHide={() => this.setShareShow(false)}
            />
          </ButtonToolbar>
        </div>
        <hr />
        <br></br>
        <div className="row">{photosList}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.eventsRoot.events,
    user: state.authReducer.user
  };
};

export default connect(mapStateToProps)(EventDetail);
