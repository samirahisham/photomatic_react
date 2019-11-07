import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { ButtonToolbar, Button } from "react-bootstrap";
import { fetchEventDetail } from "../redux/actions";
import ShareForm from "./ShareForm";
import UploadForm from "./UploadForm";
import Loading from "./Loading";

class EventDetail extends Component {
  state = {
    ShareShow: false,
    UploadShow: false
  };

  componentDidMount() {
    this.props.fetchEventDetail(parseInt(this.props.match.params.eventID));
    console.log("HERE");
  }

  setShareShow = (boolean) => {
    if (boolean) {
      this.setState({ ShareShow: true });
    } else {
      this.setState({ ShareShow: false });
    }
  };

  setUploadShow = (boolean) => {
    if (boolean) {
      this.setState({ UploadShow: true });
    } else {
      this.setState({ UploadShow: false });
      // window.location.reload()
    }
  };

  render() {
    if (!this.props.user) return <Redirect to="/homepage" />;
    const event = this.props.event;
    let photosList = [];

    if (this.props.loading) {
      return <Loading />;
    }

    if (this.props.event.photos) {
      const photos = this.props.event.photos;

      photosList = photos.map((photo) => {
        return (
          <div className="col-lg-3 col-md-4 col-6">
            <div className="d-block mb-4 h-100">
              <img
                src={photo.photo}
                className="img-fluid img-thumbnail one-edge-shadow"
                alt={photo.photo}
              />
            </div>
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
            {event.title.toUpperCase()}
          </h1>
          <p
            className="lead text-left text-muted"
            style={{ marginLeft: 100, marginTop: -25 }}
          >
            Location: {event.location} | Date: {event.date} at {event.time}
          </p>
          <p
            className="text-left text-monospace text-primary"
            style={{ marginLeft: 100, marginTop: -20 }}
          >
            {event.description}
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
              id={event.id}
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
              ref={event.event_ref}
              sender={this.props.profile ? this.props.profile.email : "n/a"}
              id={event.id}
              show={this.state.ShareShow}
              onHide={() => this.setShareShow(false)}
            />
          </ButtonToolbar>
        </div>
        <hr />
        <br></br>
        <div className="row text-center text-lg-left">{photosList}</div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEventDetail: (event) => dispatch(fetchEventDetail(event))
  };
};

const mapStateToProps = (state) => {
  return {
    event: state.eventsRoot.event,
    user: state.authReducer.user,
    loading: state.eventsRoot.eventLoading
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetail);
