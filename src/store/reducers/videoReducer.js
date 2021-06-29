const INITIAL_STATE = {
  videos: [],
  currVideo: null,
};

export function videoReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_VIDEOS":
      return {
        ...state,
        videos: action.videos,
      };
    case "SET_VIDEO":
      return {
        ...state,
        currVideo: action.video,
      };
    case "ADD_VIDEO":
      return {
        ...state,
        videos: [...state.videos, action.video],
      };
    case "REMOVE_VIDEO":
      return {
        ...state,
        videos: state.videos.filter((video) => video._id !== action.videoId),
      };
    case "UPDATE_VIDEO":
      const { updatedVideo } = action;
      return {
        ...state,
        videos: state.videos.map((video) =>
          video._id === updatedVideo._id ? updatedVideo : video
        ),
      };
    case "PERFORM_VIDEO":
      return {
        ...state,
        // videos: [...state.videos, action.video],
      };

    default:
      return state;
  }
}
