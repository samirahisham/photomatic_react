import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { ButtonToolbar, Button } from "react-bootstrap";
import ShareForm from "./ShareForm";
import UploadForm from "./UploadForm";
import Loading from "./Loading";

const ProfilePage = ({ events, loading, user, profile }) => {
  if (!user) return <Redirect to="/homepage" />;

  if (loading) return <Loading />;

  return (
    <>
      <div className="container-fluid mt-3 navbg rounded-pill">
        {profile ? (
          <img
            src={profile.image}
            style={{
              height: 250,
              marginBottom: 25,
              width: 250,
              borderColor: "white",
              borderRadius: "50%"
            }}
            className="card-img mt-5"
            alt="profile_img"
          />
        ) : (
          <img
            src={`http://svgur.com/i/65U.svg`}
            style={{ height: 300, marginBottom: 25, width: "auto" }}
            className="card-img mt-5"
            alt="profile_img"
          />
        )}
        <div className="card text-center bg-white rounded-pill one-edge-shadow">
          <h2 className="display-4 mt-3  mb-3 text-dark">
            {`${profile.user.first_name} ${profile.user.last_name}`}
          </h2>
          <h5 className="lead text-center text-muted mb-2">
            Email & Username: {profile.user.email}
          </h5>
          <h5 className=" text-center text-monospace text-primary mb-3">
            Total Event Albums: {events.length}
          </h5>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    events: state.eventsRoot.events,
    user: state.authReducer.user,
    profile: state.authReducer.profile,
    loading: state.eventsRoot.loading
  };
};

export default connect(mapStateToProps)(ProfilePage);
