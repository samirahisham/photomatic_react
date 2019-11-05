import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../assets/logo-wbg.png";
import FileBase64 from "react-file-base64";

//Actions
import { signup, resetErrors } from "../redux/actions";

class SignUp extends Component {
  state = {
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    img: null
  };

  componentWillUnmount() {
    if (this.props.errors.length) this.props.resetErrors();
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();

    this.props.signup(this.state, this.props.history);
  };

  render() {
    if (this.props.user) return <Redirect to="/events" />;
    const types = ["image/jpeg", "image/jpg", "image/png"];
    const errors = this.props.errors;
    console.log(this.state);

    return (
      <div className="bg navbg">
        <div className="container-fluid navbg">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <img
                    src={logo}
                    className="img-fluid mb-4"
                    style={{ height: 60 }}
                    alt="logo"
                  />
                  <h5 className="card-title text-center">Sign Up!</h5>
                  <form className="form-signin" onSubmit={this.submitHandler}>
                    <div className="form-label-group">
                      <input
                        type="email"
                        id="inputUser"
                        className="form-control"
                        placeholder="Email"
                        name="username"
                        onChange={this.changeHandler}
                        required
                        autofocus
                      />
                      <label for="inputUser">Email</label>
                    </div>
                    <div className="form-label-group">
                      <input
                        type="text"
                        id="inputFname"
                        className="form-control"
                        placeholder="First Name"
                        name="first_name"
                        onChange={this.changeHandler}
                        required
                        autofocus
                      />
                      <label for="inputFname">First Name</label>
                    </div>
                    <div className="form-label-group">
                      <input
                        type="text"
                        id="inputLname"
                        className="form-control"
                        placeholder="Last Name"
                        name="last_name"
                        onChange={this.changeHandler}
                        required
                        autofocus
                      />
                      <label for="inputLname">Last Name</label>
                    </div>

                    <div className="form-label-group">
                      <input
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        placeholder="Password"
                        name="password"
                        onChange={this.changeHandler}
                        required
                      />
                      <label for="inputPassword">Password</label>
                    </div>
                    <div className="input-group mb-3">
                      {this.state.img ? (
                        <p
                          className="mt-3 ml-2 text-center"
                          style={{ fontSize: 14, color: "#2DADF5" }}
                        >
                          {this.state.img.name} attached as profile image{" "}
                          <button
                            className="ml-2"
                            onClick={() => this.setState({ img: null })}
                            style={{ color: "red", borderRadius: 30 }}
                          >
                            delete?
                          </button>
                        </p>
                      ) : (
                        <div class="uploader row align-items-center ml-1">
                          <label
                            className="btn btn-outline-secondary mt-2"
                            style={{ padding: 10 }}
                          >
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
                            Profile Image
                          </label>
                        </div>
                      )}
                    </div>
                    {!!errors.length && (
                      <div style={{ color: "red" }} className="mt-2">
                        {errors.map((error) => (
                          <p style={{ color: "red", fontSize: 12 }} key={error}>
                            {error}
                          </p>
                        ))}
                      </div>
                    )}

                    <button
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                      type="submit"
                    >
                      Sign Up
                    </button>

                    <Link
                      id="nav-link-auth"
                      to="/login"
                      className="btn btn-small btn-link"
                    >
                      Existing photographer?
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errorReducer.errors,
    user: state.authReducer.user
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signup: (userData, history) => dispatch(signup(userData, history)),
    resetErrors: () => dispatch(resetErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);

// export default SignUp;
