import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from "../Redux/Actions/users";

export class AnswerQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }
  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.value !== "") {
      const { auth, question, handleSaveQuestionAnswer } = this.props;
      handleSaveQuestionAnswer(auth, question.id, this.state.value);
    }
  };

  render() {
    console.log("All Props", this.props);
    const { question } = this.props;
    const disabled = this.state.value === "" ? true : false;

    return (
      <Fragment>
        <div class="card-body text-center">
          <h3> Would you rather</h3> <br />
        </div>
        <div class="row justify-content-center">
          <div class="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <input
                type="radio"
                name="radioGroup"
                value="optionOne"
                checked={this.state.value === "optionOne"}
                onChange={this.handleChange}
              />
              <label>{question.optionOne.text}</label>
              <br />
              <input
                type="radio"
                name="radioGroup"
                value="optionTwo"
                checked={this.state.value === "optionTwo"}
                onChange={this.handleChange}
              />
              <label>{question.optionTwo.text}</label> <br />
              <button className="btn btn-primary" disabled={disabled}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(mapStateToProps, { handleSaveQuestionAnswer })(
  AnswerQuestion
);