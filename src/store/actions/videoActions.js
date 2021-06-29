import { videoService } from "../../services/videoService";

// Thunk - Action Dispatcher
export function loadVideos(filterBy) {
  return async (dispatch) => {
    let videos = await videoService.getVideos(filterBy);
    if (!videos.length) videos = await videoService.getYTVideos(filterBy);
    const action = {
      type: "SET_VIDEOS",
      videos,
    };
    dispatch(action);
  };
}

export function getVideoById(videoId) {
  return async (dispatch) => {
    const video = await videoService.getVideoById(videoId);
    dispatch({ type: "SET_VIDEO", video });
  };
}

export function saveVideo(video) {
  return async (dispatch) => {
    const isAdd = !video._id;
    const updatedVideo = await videoService.save(video);

    if (isAdd) dispatch({ type: "ADD_VIDEO", video: updatedVideo });
    else dispatch({ type: "UPDATE_VIDEO", updatedVideo });
  };
}

export function removeVideo(videoId) {
  return async (dispatch) => {
    await videoService.removeVideo(videoId);
    dispatch({ type: "REMOVE_VIDEO", videoId });
  };
}

export function performVideo(video) {
  return async (dispatch) => {
    await videoService.performVideo(video);
    dispatch({ type: "PERFORM_VIDEO", video });
  };
}
