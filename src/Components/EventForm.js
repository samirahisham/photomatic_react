
import React, { Component } from "react";
import {Button, Form } from 'react-bootstrap'
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { createEvent } from "../redux/actions"
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import * as legoData from "../assets/json/shutterloading.json";
import * as doneData from "../assets/json/done.json";



const defaultOptions2 = {
  loop: false,
  autoplay: true,
  animationData: doneData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

class EventForm extends Component{


  state = { title:"", location:"", date:"", time:"", done: false};

  handleChange=event=>{
    this.setState({ [event.target.name]: event.target.value });
  }

  onDrop=() =>{
    this.setState({done:true})
    setTimeout(() => this.props.createEvent({title:this.state.title, location:this.state.location, date:this.state.date, time:this.state.time}, this.props.history ),2000 )

    
    }
    
  setUploader=()=>{
      if(!this.state.done){
        return(
          <FadeIn>
          <h1 className="display-3">New Event</h1>

          <Form className="text-left" style={{fontSize:"1.6em"}}>
          <Form.Group>
            <Form.Label>Event Title</Form.Label>
            <Form.Control name="title" onChange={this.handleChange} type="text" placeholder="What do you want to call this event?" />
            <Form.Text className="text-muted">
             Make it simple and clear!
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control name="description" onChange={this.handleChange} type="text" placeholder="Small description" />
          </Form.Group>
        
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control name="location" onChange={this.handleChange} type="text" placeholder="Where did this event happened?" />
          </Form.Group>
          <Form.Group>
          <Form.Label>Date
          </Form.Label>
          <Form.Control format="YYYY-MM-DD" name="date" type="date" onChange={this.handleChange} />
          </Form.Group>
            <Form.Group>
            <Form.Label>Time</Form.Label>
            <Form.Control name="time" type="time" onChange={this.handleChange} />
          </Form.Group>
          
          <Button className="mt-5" variant="primary" size="lg" block onClick={()=>this.onDrop()} type="submit">
            Create
          </Button>
        </Form>
        </FadeIn>
          
        )}else {
          return(
            <FadeIn>
            <div className="justify-content-center">
            <Lottie options={defaultOptions2} height={700} width={700} />
              </div>
              </FadeIn>
          )
      }
    }
    

 
    
  

  render(){
    return (
     
      <div className="container">
        <div className="jumbotron">
      
        {this.setUploader()}
  
        </div>
        </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    createEvent: (event, history)=> dispatch(createEvent(event, history))
  };
};

export default connect(null, mapDispatchToProps)(EventForm);