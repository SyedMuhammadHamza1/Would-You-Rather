import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

export class Leaderboard extends Component {
  render() {
    const { leaderboardData } = this.props;

    return (
      <Fragment>
        {leaderboardData.map((user, key) => (
          <div key={key} className="row pb-2 justify-content-center">
            <div className="col-md-7">
              <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <img
                        src={user.avatarURL}
                        className="rounded-circle z-depth-0"
                        alt="avatar image"
                        height="160"
                      />
                    </div>
                    <div className="col-md-5">
                      <h3>{user.name}</h3>
                      <br />
                      <label>Answered Question</label>
                      <label
                        className="ml-5 font-weight-bold"
                        style={{ fontSize: 26 }}
                      >
                        {user.answerCount}
                      </label>
                      <br />
                      <hr />
                      <label>Created Question</label>
                      <label
                        className="ml-5 font-weight-bold"
                        style={{ fontSize: 26 }}
                      >
                        &nbsp;&nbsp;{user.questionCount}
                      </label>
                    </div>
                    <div className="col-md-3 text-center">
                      <div className="card shadow p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                          <label>Score</label>
                          <div
                            style={{
                              backgroundColor: "green",
                              borderRadius: "50%",
                              height: 50,
                              width: 50,
                              color: "white",
                              textAlign: "center",
                              marginLeft: 10,
                            }}
                          >
                            <label style={{ fontSize: 20, marginTop: 5 }}>
                              {user.questionCount + user.answerCount}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Fragment>
    );
  }
}

function mapStateToProps({ users }) {
  const leaderboardData = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answerCount: Object.values(user.answers).length,
      questionCount: user.questions.length,
      total: Object.values(user.answers).length + user.questions.length,
    }))
    .sort((a, b) => a.total - b.total)
    .reverse()
    .slice(0, 3);
  return {
    leaderboardData,
  };
}

export default connect(mapStateToProps)(Leaderboard);
