import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { handleInitialData } from "../Redux/Actions/sharedAction"; // <- new
import { connect } from "react-redux"; // <- new
import Login from "./Login";
import NavBar from "./NavBar";
import MainDashboard from "./MainDashbord";
import UserCard from "./UserCard";
import CreateQuestion from "./CreateQuestion";
import LeaderBoard from "./LeaderBoard";

class App extends Component {
  componentDidMount() {
    // <- new
    this.props.handleInitialData(); // <- new
  } // <- new
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

export default connect(mapStateToProps, { handleInitialData })(App);
