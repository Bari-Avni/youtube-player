import { Component } from "react";
import "./VideoFilter.scss";

export class VideoFilter extends Component {
  state = {
    term: "",
  };
  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === "number" ? +target.value : target.value;
    this.setState({ [field]: value });
  };

  onSearch = (ev) => {
    ev.preventDefault();
    this.props.onChangeFilter({ ...this.state });
  };

  render() {
    const { name } = this.state;
    return (
      <form className="video-filter flex justify-center" onSubmit={this.onSearch}>
        <input
          type="text"
          id="term"
          name="term"
          required="required"
          placeholder="Search on YouTube"
          autoComplete="off"
          value={name}
          onChange={this.handleChange}
        />
        <button>Search</button>
      </form>
    );
  }
}
