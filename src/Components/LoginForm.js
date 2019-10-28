import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

//Actions
import { login, resetErrors } from "../redux/actions";

class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };

  componentWillUnmount() {
    if (this.props.errors.length) this.props.resetErrors();
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();

    this.props.login(this.state, this.props.history);
  };

  render() {
    if (this.props.user) return <Redirect to="/events" />;

    const errors = this.props.errors;


    return (
            <div className="bg">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <h5 className="card-title text-center">Sign In</h5>
                                    <form className="form-signin" onSubmit={this.submitHandler}>
                                        <div className="form-label-group">
                                            <input type="text" id="inputUser" className="form-control" placeholder="Username" name="username" onChange={this.changeHandler} required autofocus />
                                            <label for="inputUser">Username</label>
                                        </div>

                                        <div className="form-label-group">
                                            <input type="password" id="inputPassword" className="form-control" placeholder="Password" placeholder="Password" name="password" onChange={this.changeHandler} required />
                                            <label for="inputPassword">Password</label>
                                            {!!errors.length && (
                                            <div className="alert alert-danger" role="alert">
                                                {errors.map(error => (
                                                <p key={error}>{console.log(error)}</p>
                                                ))}
                                            </div>
                                            )}
                                        </div>
                                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                                        <hr className="my-4">
                                        <div className="card-footer">
                                        <Link
                                            id="nav-link-auth"
                                            to="/signup"
                                            className="btn btn-small btn-link"
                                        >
                                            new photographer?
                                        </Link>
                                        </div>
                                        </hr>
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
    login: (userData, history) => dispatch(login(userData, history)),
    resetErrors: () => dispatch(resetErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);


