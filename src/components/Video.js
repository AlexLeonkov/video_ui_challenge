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

const { TextArea } = Input;
const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
function Video({ videos }) {
  console.log(videos);
  let videoName = useParams();
  let selectedVideo = videos.find((video) => video.id === videoName.id);
  console.log(selectedVideo);
  const [isOpened, setIsOpended] = useState(true);

  const [comments, setComments] = useState(selectedVideo.comments);

  const [comment, setComment] = useState("");

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "425",
    width: "756",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const addComment = () => {
    data.videos[0].comments.push("strfrnf");
    console.log("clicked");
    setComments([...comments, comment]);
    setComment("");
  };

  return (
    <Layout>
      <Content>
        <div className="left-content">
          <YouTube
            // autoplay={0}
            videoId={selectedVideo.id}
            opts={opts}
            onReady={onPlayerReady}
          />
          <Title level={4}>{selectedVideo.title}</Title>

          <TextArea
           placeholder="leave your comment"
           value={comment}
            onChange={(event) => {
              setComment(event.target.value);
              console.log(comment);
            }}
            className="input"
            rows={1}
          />

          <Button style={{ marginLeft: 5 }} onClick={addComment} type="primary">
            Publish comment
          </Button>
          <div>
            <Button
              style={{ marginTop: 5 }}
              onClick={() => {
                setIsOpended(!isOpened);
              }}
              type="primary"
            >
              {isOpened ? "Hide commetns" : "Show commetns"}
            </Button>
          </div>

          {isOpened && (
            <div style={{ border: "solid 1px gray" }} className="comments">
              {comments.map((comment) => (
                <Comment
                  key={comment}
                  author={<a>Han Solo</a>}
                  avatar={
                    <Avatar
                      src="https://joeschmoe.io/api/v1/random"
                      alt="Han Solo"
                    />
                  }
                  content={<p>{comment}</p>}
                ></Comment>
              ))}
            </div>
          )}

          <div></div>
        </div>
      </Content>

      <Sider>
        Recomended videos
        <RecommendedVideo />
      </Sider>
    </Layout>
  );
}

export default Video;
