import React, { Component } from "react";
import { setUserAuth } from "../Redux/Actions/auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onLogout = (e) => {
    e.preventDefault();
    this.props.setUserAuth(null);
  };
  render() {
    const { auth, users } = this.props;
    console.log(users, "users");
    console.log(auth, "auth");
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          Would You Rather
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <Link to="/">
              <li class="nav-item active">
                Home <span class="sr-only">(current)</span>
              </li>
            </Link>
            <li class="nav-item">
              <a class="nav-link" href="#">
                New Pole
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                LeaderBoard
              </a>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto nav-flex-icons">
            <li class="nav-item avatar mr-5">
              <a class="nav-link p-0" href="#">
                <img
                  src={users[auth].avatarURL}
                  class="rounded-circle z-depth-0"
                  alt="avatar image"
                  height="35"
                />
                <span>{users[auth].name}</span>
              </a>
            </li>
            <li>
              <button className="btn btn-primary" onClick={this.onLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ users, auth }) {
  return {
    users,
    auth,
  };
}

export default connect(mapStateToProps, { setUserAuth })(NavBar);
