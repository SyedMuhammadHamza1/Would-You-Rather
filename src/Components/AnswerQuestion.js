import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { answerQuestionHandle } from "../Redux/Actions/users";

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
      const { auth, question, answerQuestionHandle } = this.props;
      answerQuestionHandle(auth, question.id, this.state.value);
    }
  };

  render() {
    const { question } = this.props;
    const disabled = this.state.value === "" ? true : false;

    return (
      <Fragment>
        <div className="col-md-9">
          <h3 className="text-center"> Would you rather</h3> <br />
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
            <button className="btn btn-primary btn-block" disabled={disabled}>
              Submit
            </button>
          </form>
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

export default connect(mapStateToProps, { answerQuestionHandle })(
  AnswerQuestion
);
