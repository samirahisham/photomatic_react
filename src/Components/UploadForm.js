
import React, { Component } from "react";
import {Modal, Button} from 'react-bootstrap'
import { connect } from "react-redux";
import FileBase64 from 'react-file-base64';
import { Link, Redirect } from "react-router-dom";
import {uploadPics} from "../redux/actions/"
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import * as legoData from "../assets/json/shutterloading.json";
import * as doneData from "../assets/json/done.json";

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

class UploadForm extends Component{

  state = { pictures: [],eventID: this.props.eventID, done: undefined, rejections:[] };
  
  getAlert=()=>{
    if(!!this.state.rejections.length){
      return(
        <div className="alert alert-danger" role="alert">
    Uploaded images was rejected because of {this.state.rejections.join(", ")}
    </div>
      )
    }
  }


  setUploader=()=>{
      if(!this.state.done && !this.state.loading){
        return(

            <div class="d-flex justify-content-center align-items-center" style={{height:400, width:400, marginLeft:250}}>
            
            <FileBase64
              multiple={ true }
              onDone={(pic)=>this.onDrop(pic)}/>
              </div>
          
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
     rejections = []

  onDrop=(pictures) =>{
    const types = ['image/jpeg', 'image/jpg', 'image/png']
   
    pictures.forEach(picture=> {
        if (types.includes(picture.type)){
          this.setState({
            pictures: this.state.pictures.concat(picture)
        })
        } 
        
        else{
          let rejections = this.state.rejections
          rejections.push(picture.name)
        this.setState(rejections)

        }
          
        })
    if (this.state.pictures.length === pictures.length){
      
      this.props.uploadPics({pictures:this.state.pictures, eventID:this.state.eventID})
      let seeingTime = 1000
      let timeload = seeingTime+(100*this.state.pictures.length)
      let doneTime=timeload+1000
  
      setTimeout(() => this.setState({ loading: true }),seeingTime )
      setTimeout(() => this.setState({ done: true, loading: false }),doneTime )
      // setTimeout(() => window.location.reload(),doneTime+1000 )
    }
    // setTimeout(() => window.location.reload(),5000 )
    
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
          Upload Pictures
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Please Upload your pictures here </p>
       {this.getAlert()}
        <br></br>
        <div>
        {this.setUploader()}
      </div>
        </Modal.Body>
        
      </Modal>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    uploadPics: pictures=> dispatch(uploadPics(pictures))
  };
};

export default connect(null, mapDispatchToProps)(UploadForm);