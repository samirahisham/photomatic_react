import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { createEvent } from "../redux/actions";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import "react-day-picker/lib/style.css";
import * as doneData from "../assets/json/done.json";
import FileBase64 from "react-file-base64";

const defaultOptions2 = {
  loop: false,
  autoplay: true,
  animationData: doneData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

class EventForm extends Component {
  state = {
    title: null,
    location: null,
    date: null,
    time: null,
    done: false,
    img: null,
    imgerror: "none",
    validated: [],
    number_of_attendees: 0
  };

  setValidated = (boolean) => {
    this.setState({ validated: boolean });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    if (!this.state.img) {
      this.setState({ imgerror: "" });
    } else {
      this.setState({ done: true });
      this.setState({ imgerror: "none" });
      setTimeout(
        () =>
          this.props.createEvent(
            {
              title: this.state.title,
              location: this.state.location,
              date: this.state.date,
              time: this.state.time,
              img: this.state.img.base64,
              number_of_attendees: this.state.number_of_attendees
            },
            this.props.history
          ),
        1000
      );
    }
  };

  setUploader = () => {
    const types = ["image/jpeg", "image/jpg", "image/png"];

    if (!this.state.done) {
      return (
        <FadeIn>
          <h3 className="display-5">New Event</h3>

          <Form className="text-left" style={{ fontSize: ".9em" }}>
            <Form.Group>
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                required
                name="title"
                onChange={this.handleChange}
                type="text"
                placeholder="What do you want to call this event?"
              />
              <Form.Text className="text-muted">
                Make it simple and clear!
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Album Cover</Form.Label>
              <div className="input-group mb-3">
                {this.state.img ? (
                  <p
                    className="mt-3 ml-2 text-center"
                    style={{ fontSize: 14, color: "#2DADF5" }}
                  >
                    {this.state.img.name} attached as cover image{" "}
                    <button
                      className="ml-2"
                      onClick={() => this.setState({ img: null })}
                      style={{ color: "red", borderRadius: 30 }}
                    >
                      delete?
                    </button>
                  </p>
                ) : (
                  <div className="uploader row align-items-center ml-1">
                    <label
                      className="btn btn-secondary mt-2"
                      style={{ padding: 10 }}
                    >
                      <FileBase64
                        required
                        multiple={false}
                        onDone={(pic) => {
                          if (types.includes(pic.type)) {
                            this.setState({
                              img: pic
                            });
                          } else {
                            alert(`${pic.name} is an invaild type file`);
                          }
                        }}
                      />
                      Upload
                    </label>
                  </div>
                )}
              </div>
              <Form.Text
                className="text-danger"
                style={{ display: this.state.imgerror, fontSize: 15 }}
              >
                Please upload an album cover!
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Number of Attendees</Form.Label>
              <Form.Control
                required
                min="0"
                name="number_of_attendees"
                onChange={this.handleChange}
                type="number"
                placeholder="How many people attended this event?"
              />
              <Form.Text className="text-muted">Just an estimation!</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                onChange={this.handleChange}
                as="textarea"
                rows="3"
                placeholder="Small description"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                required
                name="location"
                onChange={this.handleChange}
                type="text"
                placeholder="Where did this event happened?"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                required
                format="YYYY-MM-DD"
                name="date"
                type="date"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Time</Form.Label>
              <Form.Control
                required
                name="time"
                type="time"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
              />
            </Form.Group>
          </Form>
          <button
            className="mt-5 btn btn-primary btn-block"
            onClick={() => this.handleSubmit()}
          >
            Create
          </button>
        </FadeIn>
      );
    } else {
      return (
        <FadeIn>
          <div className="justify-content-center">
            <Lottie options={defaultOptions2} height={700} width={700} />
          </div>
        </FadeIn>
      );
    }
  };

  render() {
    if (!this.props.user) return <Redirect to="/homepage" />;

    return (
      <div className="container">
        <div className="jumbotron">{this.setUploader()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createEvent: (event, history) => dispatch(createEvent(event, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventForm);
