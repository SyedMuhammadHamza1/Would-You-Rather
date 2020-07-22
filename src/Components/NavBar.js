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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <h5 className="text-primary">Would You Rather</h5>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <Link to="/">
              <li className="nav-item active">
                <label className="nav-link">Home</label>
              </li>
            </Link>
            <Link to="/add">
              <li className="nav-item">
                <label className="nav-link">New Pole</label>
              </li>
            </Link>
            <Link to="/leaderboard">
              <li className="nav-item">
                <label className="nav-link">LeaderBoard</label>
              </li>
            </Link>
          </ul>
          <ul className="navbar-nav ml-auto nav-flex-icons">
            <li className="nav-item avatar mr-5">
              <img
                src={users[auth].avatarURL}
                className="rounded-circle z-depth-0"
                alt="avatar image"
                height="35"
              />
              <span className="ml-2">{users[auth].name}</span>
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
