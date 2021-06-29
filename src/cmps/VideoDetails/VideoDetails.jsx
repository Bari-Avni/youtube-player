import { Component } from "react";
import { connect } from "react-redux";
// import YouTube from "react-youtube";
// import ReactPlayer from "react-player/youtube";
import { addVideo } from "../../store/actions/userActions";
// import { getVideoById } from "../../store/actions/videoActions";
// import { userReducer } from "../../store/reducers/userReducer";
import "./VideoDetails.scss";

class _VideoDetails extends Component {
  state = {
    video: null,
    videoDuration: null,
    // videoWatchedDuration: null,
  };

  componentDidMount() {
    this.setState({ video: this.props.selectedVideo });
    // this.props.getVideoById(this.props.selectedVideoId);
    // this.props.getVideoById(this.props.match.params.id);

    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    if (!window.YT) {
      // If not, load the script asynchronously
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // onYouTubeIframeAPIReady will load the video after the script is loaded
      window.onYouTubeIframeAPIReady = this.loadVideo;
    } else {
      // If script is already there, load the video directly
      window.onYouTubeIframeAPIReady = this.loadVideo();
      // this.loadVideo();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedVideo.id !== this.props.selectedVideo.id) {
      this.setState({ video: this.props.selectedVideo });
    }
    // this.props.getVideoById(this.props.selectedVideoId);
    // if (prevProps.match.params.id !== this.props.match.params.id) {
    //   this.props.getVideoById(this.props.match.params.id);
    // }

    if (!window.YT) {
      // If not, load the script asynchronously
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // onYouTubeIframeAPIReady will load the video after the script is loaded
      window.onYouTubeIframeAPIReady = this.loadVideo;
    } else {
      if (prevProps.selectedVideo.id !== this.props.selectedVideo.id) {
        // If script is already there, load the video directly
        console.log('YT player - change video');
        window.onYouTubeIframeAPIReady = this.loadVideo();
        // this.loadVideo();
      }
    }
  }

  loadVideo = () => {
    const id = this.props.selectedVideo.id;
    console.log("load-video-id", id);
    this.player = new window.YT.Player("player", {
      // height: 315,
      // width: 560,
      // videoId: id,
      playerVars: {
        autoplay: 1,
        origin: "http://localhost:3000/#/",
      },
      events: {
        onReady: this.onPlayerReady,
        // onApiChange: this.onPlayerApiChange,
        // onStateChange: this.onPlayerStateChange,
      },
    });
  };

  onPlayerReady = (event) => {
    var ytPlayer = event.target;
    console.log("ready-event", event);
    this.setState({ videoDuration: ytPlayer.getDuration() });
    ytPlayer.playVideo();
    this.props.addVideo(this.state.video, this.state.videoDuration);
  };
  onPlayerApiChange = (event) => {
    var ytPlayer = event.target;
    console.log("api-event", event);
    this.setState({ videoDuration: ytPlayer.getCurrentTime() });
    this.props.addVideo(this.state.video, this.state.videoDuration);
  };
  onPlayerStateChange = (event) => {
    var ytPlayer = event.target;
    console.log("state-event", event);
    console.log("player-state", ytPlayer.getPlayerState());
    console.log("time", ytPlayer.getCurrentTime());
  };

  render() {
    const { video } = this.state;
    // const opts = { height: "340", width: "600", playerVars: { autoplay: 1 } };
    if (!video) return <div>Loading Video.....</div>;
    return (
      <section className="video-details">
        <iframe
          id="player"
          src={`https://www.youtube.com/embed/${video.id}?version=3&enablejsapi=1&autoplay=1&allow=autoplay`}
          autoPlay="1"
          allow="autoplay"
          width="560"
          height="315"
          frameBorder="0"
          title="ytplayer"
        ></iframe>
        {/* <YouTube videoId={video.id} opts={opts} onReady={this.onPlayerReady} onStateChange={this.onPlayerStateChange} ></YouTube> */}
        {/* <ReactPlayer url={`https://www.youtube.com/watch?v=${video.id}`} onStart={this._onReady} onDuration={this.getDuration} ref={this.ref} onEnded={this.getCurrentTime} /> */}
        {/* <ReactPlayer url={`https://www.youtube.com/embed/${video.id}`} onStart={this._onReady} onDuration={this.getDuration} ref={this.ref} onEnded={this.getCurrentTime} /> */}
        <p className="title">
          Currently playing: <span>{video.title}</span>
        </p>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  video: state.videoReducer.currVideo,
  user: state.userReducer.user,
});

const mapDispatchToProps = {
  // getVideoById,
  addVideo,
};

export const VideoDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_VideoDetails);
