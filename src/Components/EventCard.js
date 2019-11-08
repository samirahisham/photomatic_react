import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const EventCard = (props) => {
  const event = props.event;
  let date = moment(event.date_added).fromNow();
  return (
    <Link to={`/events/${event.id}`}>
      <div className="col-lg-4 col-sm-6 mb-4">
        <div className="card h-100">
          <img className="card-img-top" src={event.img} alt={event.img} />
          <div className="card-body">
            <h4 className="card-title">{event.title.toUpperCase()}</h4>
            <p className="card-text">{`${event.location} - ${event.date}`}</p>
            <div className="card-footer text-muted">Added {date}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
