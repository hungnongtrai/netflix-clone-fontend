import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import video from "../assets/video.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { async } from "@firebase/util";
import axios from "axios";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { removeFromLikedMovies } from "../store";

/**
 * @author
 * @function Card
 **/

export default React.memo(function Card({
  movieData,
  isLiked = false,
  addToastHandler,
}) {
  const [isHovered, setIsHovered] = useState(false);
  console.log("Hover", isHovered);
  const [email, setEmail] = useState(undefined);
  console.log("Email", email);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   console.log(movieData);
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });
  const addToList = async () => {
    try {
      await axios.post(
        "https://moral-swing-production.up.railway.app/api/user/add",
        {
          email,
          data: movieData,
        }
      );
      addToastHandler(`You added ${movieData.name} to my list!`, "success");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="movie"
        onClick={() => navigate(`/player/${movieData.id}`)}
      />
      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="movie"
              onClick={() => navigate(`/player/${movieData.id}`)}
            />
            <video
              src={video}
              autoPlay
              loop
              muted
              onClick={() => navigate(`/player/${movieData.id}`)}
            />
          </div>
          <div className="info-container flex column">
            <h3
              className="name"
              onClick={() => navigate(`/player/${movieData.id}`)}
            >
              {movieData.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp
                  title="play"
                  onClick={() => navigate(`/player/${movieData.id}`)}
                />

                <RiThumbUpFill
                  title="Like"
                  onClick={() => {
                    addToastHandler(`You liked ${movieData.name}!`, "success");
                  }}
                />

                <RiThumbDownFill
                  title="Dislike"
                  onClick={() => {
                    addToastHandler(`You disliked ${movieData.name}!`, "error");
                  }}
                />
                {isLiked ? (
                  <BsCheck
                    title="Remove Form List"
                    onClick={() =>
                      dispatch(
                        removeFromLikedMovies({ movieId: movieData.id, email })
                      )
                    }
                  />
                ) : (
                  <AiOutlinePlus title="Add to my list" onClick={addToList} />
                )}
              </div>
              <div className="info">
                {/* <BiChevronDown title="More Info" /> */}
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre) => (
                  <li>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
});
const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 90;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3 ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
