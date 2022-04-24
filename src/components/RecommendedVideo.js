import React from "react";
import data from "../data.json";
import { Link } from "react-router-dom";

function RecommendedVideo() {
  const videos = data.videos;
  console.log(videos);
  return (
    <div>
      {videos.map((video) => (
        <div>
          <Link to={"/video/" + video.id}>
            <img
              alt={video.title}
              style={{ width: 200, marginBottom: 10 }}
              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
            />
            <p>{video.title}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default RecommendedVideo;
