import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.scss";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();

    const serializedMovies = data.results.map((movie) => {
      return {
        id: movie.episide_id,
        title: movie.title,
        openingText: movie.opening_crawl,
        releaseDate: movie.release_date,
      };
    });

    setMovies(serializedMovies);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>No movies yet.</p>}
        {isLoading && <p>Loading..</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
