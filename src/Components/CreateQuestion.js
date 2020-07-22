import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createQuestionhandler } from "../Redux/Actions/questions";

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
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { auth, createQuestionhandler } = this.props;
    const { option1, option2 } = this.state;

    new Promise((res, rej) => {
      this.setState({ isLoading: true });
      createQuestionhandler(option1, option2, auth);
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
    const disabled = this.state.option1 === "" || this.state.option2 === "";

    if (this.state.validSubmit === true) {
      return <Redirect to="/" />;
    }
    return (
      <div className="row pb-2 justify-content-center">
        <div className="col-md-7">
          <div className="card shadow p-3 mb-5 bg-white rounded">
            <div className="card-header">Create New Poll</div>
            <div className="card-body text-center">
              {this.state.isLoading && (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
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
                <div className="text-right">
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

export default connect(mapStateToProps, { createQuestionhandler })(
  CreateQuestion
);
