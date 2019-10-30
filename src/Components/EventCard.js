import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";


 const ProductCard = (props) => {
     const event = props.event
    let date = moment(event.date_added).fromNow();
    return (
      <div id="card-items" className="card">
        <div className="card-body">
          <Link id="card-name" to={`/events/${event.id}`}>
            <h5 className="card-title">
              <span>{event.title}</span>
            </h5>
          </Link>
          <p className="card-text" style={{ marginBottom: 0 }}>
            {`${event.location} - ${event.date}`}
          </p>
          <small className="card-text">
            <strong>Added {date}</strong>
          </small>
        </div>
      </div>
    );
  }
 



export default ProductCard;