import React, { Component } from "react";
import { connect } from "react-redux";
import UserCard from "./UserCard";
class MainDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { userQuestionData } = this.props;
    return (
      <section className="container py-4">
        <div className="row">
          <div className="col-md-12">
            <h2>Tabs</h2>
            <ul id="tabs" className="nav nav-tabs">
              <li className="nav-item">
                <a
                  data-target="#home1"
                  data-toggle="tab"
                  className="nav-link small text-uppercase active"
                >
                  Unanswered
                </a>
              </li>
              <li className="nav-item">
                <a
                  data-target="#profile1"
                  data-toggle="tab"
                  className="nav-link small text-uppercase"
                >
                  Answered
                </a>
              </li>
            </ul>
            <br />
            <div id="tabsContent" className="tab-content">
              <div id="home1" className="tab-pane fade active show">
                {userQuestionData.unanswered.map((item, index) => {
                  return (
                    <UserCard
                      key={item.id}
                      question_id={item.id}
                      unanswered={true}
                    />
                  );
                })}
              </div>
              <div id="profile1" className="tab-pane fade">
                {userQuestionData.answered.map((item, index) => {
                  return (
                    <UserCard
                      key={item.id}
                      question_id={item.id}
                      unanswered={false}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ auth, users, questions }) {
  const answeredIds = Object.keys(users[auth].answers);
  const answered = Object.values(questions)
    .filter((question) => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter((question) => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    userQuestionData: {
      answered,
      unanswered,
    },
  };
}

export default connect(mapStateToProps)(MainDashboard);
