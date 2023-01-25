import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import video from "../assets/video.mp4";
import { useNavigate, useParams } from "react-router-dom";
import { TMDB_BASE_URL, API_KEY } from "../utils/constants";
import axios from "axios";
import YouTube from "react-youtube";
/**
 * @author
 * @function Player
 **/

const Player = (props) => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [trailer, setTrailer] = useState();
  console.log(movieId);
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const getVideoMovie = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`
      )
      .then(function (response) {
        console.log("Video", response);
        // const temp = response.data.videos.results.find((vid) =>
        //   vid.name.includes("Official Trailer")
        // );
        const temp = response.data.videos.results[0];
        console.log("Temp", temp);
        setTrailer(temp.key);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getVideoMovie();
  }, []);
  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <Video>
          <YouTube videoId={trailer} opts={opts} style={{ height: "100%" }} />
        </Video>
        {/* <video src={video} autoPlay loop controls></video> */}
      </div>
    </Container>
  );
};
const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
  }
`;

const Video = styled.div`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
export default Player;
