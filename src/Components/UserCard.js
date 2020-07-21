import React, { Component } from "react";
import Questions from "./Questions";
import { connect } from "react-redux";
import AnswerQuestion from "./AnswerQuestion";
import QuestionResult from "./QuestionResult";

const pollTypes = {
  POLL_TEASER: "POLL_TEASER",
  POLL_QUESTION: "POLL_QUESTION",
  POLL_RESULT: "POLL_RESULT",
};

const PollContent = (props) => {
  const { pollType, question, unanswered } = props;

  switch (pollType) {
    case pollTypes.POLL_TEASER:
      return <Questions question={question} unanswered={unanswered} />;
    case pollTypes.POLL_QUESTION:
      return <AnswerQuestion question={question} />;
    case pollTypes.POLL_RESULT:
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
    const { author, question, pollType, unanswered = null } = this.props;
    return (
      <div class="row pb-2 justify-content-center">
        <div class="col-md-7">
          <div class="card shadow p-3 mb-5 bg-white rounded">
            <div class="card-header">{author.name} Ask:</div>
            <div class="card-body">
              <div class="row justify-content-center">
                <div class="col-md-3">
                  <img
                    src={author.avatarURL}
                    class="rounded-circle z-depth-0"
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
  let question, pollType;
  if (question_id !== undefined) {
    question = questions[question_id];
    pollType = pollTypes.POLL_TEASER;
  } else {
    const { question_id } = match.params;
    question = questions[question_id];
    const user = users[auth];

    pollType = pollTypes.POLL_QUESTION;
    if (Object.keys(user.answers).includes(question.id)) {
      pollType = pollTypes.POLL_RESULT;
    }
  }
  const author = users[question.author];

  return {
    question,
    author,
    pollType,
  };
}

export default connect(mapStateToProps)(UserCard);
