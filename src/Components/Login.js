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
    console.log(e.target.value);
    this.setState({
      userId: e.target.value,
    });
  };
  handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    this.props.setUserAuth(this.state.userId);
  };
  render() {
    const { users } = this.props;
    const { userId } = this.state;
    return (
      <div>
        <div class="wrapper fadeInDown">
          <div id="formContent">
            <div class="fadeIn first">
              <h6>Welcome to</h6>
              <h4>Would You Rather</h4>
            </div>

            <form onSubmit={this.handleSubmit}>
              <select
                onChange={this.dropChange}
                value={userId}
                class="form-control"
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
                class="fadeIn fourth"
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
