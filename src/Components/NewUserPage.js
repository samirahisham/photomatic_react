import React, { Component } from "react";
import FadeIn from "react-fade-in/lib/FadeIn";
import { connect } from "react-redux";

import { Link, Redirect } from "react-router-dom";

class NewUserPage extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      if (this.props.user === null) {
        this.props.history.replace("/homepage");
      }
    }
  }
  render() {
    if (!this.props.user) {
      return <Redirect to="/homepage" />;
    }
    if (this.props.user && this.props.events.length > 0) {
      return <Redirect to="/events" />;
    }

    return (
      <Link to="/create">
        <FadeIn>
          <button
            style={{ marginTop: "20%", marginLeft: "40%" }}
            className="btn btn-outline-primary btn-lg d-flex justify-content-center align-items-center"
          >
            Create Your First Album Now
          </button>
        </FadeIn>
      </Link>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    events: state.eventsRoot.events
  };
};

export default connect(mapStateToProps)(NewUserPage);
