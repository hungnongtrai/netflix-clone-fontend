import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Netflix from "./pages/Netflix";
import Player from "./pages/Player";
import Signup from "./pages/Signup";
import { Buffer } from "buffer";
import Recommend from "./pages/Recommend";
import TVShows from "./pages/TVShows";
import UserLiked from "./pages/UserLiked";
import Search from "./pages/Search";
import { ToastProvider } from "react-toast-notifications";

// @ts-ignore
window.Buffer = Buffer;
/**
 * @author
 * @function App
 **/

const App = (props) => {
  return (
    <ToastProvider placement="bottom-left">
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/player/:movieId" element={<Player />}></Route>
          <Route exact path="/movies" element={<Movies />}></Route>
          <Route exact path="/tv" element={<TVShows />}></Route>
          <Route exact path="/mylist" element={<UserLiked />}></Route>
          <Route exact path="/recommend" element={<Recommend />}></Route>
          <Route exact path="/" element={<Netflix />}></Route>
          <Route exact path="/search/:movieName" element={<Search />}></Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
};

export default App;
