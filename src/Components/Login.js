import React, { Component } from "react";
import "./Login.css";
import { connect } from "react-redux";
import { setUserAuth } from "../Redux/Actions/auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
    };
  }
  dropChange = (e) => {
    this.setState({
      userId: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.setUserAuth(this.state.userId);
  };
  render() {
    const { users } = this.props;
    const { userId } = this.state;
    return (
      <div>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div className="fadeIn first">
              <h6>Welcome to</h6>
              <h4>Would You Rather</h4>
            </div>

            <form onSubmit={this.handleSubmit}>
              <select
                onChange={this.dropChange}
                value={userId}
                className="form-control"
                name="cars"
                id="cars"
              >
                <option value="">Select User</option>

                {users.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>

              <input
                type="submit"
                className="fadeIn fourth"
                disabled={userId === "" ? true : false}
                value="Log In"
              />
            </form>

            <div id="formFooter">
              <h6>Please Select User From Above</h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.values(users),
  };
}
export default connect(mapStateToProps, { setUserAuth })(Login);
