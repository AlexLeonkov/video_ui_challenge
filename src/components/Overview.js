import React from "react";
import data from "../data.json";
import { Link } from "react-router-dom";

function Overview() {
  return (
    <div className="items">
      {data.videos.map((video) => (
        <div key={video.id} className="item">
          <Link to={"/video/" + video.id}>
            <img
              alt={video.title}
              style={{ width: 400 }}
              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
            />
            <p style={{ marginTop: 10 }}> {video.title}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Overview;
