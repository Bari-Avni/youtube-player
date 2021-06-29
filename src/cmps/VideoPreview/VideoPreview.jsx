import "./VideoPreview.scss";

export function VideoPreview({ video, onSelectVideo }) {
  function showLongTxt(txt) {
    return txt.length > 60 ? txt.substring(0, 60) + "..." : txt;
  }

  function showViews(views) {
    return parseInt(views).toLocaleString("he-IL");
  }

  return (
    <div className="video-preview">
      <img
        src={video.img.url}
        width={video.img.width}
        height={video.img.height}
        alt=""
      />
      <div className="content">
        <div className="preview-section flex">
          <p className="preview-header">Song Name:</p>
          <p className="preview-title">{showLongTxt(video.title)}</p>
        </div>
        <div className="preview-section flex">
          <p className="preview-header">Song Description:</p>
          <p className="preview-txt">{showLongTxt(video.description)}</p>
        </div>
        <div className="flex">
          <p className="preview-header">Total views: </p>
          <p className="preview-txt">{showViews(video.views)}</p>
        </div>
      </div>
      <button onClick={() => onSelectVideo(video)}>Play</button>
    </div>
  );
}
