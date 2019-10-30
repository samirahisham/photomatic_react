import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../assets/logo-wbg.png"


//Actions
import { signup, resetErrors } from "../redux/actions";

class SignUp extends Component {
  state = {
    username: "",
    first_name:"",
    last_name:"",
    password: "",
  };

  componentWillUnmount() {
    if (this.props.errors.length) this.props.resetErrors();
  }

  changeHandler = e => {
    if (e.target.name !== "img")
      {this.setState({ [e.target.name]: e.target.value })}
    else {
      let formData = new FormData()
      this.setState({ img: formData.append(e.target.value) })
    }

  };

  submitHandler = e => {
    e.preventDefault();

    this.props.signup(this.state, this.props.history);
  };

  render() {
    // if (this.props.user) return <Redirect to="/events" />;

    const errors = this.props.errors;
    console.log(errors)


    return (
            <div className="bg navbg">
                <div className="container-fluid navbg">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                <img src={logo} className="img-fluid mb-4" style={{height:90}}alt="logo"/>
                                    <h5 className="card-title text-center">Sign Up!</h5>
                                    <form className="form-signin" onSubmit={this.submitHandler}>
                                        <div className="form-label-group">
                                            <input type="email" id="inputUser" className="form-control" placeholder="Email" name="username" onChange={this.changeHandler} required autofocus />
                                            <label for="inputUser">Email</label>
                                        </div>
                                        <div className="form-label-group">
                                            <input type="text" id="inputFname" className="form-control" placeholder="First Name" name="first_name" onChange={this.changeHandler} required autofocus />
                                            <label for="inputFname">First Name</label>
                                        </div>
                                        <div className="form-label-group">
                                            <input type="text" id="inputLname" className="form-control" placeholder="Last Name" name="last_name" onChange={this.changeHandler} required autofocus />
                                            <label for="inputLname">Last Name</label>
                                        </div>

                                        <div className="form-label-group">
                                            <input type="password" id="inputPassword" className="form-control" placeholder="Password" placeholder="Password" name="password" onChange={this.changeHandler} required />
                                            <label for="inputPassword">Password</label>
                                            {!!errors.length && (
                                            <div className="text-danger mt-2">
                                                {errors.map(error => (
                                                <p key={error}>{error}</p>
                                                ))}
                                            </div>
                                            )}
                                        </div>
                                        <div className="input-group mb-3">
                                        <div className="custom-file">
                                          <input name ="img" type="file" className="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04"/>
                                          <label className="custom-file-label " style={{width:375, borderBottomLeftRadius:50, borderTopLeftRadius:50}} for="inputGroupFile04">Profile Image</label>
                                        </div>
                                      
                                      </div>
                        
                                       
                                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign Up</button>
                                   
                                       
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

const mapStateToProps = state => {
  return {
    errors: state.errorReducer.errors,
    user: state.authReducer.user
  };
};
const mapDispatchToProps = dispatch => {
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