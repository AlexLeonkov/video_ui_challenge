import React from "react";
import "antd/dist/antd.css";
import { Comment, Avatar, Input, Button } from "antd";
import YouTube, { YouTubeProps } from "react-youtube";
import data from "../data.json";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "antd";
import { Layout } from "antd";
import RecommendedVideo from "./RecommendedVideo";

import './video.css'
import { useAuth } from "../context/auth-context";

const { TextArea } = Input;
const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

function Video({ videos }) {
  let videoName = useParams();
  let selectedVideo = videos.find((video) => video.id === videoName.id);

  const [isOpened, setIsOpended] = useState(true);
  const [comments, setComments] = useState(selectedVideo.comments);
  const [comment, setComment] = useState("");

  const onPlayerReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const addComment = () => {
    setComments([...comments, comment]);
    setComment("");
  };

  return (
    <div className="video-container">
      <div className="content">
        <YouTube
          // autoplay={0}
          className="youtube"
          videoId={selectedVideo.id}
          title={selectedVideo.title}
          opts={opts}
          onReady={onPlayerReady}
        />
        <h3 className="headline">{selectedVideo.title}</h3>

        <TextArea
          placeholder="leave your comment"
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
          className="comment-texarea"
          rows={3}
        />

        <Button onClick={addComment} style={{marginTop: 10}} type="default">
          Publish comment
        </Button>

        <div className="toggle-comments">
          <Button
            style={{ marginTop: 5, color: '#000'}}
            onClick={() => {
              setIsOpended(!isOpened);
            }}
            type="link"
          >
            {isOpened ? "Hide commetns" : "Show commetns"}
          </Button>
        </div>

          {isOpened && (
            <div className="comment">
              <div className="comment-list">
                {comments.map((comment) => (
                  <div className="comment-item">
                    <div>
                    <Avatar
                        src="https://joeschmoe.io/api/v1/random"
                        alt="Han Solo"
                      />
                    </div>
                    <div>
                      <strong>{comment?.owner || 'Han Solo' }</strong>
                      <p>{comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
      <div className="sidebar">
        <RecommendedVideo />
      </div>
    </div>
  );
}

export default Video;
