import React, { Component } from "react";
import { connect } from "react-redux";
import Questions from "./Questions";
class MainDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { userQuestionData } = this.props;
    console.log("users question", userQuestionData);
    return (
      <section class="container py-4">
        <div class="row">
          <div class="col-md-12">
            <h2>Tabs</h2>
            <ul id="tabs" class="nav nav-tabs">
              <li class="nav-item">
                <a
                  href=""
                  data-target="#home1"
                  data-toggle="tab"
                  class="nav-link small text-uppercase active"
                >
                  Unanswered
                </a>
              </li>
              <li class="nav-item">
                <a
                  href=""
                  data-target="#profile1"
                  data-toggle="tab"
                  class="nav-link small text-uppercase"
                >
                  Answered
                </a>
              </li>
            </ul>
            <br />
            <div id="tabsContent" class="tab-content">
              <div id="home1" class="tab-pane fade active show">
                {userQuestionData.unanswered.map((item, index) => {
                  return (
                    <div class="row pb-2" key={index}>
                      <div class="col-md-7">
                        <div class="card shadow p-3 mb-5 bg-white rounded">
                          <div class="card-header">{item.author} Ask:</div>
                          <Questions
                            question={item}
                            unanswered={true}
                            classCheck={"btn btn-primary"}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div id="profile1" class="tab-pane fade">
                {userQuestionData.answered.map((item, index) => {
                  return (
                    <div class="row pb-2" key={index}>
                      <div class="col-md-7">
                        <div class="card shadow p-3 mb-5 bg-white rounded">
                          <div class="card-header">{item.author} Ask:</div>
                          <Questions
                            question={item}
                            unanswered={false}
                            classCheck={"btn btn-warning"}
                          />
                        </div>
                      </div>
                    </div>
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
