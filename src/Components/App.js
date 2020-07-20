import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { handleInitialData } from "../Redux/Actions/sharedAction"; // <- new
import { connect } from "react-redux"; // <- new
import Login from "./Login";
import NavBar from "./NavBar";

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
                {/* <Route exact path="/" component={Home} /> */}
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
