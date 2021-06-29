import { httpService } from "./http.service";

export const userService = {
  getUsers,
  getById,
  remove,
  update,
  getUser,
  addVideo,
  getLoggedinUser,
  login,
  signup,
  logout,
};

// var user = {
//   _id: "",
//   fullname: "David Lee",
//   username: "david",
//   password: "123",
//   isAdmin: false,
//   videos: [],
// };

function getUsers() {
  // return storageService.query('user')
  return httpService.get(`user`);
}

function getById(userId) {
  // return storageService.get('user', userId)
  return httpService.get(`user/${userId}`);
}

function remove(userId) {
  // return storageService.remove('user', userId)
  return httpService.delete(`user/${userId}`);
}

async function update(user) {
  // return storageService.put('user', user)
  user = await httpService.put(`user/${user._id}`, user);
  // Handle case in which admin updates other user's details
  // if (getLoggedinUser()._id === user._id) _saveLocalUser(user);
}

function getUser() {
  const loggedinUser = getLoggedinUser();
  return loggedinUser ? loggedinUser : {};
}

async function login(userCred) {
  // const users = await storageService.query('user')
  // const user = users.find(user => user.username === userCred.username)
  // return _saveLocalUser(user)
  const user = await httpService.post("auth/login", userCred);
  if (user) return _saveLocalUser(user);
}

async function signup(userCred) {
  const user = await httpService.post("auth/signup", userCred);
  // user.name = name;
  return _saveLocalUser(user);
}

async function logout() {
  localStorage.clear();
  return await httpService.post("auth/logout");
  // user = getEmptyLoggedinUser();
  // user = null;
  // return _saveLocalUser(user);
}

function addVideo(video, videoDuration) {
  const user = getUser();
  user.videos.unshift({
    searchWord: video.searchWord,
    videoName: video.title,
    videoDuration: videoDuration,
    time: Date.now(),
  });
  update(user);
  return _saveLocalUser(user);
}

function getLoggedinUser() {
  return JSON.parse(localStorage.getItem("loggedinUser"));
}

function _saveLocalUser(user) {
  localStorage.setItem("loggedinUser", JSON.stringify(user));
  return user;
}

// function getEmptyLoggedinUser() {
//   return {
//     userId: "",
//     fullname: ""
//   };
// }
