import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import logo from "../assets/logo.png";

const NavBar = () => {
  return (
    <div className="nav-menu fixed-top navbg">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <nav className="navbar navbar-dark navbar-expand-lg">
              <Link className="navbar-brand" to="/login">
                <img
                  src={logo}
                  className="img-fluid"
                  style={{ height: 40 }}
                  alt="logo"
                />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbar"
                aria-controls="navbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                {" "}
                <span className="navbar-toggler-icon"></span>{" "}
              </button>
              <div className="collapse navbar-collapse" id="navbar">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    {" "}
                    <Link to="/signup" className="nav-link active">
                      SIGN UP<span className="sr-only">(current)</span>
                    </Link>{" "}
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link to="/login" className="nav-link">
                      SIGN IN
                    </Link>{" "}
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link to="/about" className="nav-link">
                      ABOUT US
                    </Link>{" "}
                  </li>
                  <li className="nav-item">
                    <a
                      href="#"
                      className="btn btn-outline-light my-3 my-sm-0 ml-lg-3"
                    >
                      Attendee? Download the app
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
