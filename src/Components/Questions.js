import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewPoll: false,
    };
  }
  handleClick = (e) => {
    this.setState((prevState) => ({
      viewPoll: !prevState.viewPoll,
    }));
  };
  render() {
    const { question, unanswered, classCheck } = this.props;
    if (this.state.viewPoll === true) {
      return <Redirect push to={`/questions/${question.id}`} />;
    }
    return (
      <React.Fragment>
        <div class="col-md-9 text-center">
          <h3> Would you rather</h3> <br />{" "}
          <p style={{ textAlign: "center" }}>
            {question.optionOne.text}
            <br />
            or...
          </p>{" "}
          <button
            className={
              unanswered === true
                ? "btn btn-primary btn-block"
                : "btn btn-warning btn-block"
            }
            size="tiny"
            onClick={this.handleClick}
          >
            {unanswered === true ? "Answer Poll" : "Results"}{" "}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Questions;
