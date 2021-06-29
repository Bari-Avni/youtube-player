import { VideoPreview } from "../VideoPreview";
import "./VideoList.scss";

export function VideoList({ videos, onSelectVideo }) {
  if (!videos || !videos.length) return <div>Loading Videos.....</div>;

  return (
    <section className="video-list">
      <ul className="clean-list">
        {videos && videos[0].videos.map((video, idx) => (
            <li key={idx}>
              <VideoPreview onSelectVideo={() => onSelectVideo(video)} key={video.id} video={video} />
            </li>
          ))}
      </ul>
    </section>
  );
}
