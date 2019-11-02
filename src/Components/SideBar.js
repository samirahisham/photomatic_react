import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {logout} from "../redux/actions"
import CreateEvent from "./EventForm"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFolderPlus,
    faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";


class SideBar extends React.Component {
    state = { collapsed: false, CreateShow:false };

    

    logouut = () => {
      this.props.logout()
      
    }

    setCreateShow = (boolean) =>{
      if (boolean===true){
        this.setState({CreateShow:true})
      }else {
        this.setState({CreateShow:false})
      }
  
    }

    render(){
        console.log(this.props.user)
    return(
    <div className="bg-light border-right toggle" id="sidebar-wrapper">
      <div className="sidebar-heading">Hey User! </div>
      <div className="list-group list-group-flush">
      <img src="http://svgur.com/i/65U.svg" alt="profile_img" style={{height:150, marginBottom: 25}}></img>
      <Link to="/create">
        <div className="list-group-item list-group-item-action bg-primary text-light"><span className="mr-2"><FontAwesomeIcon
                icon={faFolderPlus}
              /></span>Create Event Album</div>
              </Link>
        <Link to="/events" className="list-group-item list-group-item-action bg-light">My Albums</Link>
        <Link to="/" className="list-group-item list-group-item-action bg-light">Profile</Link>
        <button onClick={()=>this.logouut()} className="list-group-item list-group-item-action bg-light" style={{marginTop:300}}><span className="mr-2"><FontAwesomeIcon
                icon={faSignOutAlt}
              /></span>Logout</button>
      </div>
    </div>
  )}}

  const mapStateToProps = state => {
    return {
      user: state.authReducer.user
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      logout: () => dispatch(logout())
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SideBar);
  