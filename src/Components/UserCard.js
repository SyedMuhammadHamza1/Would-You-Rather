import React, { Component } from "react";
import Questions from "./Questions";
import { connect } from "react-redux";
import AnswerQuestion from "./AnswerQuestion";
import QuestionResult from "./QuestionResult";
import { Redirect } from "react-router-dom";

const pollTypes = {
  ALL_QUESTIONS: "ALL_QUESTIONS",
  ALL_ANSWERS: "ALL_ANSWERS",
  ALL_RESULTS: "ALL_RESULTS",
};

const PollContent = (props) => {
  const { pollType, question, unanswered } = props;

  switch (pollType) {
    case pollTypes.ALL_QUESTIONS:
      return <Questions question={question} unanswered={unanswered} />;
    case pollTypes.ALL_ANSWERS:
      return <AnswerQuestion question={question} />;
    case pollTypes.ALL_RESULTS:
      return <QuestionResult question={question} />;
    default:
      return;
  }
};

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      author,
      question,
      pollType,
      badPath,
      unanswered = null,
    } = this.props;
    if (badPath === true) {
      return <Redirect to="/questions/wrong" />;
    }
    return (
      <div className="row pb-2 justify-content-center">
        <div className="col-md-7">
          <div className="card shadow p-3 mb-5 bg-white rounded">
            <div className="card-header">{author.name} Ask:</div>
            <div className="card-body">
              <div className="row justify-content-center">
                <div className="col-md-3">
                  <img
                    src={author.avatarURL}
                    className="rounded-circle z-depth-0"
                    alt="avatar image"
                    height="160"
                  />
                </div>
                <PollContent
                  pollType={pollType}
                  question={question}
                  unanswered={unanswered}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, questions, auth }, { match, question_id }) {
  let question,
    author,
    pollType,
    badPath = false;
  if (question_id !== undefined) {
    question = questions[question_id];
    author = users[question.author];
    pollType = pollTypes.ALL_QUESTIONS;
  } else {
    const { question_id } = match.params;
    question = questions[question_id];
    const user = users[auth];

    if (question === undefined) {
      badPath = true;
    } else {
      author = users[question.author];
      pollType = pollTypes.ALL_ANSWERS;
      if (Object.keys(user.answers).includes(question.id)) {
        pollType = pollTypes.ALL_RESULTS;
      }
    }
  }

  return {
    badPath,
    question,
    author,
    pollType,
  };
}

export default connect(mapStateToProps)(UserCard);
