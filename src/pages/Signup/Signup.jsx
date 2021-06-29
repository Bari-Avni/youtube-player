import React, { Component } from "react";
import { connect } from "react-redux";
import { signup, login } from "../../store/actions/userActions";
import { userService } from "../../services/userService";
import "./Signup.scss";

class _signup extends Component {
  state = {
    loggedinUser: userService.getLoggedinUser(),
    credentials: null,
    signupCredentials: {
      isAdmin: false
    },
  };

  async componentDidMount() {
    // console.log("this.state", this.state);
  }

  handleSignupChange = ({ target }) => {
    const field = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState((prevState) => ({
      signupCredentials: { ...prevState.signupCredentials, [field]: value },
    }));
  };
  handleLoginChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => ({
      credentials: { ...prevState.credentials, [field]: value },
    }));
  };

  onLogout = async () => {
    userService.logout();
    this.setState({ loggedinUser: null });
  };
  onAddUser = async (ev) => {
    ev.preventDefault();
    this.props.signup(this.state.signupCredentials);
    this.props.history.push("/");
  };
  onLogin = async (ev) => {
    try{
      ev.preventDefault();
      await this.props.login(this.state.credentials);
      this.props.history.push("/");
    }catch (err) {
      console.log('login-error', err);
      this.setState({credentials: null})
      document.getElementsByName('login')[0].reset();
  }
  };
  render() {
    const { loggedinUser } = this.state || "";
    return (
      <section className="user-signup main-container">
        {loggedinUser && (
          <div className="loggedin">
            <h2>Loggedin User: {loggedinUser.fullname}</h2>
            <button onClick={this.onLogout}>Logout</button>
          </div>
        )}
        {!loggedinUser && (
          <div className="loggedin essential">
            <h2>Must Login to get to YouTube Player App</h2>
          </div>
        )}
        <form className="login" name="login" onSubmit={this.onLogin}>
          <h2>User Login to App:</h2>
          <div>
            <label htmlFor="username">Your username</label>
            <input
              required
              type="text"
              id="username"
              name="username"
              onChange={this.handleLoginChange}
            />
            </div>
            <div>
            <label htmlFor="password">Your password</label>
            <input
              required
              type="text"
              id="password"
              name="password"
              onChange={this.handleLoginChange}
            />
          </div>
          <div>
            <button>Login</button>
          </div>
        </form>
        <form className="signup" onSubmit={this.onAddUser}>
          <h2>Signup a new user:</h2>
          <div>
            <label htmlFor="fullname">Your fullname</label>
            <input
              required
              type="text"
              id="fullname"
              name="fullname"
              onChange={this.handleSignupChange}
            />
            </div>
          <div>
            <label htmlFor="username">Your username</label>
            <input
              required
              type="text"
              id="username"
              name="username"
              onChange={this.handleSignupChange}
            />
            </div>
          <div>
            <label htmlFor="password">Your password</label>
            <input
              required
              type="text"
              id="password"
              name="password"
              onChange={this.handleSignupChange}
            />
            </div>
          <div>
            <label htmlFor="isAdmin">Admin:</label>
            <input
              type="checkbox"
              defaultChecked={false}
              id="isAdmin"
              name="isAdmin"
              onChange={this.handleSignupChange}
            />
          </div>
          <div>
            <button>Signup</button>
          </div>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = {
  signup,
  login
};

export const Signup = connect(null, mapDispatchToProps)(_signup);
