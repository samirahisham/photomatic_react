import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// Components
import EventCard from "./EventCard";
import Loading from "./Loading";

const EventsList = ({ user, events, loading }) => {
  const [query, setQuery] = useState("");

  if (!user) return <Redirect to="/homepage" />;
  if (user && events.length === 0) return <Redirect to="/new" />;

  if (loading) return <Loading />;

  const eventCards = events
    .filter((event) => event.title.toLowerCase().includes(query.toLowerCase()))
    .map((event) => <EventCard key={event.id} event={event} />);

  return (
    <div className="container-fluid">
      <div className="row">{eventCards}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    events: state.eventsRoot.events,
    user: state.authReducer.user,
    loading: state.eventsRoot.loading
  };
};

export default connect(mapStateToProps)(EventsList);
