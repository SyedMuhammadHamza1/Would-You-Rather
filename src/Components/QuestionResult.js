import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const YourVoteLabel = () => (
  <div className="text-right">
    <h4>
      <span className="badge badge-success">Your Vote</span>
    </h4>
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

    return (
      <Fragment>
        <div className="card-body">
          <h4>Results: Would you rather</h4>
          <div className="card shadow p-3 mb-5 bg-white rounded">
            {userVote === "optionOne" && <YourVoteLabel />}
            <p style={{ fontWeight: "bold" }}>{question.optionOne.text}</p>
            <div className="progress" style={{ height: 40 }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{
                  width: `${((optionOneVotes / votesTotal) * 100).toFixed(2)}%`,
                }}
              >
                {((optionOneVotes / votesTotal) * 100).toFixed(2)}%
              </div>
            </div>
            <div className="text-center">
              <label>
                {" "}
                {optionOneVotes} out of {votesTotal} votes
              </label>
            </div>
          </div>
          <div className="card shadow p-3 mb-5 bg-white rounded">
            {userVote === "optionTwo" && <YourVoteLabel />}

            <p style={{ fontWeight: "bold" }}>{question.optionTwo.text}</p>
            <div className="progress" style={{ height: 40 }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{
                  width: `${((optionTwoVotes / votesTotal) * 100).toFixed(2)}%`,
                }}
              >
                {((optionTwoVotes / votesTotal) * 100).toFixed(2)}%
              </div>
            </div>
            <div className="text-center">
              <label>
                {optionTwoVotes} out of {votesTotal} votes
              </label>
            </div>
          </div>
          <button
            className="btn btn-primary float-right"
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
