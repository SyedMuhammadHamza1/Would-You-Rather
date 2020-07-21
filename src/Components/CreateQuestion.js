import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleSaveQuestion } from "../Redux/Actions/questions";

export class CreateQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validSubmit: false,
      isLoading: false,
      option1: "",
      option2: "",
    };
  }
  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    debugger;
    const { auth, handleSaveQuestion } = this.props;
    const { option1, option2 } = this.state;

    new Promise((res, rej) => {
      this.setState({ isLoading: true });
      handleSaveQuestion(option1, option2, auth);
      setTimeout(() => res("success"), 1000);
    }).then(() => {
      this.setState({
        option1: "",
        option2: "",
      });
      this.setState({ validSubmit: true });
    });
  };
  render() {
    console.log("Auth Props", this.props.auth);
    console.log("All Props", this.props);
    const disabled = this.state.option1 === "" || this.state.option2 === "";

    if (this.state.validSubmit === true) {
      return <Redirect to="/" />;
    }
    return (
      <div class="row pb-2 justify-content-center">
        <div class="col-md-7">
          <div class="card shadow p-3 mb-5 bg-white rounded">
            <div class="card-header">Create New Poll</div>
            <div class="card-body text-center">
              {this.state.isLoading && (
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              )}
              <p>
                <strong>Would you rather..</strong>
              </p>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  id="option1"
                  placeholder="Enter Option One"
                  value={this.state.option1}
                  onChange={this.handleChange}
                  required
                />
                <br />
                <div className="text-center">Or</div>
                <br />
                <input
                  type="text"
                  id="option2"
                  placeholder="Enter Option Two"
                  value={this.state.option2}
                  onChange={this.handleChange}
                  required
                />
                <br />
                <div class="text-right">
                  <button
                    disabled={disabled}
                    className="btn btn-primary"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(mapStateToProps, { handleSaveQuestion })(CreateQuestion);
