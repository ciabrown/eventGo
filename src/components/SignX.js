import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, registerUser } from '../actions/auth';
import { withRouter } from 'react-router-dom';

class SignX extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // DONE: if  the user is authenticated,
    // change the location to /feed
    // via this.props.history.push
    if (this.props.isAuthenticated) {
      this.props.history.push('/feed');
    }

  }

  componentDidUpdate() {
    // DONE: do the same thing as in component did mount
    if (this.props.isAuthenticated) {
      this.props.history.push('/feed');
    }
  }

  signin(e) {
    e.preventDefault();
    let { dispatch } = this.props;
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    dispatch(loginUser({
      username,
      password,
    }));
  }

  signup(e) {
    e.preventDefault();
    let { dispatch } = this.props;
    let username = this.refs.rusername.value;
    let password = this.refs.rpassword.value;
    let name = this.refs.name.value;
    let email = this.refs.email.value;
    dispatch(registerUser({
      username,
      password,
      email,
      name,
    }));
  }

  render() {
    let { isAuthenticated, isFetching, messages } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={this.signin.bind(this)}>
              <div className="form-group">
                <label>
                  Username:
                </label>
                <input
                  className="form-control"
                  type="text"
                  ref="username"
                />
              </div>
              <div className="form-group">
                <label>
                  Password:
                </label>
                <input
                  className="form-control"
                  type="password"
                  ref="password"
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Sign In"
                />
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <form onSubmit={this.signup.bind(this)}>
              <div className="form-group">
                <label>
                  Username:
                </label>
                <input
                  className="form-control"
                  type="text"
                  ref="rusername"
                />
              </div>
              <div className="form-group">
                <label>
                  Password:
                </label>
                <input
                  className="form-control"
                  type="password"
                  ref="rpassword"
                />
              </div>
              <div className="form-group">
                <label>
                  Name:
                </label>
                <input
                  className="form-control"
                  type="text"
                  ref="name"
                />
              </div>
              <div className="form-group">
                <label>
                  Email:
                </label>
                <input
                  className="form-control"
                  type="text"
                  ref="email"
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Sign Up"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // DONE: set it up so that statue.authReducer is mapped  to the props
  return state.authReducer;
}

export default withRouter(connect(mapStateToProps)(SignX));
