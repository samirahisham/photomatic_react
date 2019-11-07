import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// Components
import EventCard from "./EventCard";
import Loading from "./Loading";

class EventsList extends Component {
  //   state = {
  //     query: "",
  //   };

  //   setQeury = query => this.setState({ query });

  //   filterEvents = () => {
  //     const query = this.state.query.toLowerCase();
  //     return this.props.events.filter(event => {
  //       return (
  //         event.title.toLowerCase().includes(query)
  //       );
  //     });
  //   };

  render() {
    if (!this.props.user) return <Redirect to="/homepage" />;
    if (this.props.user && this.props.events.length === 0)
      return <Redirect to="/new" />;

    const eventCards = this.props.events.map((event) => (
      <EventCard key={event.id} event={event} />
    ));

    if (this.props.loading) {
      return <Loading />;
    }

    return (
      <div className="container-fluid">
        <div className="row" id="card-row">
          {eventCards}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.eventsRoot.events,
    user: state.authReducer.user,
    loading: state.eventsRoot.loading
  };
};

export default connect(mapStateToProps)(EventsList);
