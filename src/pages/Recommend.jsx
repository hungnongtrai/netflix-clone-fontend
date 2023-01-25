import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { width } from "@mui/system";
import axios from "axios";
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
/**
 * @author
 * @function Recommend
 **/
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFilledInput-root": {
      background: "rgb(14, 17, 23)",
      color: "rgb(250, 250, 250)",
    },
  },
}));
export default function Recommend() {
  const navigate = useNavigate();
  const classes = useStyles();

  const [isScrolled, setIsScrolled] = useState(false);
  const [options, setOptions] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [movieSelected, setMovieSelected] = useState({ label: "Avatar" });
  const fetchData = async () => {
    // const { data } = await axios.get("movie_dict.pkl");
    // var jpickle = require("jpickle");

    // var unpickled = jpickle.loads(data);

    // console.log(unpickled);
    // console.log(data.toString());
    // const nodePickle = require("node-pickle");

    axios
      .get(`https://panoramic-quartz-production.up.railway.app/`)
      .then(function (response) {
        console.log(response);
        const temp = [];
        for (let i = 0; i < response.data.message.length; i++) {
          temp.push({
            id: i,
            label: response.data.message[i],
          });
        }
        setOptions(temp);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const recommenMovie = () => {
    console.log(movieSelected);
    axios
      .post(
        `https://panoramic-quartz-production.up.railway.app/recommend_movie?movie=${movieSelected.label}`
      )
      .then(function (response) {
        console.log(response);
        const temp = [];
        for (let i = 0; i < response.data.names.length; i++) {
          temp.push({
            img: response.data.posters[i],
            title: response.data.names[i],
          });
        }
        setRecommend(temp);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    // if (currentUser) navigate("/");
  });
  return (
    <div>
      <Container>
        <div className="navbar">
          <Navbar isScrolled={isScrolled} />
        </div>
        <div className="data">
          <h1>Movie Recommender System</h1>
        </div>
      </Container>
      <Auto>
        <Autocomplete
          className={classes.root}
          disablePortal
          id="combo-box-demo"
          options={options}
          sx={{ input: { color: "white" } }}
          // getOptionLabel={(option) => option.name || ""}
          getOptionLabel={(option) => option.label || ""}
          // isOptionEqualToValue={(option, value) => {
          //   console.log("Option", option);
          //   console.log("Value", value);
          //   console.log("Result", option.label === value);
          //   return option.label === value;
          // }}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.id}>
                {option.label}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Movie"
              color="warning"
              sx={{ input: { color: "white" } }}
              // key={Math.random()}
            />
          )}
          defaultValue={{ id: 0, label: "Avatar" }}
          onChange={(e, value) => setMovieSelected(value)}
        />
      </Auto>
      <But>
        <Button
          variant="outlined"
          color="error"
          onClick={recommenMovie}
          style={{ marginBottom: "15px" }}
        >
          Recommend
        </Button>{" "}
        <ImageList sx={{ width: "100%", height: 560 }} cols={5} gap={10}>
          {recommend.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=124&fit=crop&auto=format`}
                srcSet={`${item.img}?w=100&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar title={item.title} position="below" />
            </ImageListItem>
          ))}
        </ImageList>
      </But>
    </div>
  );
}
const Container = styled.div`
  .data {
    margin-top: 8rem;
    margin-bottom: 2rem;
    text-align: center;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;

const Auto = styled.div`
  background: rgb(14, 17, 23);
  color: white;
  width: 95%;
  margin: 0 auto;
`;

const But = styled.div`
  width: 95%;
  margin: 0 auto;
  margin-top: 15px;
`;
