import React, { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/Slider";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useToasts } from "react-toast-notifications";

// import jpickle from "jpickle";
// import pickle from "pickle";
/**
 * @author
 * @function Netflix
 **/
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Netflix = (props) => {
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [noti, setNoti] = useState("");
  const { addToast } = useToasts();

  const [typeNoti, setTypeNoti] = useState("success");
  console.log("Test open", open);
  console.log("Test noti", noti);
  console.log("Test type", typeNoti);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);

  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const addToastHandler = useCallback((msg, type) => {
    addToast(msg, { appearance: type, autoDismiss: true });
  }, []);

  const handleAddToList = () => {
    // setOpen(true);
    // setNoti("You added the movie to list");
    // setTypeNoti("success");
  };
  const handleLike = () => {
    // console.log("Test like");
    // setOpen(true);
    // setNoti("You liked!");
    // setTypeNoti("success");
  };
  const handleDislike = () => {
    // setOpen(true);
    // setNoti("You Disliked!");
    // setTypeNoti("error");
  };
  useEffect(() => {
    dispatch(getGenres());
    // const fs = require("fs");
    // console.log(movie_dict);
    // const jpickled = jpickle.loads(data);
    // const binary = fs.readFileSync("./movie_dict.pkl", "binary");
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded]);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Test
        </Alert>
      </Snackbar>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button
              className="flex j-center a-center"
              onClick={() => navigate("/player")}
            >
              <FaPlay /> Play
            </button>
            {/* <button className="flex j-center a-center">
              <AiOutlineInfoCircle /> More Info
            </button> */}
          </div>
        </div>
      </div>
      <Slider movies={movies} addToastHandler={addToastHandler} />
    </Container>
  );
};

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;
export default Netflix;
