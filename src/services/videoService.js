import { httpService } from "./http.service.js";
import Axios from "axios";

export const videoService = {
  getVideos,
  getYTVideos,
  getVideoById,
  removeVideo,
  saveVideo,
  getEmptyVideo,
  // performVideo,
};

const API_KEY = "AIzaSyBnWvaojEtdHAjoLNxrG8k87QpGpvOHgiQ";
// const API_KEY = "AIzaSyCp8KMTEjR9frWUGpSnc8Cw5cLVe7wRRDM";

function getVideos(filterBy) {
  console.log("filterBy", filterBy);
  var queryStr = !filterBy ? "" : `?txt=${filterBy.term}`;
  return httpService.get(`video${queryStr}`);
}

async function getYTVideos(filterBy) {
  console.log("filterBy", filterBy);
  return Axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&maxResults=2&key=${API_KEY}&q=${filterBy.term}`
  )
    .then((res) => res.data.items)
    .then((ytVideosId) => {
      return ytVideosId
        .map((ytVideoId) => {
          return ytVideoId.id.videoId;
        })
        .join();
    })
    .then((ytVideosId) => {
      return Axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${ytVideosId}&key=${API_KEY}`
      );
    })
    .then((res) => res.data.items)
    .then((ytVideos) =>
      ytVideos.map((ytVideo) => ({
        // id: ytVideo.id.videoId,
        id: ytVideo.id,
        title: ytVideo.snippet.title,
        description: ytVideo.snippet.description,
        duration: ytVideo.contentDetails.duration,
        views: ytVideo.statistics.viewCount,
        img: {
          url: ytVideo.snippet.thumbnails.default.url,
          width: ytVideo.snippet.thumbnails.default.width,
          height: ytVideo.snippet.thumbnails.default.height,
        },
        searchWord: filterBy.term,
      }))
    )
    .then((videos) => {
      return httpService.post(`video`, videos);
    })
    .then((videos) => {
      return [videos];
    });
}

function getVideoById(videoId) {
  return httpService.get(`video/${videoId}`);
}

function removeVideo(videoId) {
  return httpService.delete(`video/${videoId}`);
}

// Update or Add
function saveVideo(video) {
  if (video._id) {
    return httpService.put(`video/${video._Id}`, video);
  } else {
    return httpService.post(`video`, video);
  }
}

// function performVideo(video){
//   return httpService.put(`video/${video._Id}/start`, video);
// }

function getEmptyVideo() {
  return {
    searchWord: "",
    videos: [],
  };
}
