import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const YourVoteLabel = () => (
  <div className="text-right">
    <label className="font-weight-bold text-success">Your Vote</label>
  </div>
);

export class QuestionResult extends Component {
  handleClick = () => {
    this.props.history.push("/");
  };

  render() {
    const { question, user } = this.props;
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const votesTotal = optionOneVotes + optionTwoVotes;
    const userVote = user.answers[question.id];

    // let option1 = styles.secondary,
    //   option2 = styles.secondary;
    // if (optionOneVotes > optionTwoVotes) {
    //   option1 = styles.primary;
    // } else if (optionTwoVotes > optionOneVotes) {
    //   option2 = styles.primary;
    // }

    return (
      <Fragment>
        <div class="card-body">
          <h4>Results: Would you rather</h4>
          <div style={{ border: "solid", borderColor: "black" }}>
            {userVote === "optionOne" && <YourVoteLabel />}
            <p style={{ fontWeight: "bold" }}>{question.optionOne.text}</p>
            <div class="progress" style={{ height: 40 }}>
              <div
                class="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{
                  width: `${((optionOneVotes / votesTotal) * 100).toFixed(2)}%`,
                }}
              >
                {((optionOneVotes / votesTotal) * 100).toFixed(2)}
              </div>
            </div>
            <div class="text-center">
              <label>
                {" "}
                {optionOneVotes} out of {votesTotal} votes
              </label>
            </div>
          </div>
          <div style={{ border: "solid", borderColor: "black", marginTop: 10 }}>
            {userVote === "optionTwo" && <YourVoteLabel />}

            <p style={{ fontWeight: "bold" }}>{question.optionTwo.text}</p>
            <div class="progress" style={{ height: 40 }}>
              <div
                class="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{
                  width: `${((optionTwoVotes / votesTotal) * 100).toFixed(2)}%`,
                }}
              >
                {((optionTwoVotes / votesTotal) * 100).toFixed(2)}
              </div>
            </div>
            <div class="text-center">
              <label>
                {optionTwoVotes} out of {votesTotal} votes
              </label>
            </div>
          </div>
          <button
            className="btn btn-primary mt-5 btn-lg"
            size="tiny"
            floated="right"
            onClick={this.handleClick}
          >
            Back
          </button>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ users, auth }) {
  const user = users[auth];
  return {
    user,
  };
}

export default withRouter(connect(mapStateToProps)(QuestionResult));
