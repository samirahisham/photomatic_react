import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { ButtonToolbar, Button } from "react-bootstrap";
import { fetchEventDetail } from "../redux/actions";
import ShareForm from "./ShareForm";
import UploadForm from "./UploadForm";
import Loading from "./Loading";

const EventDetail = ({
  match,
  event,
  loading,
  processing,
  user,
  profile,
  fetchEventDetail
}) => {
  const [shareShow, setShareShow] = useState(false);
  const [uploadShow, setUploadShow] = useState(false);

  /**
   * The function passed to useEffect will run
   * when the component first mounts.
   * It will also run if any of the values in the
   * "dependency" array change.
   */
  useEffect(() => {
    fetchEventDetail(+match.params.eventID);
  }, [match.params.eventID]);

  if (!user) return <Redirect to="/homepage" />;

  if (loading) return <Loading />;

  const photos = event.photos || [];

  const photosList = photos.map((photo, idx) => {
    return (
      <div className="col-lg-3 col-md-4 col-6" key={idx}>
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

  return (
    <>
      <div className="container-fluid mt-3">
        <h1 className="display-4 text-left mt-2 text-dark mb-2">
          {event.title.toUpperCase()}
        </h1>
        <p className="text-left text-muted">
          Location: {event.location} | Date: {event.date} at {event.time} |
          Expected Number of Attendees: {event.number_of_attendees}
        </p>

        <br></br>
        <p className="text-left text-dark">{event.description}</p>
      </div>
      <div className="row justify-content-end  mt-4 mb-4 mr-5">
        <h5 className="text-primary" style={{ marginRight: 578 }}>
          {event.photos.length} Photos in this album
        </h5>
        <ButtonToolbar>
          {!!processing ? (
            <></>
          ) : (
            <Button
              variant="outline-primary mr-5"
              size="m"
              onClick={() => setUploadShow(!uploadShow)}
            >
              Upload Photos
            </Button>
          )}
          <UploadForm
            id={event.id}
            show={uploadShow}
            onHide={() => setUploadShow(!uploadShow)}
          />
        </ButtonToolbar>

        <ButtonToolbar>
          {!!processing ? (
            <Button variant="outline-warning" size="m">
              Please Wait..
            </Button>
          ) : (
            <Button
              variant="outline-warning"
              size="m"
              onClick={() => setShareShow(!shareShow)}
            >
              Share Event's Album
            </Button>
          )}
          <ShareForm
            event_ref={event.event_ref}
            sender={profile ? profile.email : "n/a"}
            id={event.id}
            show={shareShow}
            onHide={() => setShareShow(!shareShow)}
          />
        </ButtonToolbar>
      </div>
      <hr />
      <br></br>
      <div className="row text-center text-lg-left">{photosList}</div>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEventDetail: event => dispatch(fetchEventDetail(event))
  };
};

const mapStateToProps = state => {
  return {
    event: state.eventsRoot.event,
    user: state.authReducer.user,
    profile: state.authReducer.profile,
    loading: state.eventsRoot.eventLoading,
    processing: state.eventsRoot.uploadloading
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetail);
