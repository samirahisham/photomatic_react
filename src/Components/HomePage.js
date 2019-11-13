import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import NavBar from "./Navbar";
import background from "../assets/images/backg.png";
import background2 from "../assets/images/backg2.png";

class HomePage extends Component {
  render() {
    if (this.props.user) return <Redirect to="/events" />;

    return (
      <>
        <div className="container-fluid">
          <NavBar />
          <header classNasme="" id="home">
            <div style={{ marginTop: 20 }}>
              <h2 className="">Snap it, Scan it, Loading, Fetch it</h2>
              <p classNasme="tagline">
                Fotomatic uses state-of-the-art facial recognition technology
                that allows you to get your own personal photos.{" "}
              </p>
              <div className="row mt-5">
                <div className="col">
                  <h2 className="">Fotomatic Website</h2>
                  <p classNasme="tagline">
                    A website that is tailored to allow photographers to
                    distribute their photographs.{" "}
                  </p>
                <img className="img-fluid" src={background2} alt={"background2"} />
                </div>
                <div className="col">
                  <h2 className="">Fotomatic App</h2>
                  <p classNasme="tagline">
                    A client-facing mobile application that allows users to scan
                    their faces and to get the photos they are featured in,
                    using custom facial recognition technology. It will be
                    compatible with IOS and Android smartphones.
                  </p>
                <img className="img-fluid" src={background} alt={"background"} />
                </div>
              </div>
            </div>
          </header>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user
  };
};

export default connect(mapStateToProps)(HomePage);
