import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import "./assets/css/style.css";

// Scripts
import main from "./assets/js/main";

//Components
import HomePage from "./Components/HomePage";
import LoginForm from "./Components/LoginForm";
import SignUpForm from "./Components/SignUpForm";
import EventsList from "./Components/EventsList";
import SideBar from "./Components/SideBar";
import EventDetail from "./Components/EventDetail";
import EventForm from "./Components/EventForm";
import logo from "./assets/logo.png";

import NewUserPage from "./Components/NewUserPage";

class App extends Component {
  componentDidMount() {
    main();
  }

  componentDidUpdate() {
    main();
  }

  render() {
    return (
      <div className="App d-flex" id="wrapper">
        {this.props.user && <SideBar />}
        <div id="page-content-wrapper">
          {this.props.user && (
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom navbg">
              <button className="btn btn-outline-light" id="menu-toggle">
                Menu
              </button>
              <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                  <img
                    src={logo}
                    className="img-fluid mt-3 mb-3"
                    style={{ height: 40 }}
                    alt="logo"
                  />
                </li>
              </ul>
            </nav>
          )}
          <div className="container-fluid">
            <Switch>
              {/* All these components need to internally check for the user */}
              <Redirect exact from="/" to="/events" />
              <Route path="/events/:eventID" component={EventDetail} />
              <Route path="/events" component={EventsList} />
              <Route path="/create" component={EventForm} />
              <Route path="/new" component={NewUserPage} />
              <Route path="/homepage" component={HomePage} />
              <Route path="/login" component={LoginForm} />
              <Route path="/signup" component={SignUpForm} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user
  };
};

export default connect(mapStateToProps)(App);
