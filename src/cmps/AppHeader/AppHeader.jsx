import { NavLink, withRouter } from "react-router-dom";
import "./AppHeader.scss";
import youtubeLogo from "../../assets/img/youtube-player.png";

const _AppHeader = (props) => {
  return (
    <section className="header-container main-container">
      <div className="app-header">
        <NavLink exact to="/" activeClassName="active-nav">
          <div className="logo">
            <img src={youtubeLogo} alt="" />
            <h3>YouTube Player</h3>
          </div>
        </NavLink>
        <ul className="nav">
          <li>
            <NavLink exact to="/" activeClassName="active-nav">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/signup" activeClassName="active-nav">
              Login/Signup
            </NavLink>
          </li>
          <li>
            <NavLink to="/stats" activeClassName="active-nav">
              Statistics
            </NavLink>
          </li>
        </ul>
      </div>
    </section>
  );
};

export const AppHeader = withRouter(_AppHeader);
