import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {ButtonToolbar, Button} from 'react-bootstrap'

import MyVerticallyCenteredModal from "./ShareForm"


const EventDetail=(props)=> {

    const [modalShow, setModalShow] = React.useState(false);
    if (!props.user) return <Redirect to="/homepage" />; 
    const event = props.events.find(event=> props.match.params.eventID == event.id)

    return (
       <>
        <div className="container-fluid navbg p-1 mt-3 rounded-pill">
        <h1 className="display-4 text-left mt-2 text-light" style={{marginLeft:100}}>{event?event.title.toUpperCase():null}</h1>
        <p className="lead text-left text-light" style={{marginLeft:100, marginTop:-25}}>Location: {event?event.location:null} | Date: {event?event.date:null} at {event?event.time:null}</p>
        <p className="text-left text-monospace text-light" style={{marginLeft:100, marginTop:-20}}>{event?event.description:null}</p>
        </div>
        <div className="row justify-content-end  mt-4 mb-4 mr-5">
        <button className="btn btn-primary ml-5 mr-5">Upload Photos</button>
            <ButtonToolbar>
        <Button variant="warning" onClick={() => setModalShow(true)}>
            Share Event's Album
        </Button>

        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
        />
        </ButtonToolbar>
        </div>
        </>
    
    );
  }



const mapStateToProps = state => {
  return {
    events: state.eventsRoot.events,
    user: state.authReducer.user
  };
};

export default connect(
  mapStateToProps,
)(EventDetail);