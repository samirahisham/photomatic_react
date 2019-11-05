import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { createEvent } from "../redux/actions";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import * as legoData from "../assets/json/shutterloading.json";
import * as doneData from "../assets/json/done.json";
import * as eventImg from "../assets/images/event_imgs";

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
    validated: [],
    number_of_attendees: 0
  };
  setValidated = (boolean) => {
    this.setState({ validated: boolean });
  };
  handleChange = (event) => {
    if (event.target.name === "img") {
      this.setState({ img: event.target.value });
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    if (this.state.validated.length === 0) {
      this.setState({ done: true });
      setTimeout(
        () =>
          this.props.createEvent(
            {
              title: this.state.title,
              location: this.state.location,
              date: this.state.date,
              time: this.state.time,
              img: this.state.img,
              number_of_attendees: this.state.number_of_attendees
            },
            this.props.history
          ),
        2000
      );
    }
  };

  setUploader = () => {
    if (!this.state.done) {
      return (
        <FadeIn>
          <h3 className="display-5">New Event</h3>

          <Form
            className="text-left"
            onSubmit={this.handleSubmit}
            style={{ fontSize: ".9em" }}
          >
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
              <div class="input-group mb-3">
                <div class="custom-file">
                  <input
                    type="file"
                    required
                    name="img"
                    onChange={this.handleChange}
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                  />
                  <label class="custom-file-label" for="inputGroupFile01">
                    Choose Images
                  </label>
                </div>
              </div>
              <Form.Text className="text-muted">
                Make your album look pretty
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

            <Button
              className="mt-5"
              variant="primary"
              size="lg"
              block
              type="submit"
            >
              Create
            </Button>
          </Form>
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
    return (
      <div className="container">
        <div className="jumbotron">{this.setUploader()}</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createEvent: (event, history) => dispatch(createEvent(event, history))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EventForm);
