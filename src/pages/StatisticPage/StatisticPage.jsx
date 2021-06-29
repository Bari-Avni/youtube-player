import { Component } from "react";
import { userService } from "../../services/userService";
import "./StatisticPage.scss";

export class StatisticPage extends Component {
  state = {
    user: null,
    users: null,
    selectedUser: null,
  };

  componentDidMount() {
    this.loadUser();
  }

  async loadUser() {
    const user = await userService.getUser();
    this.setState({ user });
    this.setState({ selectedUser: user });
    if (user.isAdmin) {
      const users = await userService.getUsers();
      this.setState({ users });
    }
  }

  onUserAdmin = (isAdmin) => {
    return isAdmin ? "Yes" : "No";
  };

  getDuration(sec) {
    const date = new Date(0);
    date.setSeconds(sec);
    const timeString = date.toISOString().substr(11, 8);
    return timeString;
  }

  getTime(time) {
    return new Date(time).toLocaleString("he-IL");
  }

  showVideos(user) {
    this.setState({ selectedUser: user });
  }

  render() {
    const { user, users, selectedUser } = this.state;
    if (!user || !selectedUser) return <div>Loading user.....</div>;
    return (
      <section className="statistic-page main-container">
        <h1>Statistics Page:</h1>
        <div className="stats-cred flex">
          <h2>Fullname: {user.username}</h2>
          <h2>Username: {user.fullname}</h2>
          <h2>Admin: {this.onUserAdmin(user.isAdmin)}</h2>
        </div>
        {users && user.isAdmin ? (
          <div className="stats-users">
            <h3>Users list:</h3>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>fullname</th>
                  <th>Username</th>
                  <th>Admin</th>
                  <th>Watched videos</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{user.fullname}</td>
                    <td>{user.username}</td>
                    <td>{this.onUserAdmin(user.isAdmin)}</td>
                    <td>
                      <button onClick={() => this.showVideos(user)}>
                        Show
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}
        {selectedUser.videos.length > 0 ? (
          <div className="stats-videos">
            <h3>User {selectedUser.fullname} watched videos:</h3>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Search term</th>
                  <th>Video name</th>
                  <th>Video duration</th>
                  <th>Time watched</th>
                </tr>
              </thead>
              <tbody>
                {selectedUser.videos.map((video, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{video.searchWord}</td>
                    <td>{video.videoName}</td>
                    <td>{this.getDuration(video.videoDuration)}</td>
                    <td>{this.getTime(video.time)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h3>No watched videos yet for user {selectedUser.fullname}</h3>
        )}
      </section>
    );
  }
}
