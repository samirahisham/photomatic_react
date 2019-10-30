import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import NavBar from './Navbar'
import phone from '../assets/images/iphonex.png'

class HomePage extends Component {
  

 
  render() {
    if (this.props.user) return <Redirect to="/events" />;
   
    return (
            <div className="container-fluid">
                <NavBar/>
                <header classNasme="" id="home">
            <div style={{marginTop:100}}>
            <h2 className="display-4">Optimize Your Photoshoots</h2>
            <p classNasme="tagline">The amazing solution for photographers after shooting photos in a event. Just upload your event's photos and let the attendees find their images via our Face Recognition App. </p>
            </div>
            <div classNasme="img-holder mt-3"><img src={phone} alt="phone" classNasme="img-fluid"/></div>
            </header>
                </div>

   
  

    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  };
};


export default connect(
  mapStateToProps,
)(HomePage);


