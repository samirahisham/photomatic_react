import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions";
import FileBase64 from "react-file-base64";
import editprofile from "../assets/images/editprofile.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

class SideBar extends Component {
  state = { collapsed: false, CreateShow: false, hide: 0, profile: null };

  setCreateShow = (boolean) => {
    if (boolean === true) {
      this.setState({ CreateShow: true });
    } else {
      this.setState({ CreateShow: false });
    }
  };

  mouseOut() {
    this.setState({ hide: 0 });
  }

  mouseOver() {
    this.setState({ hide: 1 });
  }

  render() {
    const types = ["image/jpeg", "image/jpg", "image/png"];

    return (
      <div className="bg-light border-right toggle" id="sidebar-wrapper">
        <div className="sidebar-heading mb-2">
          Hey {this.props.profile ? this.props.profile.user.first_name : null}
        </div>
        <div className="list-group list-group-flush">
          <div
            className="card text-white"
            onMouseOut={() => this.mouseOut()}
            onMouseOver={() => this.mouseOver()}
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            {this.props.profile ? (
              <img
                src={this.props.profile.image}
                style={{
                  height: 100,
                  marginBottom: 25,
                  width: 100,
                  marginLeft: 70,
                  borderRadius: 50
                }}
                class="card-img "
                alt="profile_img"
              />
            ) : (
              <img
                src={`http://svgur.com/i/65U.svg`}
                style={{ height: 100, marginBottom: 25, width: "auto" }}
                class="card-img"
                alt="profile_img"
              />
            )}
            <div className="card-img-overlay" style={{ marginTop: 35 }}>
              <label className="mt-2 text-light btn text-center pointer">
                <FileBase64
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
                <img
                  src={editprofile}
                  className="card-img"
                  style={{ width: 92, opacity: this.state.hide }}
                  alt="profile_img"
                />
              </label>
            </div>
          </div>

          <Link to="/create">
            <div className="list-group-item list-group-item-action bg-primary text-light">
              <span className="mr-2">
                <FontAwesomeIcon icon={faFolderPlus} />
              </span>
              Create Event Album
            </div>
          </Link>
          <Link
            to="/events"
            className="list-group-item list-group-item-action bg-light"
          >
            My Albums
          </Link>
          <Link
            to="/"
            className="list-group-item list-group-item-action bg-light"
          >
            Profile
          </Link>
          <button
            onClick={() => this.props.logout()}
            className="list-group-item list-group-item-action bg-light"
            style={{ marginTop: 300 }}
          >
            <span className="mr-2">
              <FontAwesomeIcon icon={faSignOutAlt} />
            </span>
            Logout
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    profile: state.authReducer.profile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
