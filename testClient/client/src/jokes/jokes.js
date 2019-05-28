import React from "react";
import axios from "axios";
import styled from "styled-components";
import { LogOut } from "styled-icons/feather/LogOut";

class Jokes extends React.Component {
  state = {
    jokes: []
  };

  async componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.props.history.push("/signin");
    }

    const endpoint = process.env.REACT_APP_API_URL;

    try {
      const response = await axios.get(`${endpoint}/api/jokes`, {
        headers: { authorization: localStorage.getItem("token") }
      });
      console.log(response);
      this.setState({ jokes: response.data });
    } catch (err) {
      console.log(err);
    }
  }

  logOut = () => {
    localStorage.removeItem("token");
    this.props.toggleLogin();
    this.props.history.push("/signin");
  };

  render() {
    return (
      <JokesDiv>
        <h2>List of Jokes</h2>
        <ul>
          {this.state.jokes.map(joke => (
            <li key={joke.id}>{joke.joke}</li>
          ))}
        </ul>
        {this.props.isLoggedIn ? (
          <button onClick={this.logOut}>
            <LogOutIcon />
            Log Out
          </button>
        ) : null}
      </JokesDiv>
    );
  }
}

const JokesDiv = styled.section`
  color: lightblue;
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  h2 {
    text-decoration: underline;
    text-align: center;
  }

  ul {
    /* list-style-type: none; */

    li {
      padding: 5px;
      /* border: 1px solid lightblue; */
    }
  }

  button {
    margin-top: 20px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 5px 3px lightblue;
    }
    &:active {
      background: black;
      color: lightblue;

      svg {
        color: lightblue;
      }
    }
  }
`;

const LogOutIcon = styled(LogOut)`
  color: black;
  height: 30px;
  padding-right: 20px;
`;

export default Jokes;
