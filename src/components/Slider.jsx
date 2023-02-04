import React from "react";
import CardSlider from "./CardSlider";

/**
 * @author
 * @function Slider
 **/

export default React.memo(function Slider({ movies, addToastHandler }) {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };
  // console.log(movies);
  return (
    <div>
      <CardSlider
        title="Trending Now"
        data={getMoviesFromRange(0, 10)}
        key={1}
        addToastHandler={addToastHandler}
      />
      <CardSlider
        title="New Releases"
        data={getMoviesFromRange(10, 20)}
        key={2}
        addToastHandler={addToastHandler}
      />
      <CardSlider
        title="Blockbuster Movies"
        data={getMoviesFromRange(20, 30)}
        key={3}
        addToastHandler={addToastHandler}
      />
      <CardSlider
        title="Popular On Netflix"
        data={getMoviesFromRange(30, 40)}
        key={4}
        addToastHandler={addToastHandler}
      />
      <CardSlider
        title="Action Movies"
        data={getMoviesFromRange(40, 50)}
        key={5}
        addToastHandler={addToastHandler}
      />
      <CardSlider
        title="Epics"
        data={getMoviesFromRange(50, 60)}
        key={6}
        addToastHandler={addToastHandler}
      />
    </div>
  );
});
