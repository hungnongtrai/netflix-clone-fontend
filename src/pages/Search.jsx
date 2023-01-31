import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres, getUserLikedMovies } from "../store";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import SelectGenre from "../components/SelectGenre";
import Card from "../components/Card";
import { TMDB_BASE_URL, API_KEY } from "../utils/constants";
import axios from "axios";

/**
 * @author
 * @function Search
 **/

const Search = (props) => {
  const navigate = useNavigate();
  const { movieName } = useParams();

  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);
  const [movies, setMovies] = useState([]);
  const genres = useSelector((state) => state.netflix.genres);
  const dispatch = useDispatch();
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const createArrayFromRawData = (array) => {
    const moviesArray = [];
    array.forEach((movie) => {
      const movieGenres = [];
      movie.genre_ids.forEach((genre) => {
        const name = genres.find(({ id }) => id === genre);
        if (name) movieGenres.push(name.name);
      });
      console.log(movie);
      if (movie.backdrop_path) {
        moviesArray.push({
          id: movie.id,
          name: movie?.original_name
            ? movie.original_name
            : movie.original_title,
          image: movie.backdrop_path,
          genres: movieGenres.slice(0, 3),
        });
      }
    });
    setMovies(moviesArray);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${movieName}&page=1&include_adult=false`
      )
      .then(function (response) {
        console.log("Search", response);
        // const temp = response.data.videos.results.find((vid) =>
        //   vid.name.includes("Official Trailer")
        // );
        createArrayFromRawData(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>Search: {movieName}</h1>
        <div className="grid flex">
          {movies ? (
            movies.map((movie, index) => {
              return (
                <Card
                  movieData={movie}
                  index={index}
                  key={movie.id}
                  isLiked={true}
                />
              );
            })
          ) : (
            <h1>No Movies Found</h1>
          )}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;

export default Search;
