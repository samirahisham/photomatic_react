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
// import ShareForm from "./Components/ShareForm"
import logo from "./assets/logo.png";

import NewUserPage from "./Components/NewUserPage";

class App extends Component {
  componentDidMount() {
    main();
  }

  isUser = () => {
    if (this.props.user) {
      return (
        <div className="App d-flex" id="wrapper">
          <SideBar />
          <div id="page-content-wrapper">
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
            <div class="container-fluid">
              <Switch>
                <Redirect exact from="/" to="/events" />
                <Route path="/events/:eventID" component={EventDetail} />
                <Route path="/events" component={EventsList} />

                <Route path="/homepage" component={HomePage} />
                <Route path="/login" component={LoginForm} />
                <Route path="/signup" component={SignUpForm} />
                <Route path="/create" component={EventForm} />
                <Route path="/new" component={NewUserPage} />
              </Switch>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App d-flex" id="wrapper">
          <div id="page-content-wrapper">
            <div class="container-fluid">
              <Switch>
                <Redirect exact from="/" to="/events" />
                <Route path="/new" component={NewUserPage} />
                <Route path="/homepage" component={HomePage} />
                <Route path="/login" component={LoginForm} />
                <Route path="/signup" component={SignUpForm} />
                {/* <Route path="/events/:eventID" component={EventDetail} /> */}
                {/* <Route path="/events/:eventID/share" component={ShareForm} /> */}
                <Route path="/events/" component={EventsList} />
                {/* <Route path="/events/create" component={EventForm} /> */}
              </Switch>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    return this.isUser();
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user
  };
};

export default connect(mapStateToProps)(App);
