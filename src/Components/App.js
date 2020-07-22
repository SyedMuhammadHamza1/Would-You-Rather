import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { landingData } from "../Redux/Actions/sharedAction";
import { connect } from "react-redux";
import Login from "./Login";
import NavBar from "./NavBar";
import MainDashboard from "./MainDashbord";
import UserCard from "./UserCard";
import CreateQuestion from "./CreateQuestion";
import LeaderBoard from "./LeaderBoard";
import WrongPath from "./WrongPath";

class App extends Component {
  componentDidMount() {
    this.props.landingData();
  }
  render() {
    const { auth } = this.props;
    return (
      <Router>
        <div className="App">
          {auth === null ? (
            <Route render={() => <Login />} />
          ) : (
            <React.Fragment>
              <NavBar />
              <ContentGrid>
                <Switch>
                  <Route exact path="/" component={MainDashboard} />
                  <Route path="/questions/:question_id" component={UserCard} />
                  <Route path="/add" component={CreateQuestion} />
                  <Route path="/leaderboard" component={LeaderBoard} />
                  <Route component={WrongPath} />
                  <Route path="/questions/wrong" component={WrongPath} />
                </Switch>
              </ContentGrid>
            </React.Fragment>
          )}
        </div>
      </Router>
    );
  }
}

const ContentGrid = ({ children }) => <div>{children}</div>;

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(mapStateToProps, { landingData })(App);
