import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

// Scripts
import main from "../assets/js/main";

// Components
import EventCard from "./EventCard";


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
    
    const eventCards = this.props.events.map(event => (
      <EventCard key={event.id} event={event} />
    ));


    return (
       
        <div className="row" id="card-row">
          {eventCards}
        </div>
    
    );
  }
}



const mapStateToProps = state => {
  return {
    events: state.eventsRoot.events,
    user: state.authReducer.user
  };
};

export default connect(
  mapStateToProps,
)(EventsList);