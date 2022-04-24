import "./App.css";
import ReactPlayer from "react-player";
import "antd/dist/antd.css";
import { Comment, Avatar, Input, Button, Layout } from "antd";
import YouTube, { YouTubeProps } from "react-youtube";
import Authentication from "./components/Authentication";
import Register from "./components/registation/Register";
import Login from "./components/registation/Login";
import PrivateRoute from "./components/PrivateRoute";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import data from "./data.json";
import { Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import Video from "./components/Video";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "./components/Overview";
const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;
function App() {
  const [isLogged, setIsLogged] = useState(false);

  const pull_data = (data) => {
    if (data) {
      console.log(data + "from app js");
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
    console.log(data + "from app js");
    console.log(isLogged);

    console.log(data);
  };

  return (
    <div className="App">
      <Router>
        <Header style={{ backgroundColor: "Black" }}>
          <Link to="/">
            <Text
              className="home"
              style={{
                fontWeight: "bold",
                color: "white",
                textAlign: "left",
              }}
            >
              Home
            </Text>
          </Link>
        </Header>
        <Routes>
          <Route
            path="video/:id"
            element={<Video videos={data.videos} />}
          ></Route>

          <Route path="/login" element={<Login func={pull_data} />} />
          <Route path="/register" element={<Register func={pull_data} />} />
          <Route path="/" element={<Overview />} />
          <Route element={<PrivateRoute isLogged={isLogged} />}>
            <Route path="/video" element={<Video />} />
          </Route>
        </Routes>
      </Router>

      {/* <Authentication /> */}
    </div>
  );
}

export default App;
