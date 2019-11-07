import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const EventCard = (props) => {
  const event = props.event;
  let date = moment(event.date_added).fromNow();
  return (
    <Link id="card-name" to={`/events/${event.id}`}>
      <div className="card text-center ml-3 mt-3 mb-3 mr-3">
        <div className="card-header">{`${event.location} - ${event.date}`}</div>
        <div className="card-body">
          <h5 className="card-title">{event.title.toUpperCase()}</h5>
        </div>
        <div className="card-footer text-muted">Added {date}</div>
      </div>
    </Link>
  );
};

export default EventCard;
