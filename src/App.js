import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import './App.css';

//Components
import HomePage from "./Components/HomePage"
import LoginForm from "./Components/LoginForm"
import SignUpForm from "./Components/SignUpForm"
import EventDetail from "./Components/EventDetail"
import EventsList from "./Components/EventsList"
import EventForm from "./Components/EventForm"
import ShareForm from "./Components/ShareForm"
import SideBar from "./Components/SideBar"

function App() {
  return (
    <div className="App">
      <Switch>
        <Redirect exact from="/" to="/homepage" />
        <Route path="/homepage" component={HomePage} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/events/:eventID" component={EventDetail} />
        <Route path="/events/:eventID/share" component={ShareForm} />
        <Route path="/events/" component={EventsList} />
        <Route path="/events/create" component={EventForm} />
        </Switch>
        {this.props.user? <SideBar/> : <></>}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  };
};


export default connect(
  mapStateToProps,
)(App);
