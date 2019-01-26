import React, { Component } from "react";
import { Route, NavLink, withRouter } from "react-router-dom";
import styled from "styled-components";

import axios from "axios";
import "./App.css";
import SignUp from "./signup/signup";
import SignIn from "./signin/signin";
import Jokes from "./jokes/jokes";

import { LogIn } from "styled-icons/feather/LogIn";
import { FileSignature } from "styled-icons/fa-solid/FileSignature";
import { BookOpen } from "styled-icons/fa-solid/BookOpen";

class App extends Component {
  state = {
    signedIn: false
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    console.log("token", token);
    if (token) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/jokes`, {
          headers: { authorization: token }
        })
        .then(res => {
          this.setState({ signedIn: true });
          this.props.history.push("/jokes");
        })
        .catch(err => {
          //when token is not valid
          this.props.history.push("/signin");
        });
    } else {
      //when there is no token
      this.props.history.push("/signin");
    }
  }

  toggleLogin = () => {
    this.setState({ signedIn: !this.state.signedIn });
  };

  render() {
    return (
      <>
        <StyledHeader>
          <nav>
            <NavLink to="/signup">
              <SignUpIcon />
              <p>Sign Up</p>
            </NavLink>
            &nbsp;&nbsp;
            <NavLink to="/signin">
              <LogInIcon />
              <p>Sign In</p>
            </NavLink>
            &nbsp;&nbsp;
            <NavLink to="/jokes">
              <JokesIcon />
              <p>Jokes</p>
            </NavLink>
          </nav>
        </StyledHeader>

        <main>
          <Route
            path="/signup"
            render={props => (
              <SignUp {...props} toggleLogin={this.toggleLogin} />
            )}
          />

          <Route
            path="/signin"
            render={props => (
              <SignIn {...props} toggleLogin={this.toggleLogin} />
            )}
          />

          <Route
            path="/jokes"
            render={props => (
              <Jokes
                {...props}
                isLoggedIn={this.state.signedIn}
                toggleLogin={this.toggleLogin}
              />
            )}
          />
        </main>
      </>
    );
  }
}

const StyledHeader = styled.header`
  border-bottom: 1px solid lightblue;

  nav {
    width: 500px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
  }

  a,
  a:visited {
    color: lightblue;
    padding: 5px;
    text-decoration: none;
  }

  a.active {
    color: white;
    font-weight: bold;
    border: 1px solid white;
  }

  p {
    margin: 0;
    text-align: center;
  }
`;

const LogInIcon = styled(LogIn)`
  color: lightblue;
`;
const SignUpIcon = styled(FileSignature)`
  color: lightblue;
`;
const JokesIcon = styled(BookOpen)`
  color: lightblue;
  height: 50px;
`;

export default withRouter(App);
