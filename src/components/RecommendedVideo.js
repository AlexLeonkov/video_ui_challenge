import React from "react";
import data from "../data.json";
import { Link } from "react-router-dom";

import './recommended-video.css'

function RecommendedVideo() {
  const videos = data.videos;

  return (
    <div className="video">
      <h3 className="headline">Recomended videos</h3>
      <div className="video-list">
        {videos.map((video,index) => (
          <div key={index} className="video-item">
            <Link to={"/video/" + video.id}>
              <img
                alt={video.title}
                src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              />
              <p>{video.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedVideo;
