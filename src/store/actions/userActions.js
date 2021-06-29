import { userService } from "../../services/userService";

export function signup(user) {
  return async (dispatch) => {
    const signupUser = await userService.signup(user);
    dispatch({ type: "SIGNUP", signupUser });
  };
}

export function login(user) {
  return async (dispatch) => {
    const loginUser = await userService.login(user);
    dispatch({ type: "SIGNUP", loginUser });
  };
}

export function addVideo(video, videoDuration) {
  return async (dispatch) => {
    const updatedUser = await userService.addVideo(video, videoDuration);
    dispatch({ type: "SET_USER", user: updatedUser });
  };
}
