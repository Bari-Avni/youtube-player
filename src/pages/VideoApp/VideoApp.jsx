import { Component } from "react";
import { connect } from "react-redux";
import { VideoFilter } from "../../cmps/VideoFilter/VideoFilter";
import { VideoList } from "../../cmps/VideoList/VideoList";
import { VideoDetails } from "../../cmps/VideoDetails/VideoDetails";
// import { eventBusService } from "../../services/eventBusService";
import {
  loadVideos,
  // removeVideo,
  // performVideo,
} from "../../store/actions/videoActions";
import "./VideoApp.scss";

class _VideoApp extends Component {
  state = {
    videos: null,
    selectedVideo: null,
    filterBy: {
      term: "",
    },
  };

  componentDidMount() {
    this.props.loadVideos(this.state.filterBy || "beatles");

    // eventBusService.on("Start Action", (data) => {
    //   // this.props.performVideo(data);
    //   this.props.loadVideos(this.state.filterBy);
    // });
  }

  componentDidUpdate() {
    if (!this.state.selectedVideo)
      this.setState({ selectedVideo: this.props.videos[0].videos[0] });
  }

  onChangeFilter = (filterBy) => {
    this.setState({ filterBy });
    this.props.loadVideos(filterBy);
  };

  onSelectVideo = (video) => {
    this.setState({ selectedVideo: video });
  };

  render() {
    const { videos } = this.props;
    return (
      <section className="video-app main-container">
        <VideoFilter onChangeFilter={this.onChangeFilter} />
        <div className="video-container flex space-between">
          <VideoList onSelectVideo={this.onSelectVideo} videos={videos} />
          {this.state.selectedVideo && (
            <VideoDetails selectedVideo={this.state.selectedVideo} />
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    videos: state.videoReducer.videos,
  };
};

const mapDispatchToProps = {
  loadVideos,
  // removeVideo,
  // performVideo,
};

export const VideoApp = connect(mapStateToProps, mapDispatchToProps)(_VideoApp);
