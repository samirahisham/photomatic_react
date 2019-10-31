
import React, { Component } from "react";
import {Modal, Button, Form} from 'react-bootstrap'
import { connect } from "react-redux";
import FileBase64 from 'react-file-base64';
import { Link, Redirect } from "react-router-dom";
import {createEvent} from "../redux/actions"
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import * as legoData from "../assets/json/shutterloading.json";
import * as doneData from "../assets/json/done.json";
import 'moment/locale/fr.js' // or 'rc-datepicker/node_modules/moment/locale/fr.js' if you don't have it in your node_modules folder
import 'rc-datepicker/lib/style.css';
import { DatePickerInput, DatePicker } from 'rc-datepicker';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};
const defaultOptions2 = {
  loop: false,
  autoplay: true,
  animationData: doneData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

class CreateEvent extends Component{


  state = { title:"", location:"", date:"", time:"", done: undefined };

  handleChange=event=>{
    this.setState({ [event.target.name]: event.target.value });
  }
    
  setUploader=()=>{
      if(!this.state.done && !this.state.loading){
        return(

          <Form>
          <Form.Group>
            <Form.Label>Event Title</Form.Label>
            <Form.Control name="title" onChange={this.handleChange} type="text" placeholder="What do you want to call this event?" />
            <Form.Text className="text-muted">
             Make it simple and clear!
            </Form.Text>
          </Form.Group>
        
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control name="location" onChange={this.handleChange} type="text" placeholder="Where did this event happened?" />
          </Form.Group>
          <DatePickerInput
           onChange={this.handleChange}
           name="date"
           value={this.date}
           className='my-custom-datepicker-component'
           {...this.anyReactInputProps}
             />
            <DatePicker onChange={this.handleChange} name="date" value={this.date} />
            <Form.Group>
            <Form.Label>Time</Form.Label>
            <Form.Control name="time" onChange={this.handleChange} type="time" placeholder="When did this event happen?" />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
          
        )} else if (!!this.state.loading){
          return(
          <FadeIn>
            <div class="d-flex justify-content-center align-items-center">
            <Lottie options={defaultOptions} height={400} width={400} />
              </div>
              </FadeIn>
          )
        } else {
          return(
            <FadeIn>
            <div class="d-flex justify-content-center align-items-center">
            <Lottie options={defaultOptions2} height={400} width={400} />
              </div>
              </FadeIn>
          )
      }
    }
    

  onDrop=() =>{
      this.props.createEvent({ title:this.state.title, location:this.state.location, date:this.state.date, time:this.state.time})
      let seeingTime = 1000
      let timeload = seeingTime+(100*this.state.pictures.length)
      let doneTime=timeload+1000

      setTimeout(() => this.setState({ loading: true }),seeingTime )
      setTimeout(() => this.setState({ done: true, loading: false }),doneTime )
      setTimeout(() => window.location.reload(),doneTime+1000 )
      
      
      }
    
  

  render(){
   
    console.log(this.state.pictures)
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          New Event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
        {this.setUploader()}
      </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>this.onDrop()}></Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    createEvent: event=> dispatch(createEvent(event))
  };
};

export default connect(null, mapDispatchToProps)(CreateEvent);