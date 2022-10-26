import React from "react";
import MovieCard from "./MovieCard";

function MovieList(props) {
  const { movies } = props;
  //console.log("movies", movies);
  const watchedMovies = movies.filter((item) => !item.description.watched);
  const unwatchedMovies = movies.filter((item) => item.description.watched);
  return (
    <div>
      <h2>Movies to watch</h2>
      <MovieCard
        movies={watchedMovies}
        deleteData={props.deleteData}
        updateData={props.updateData}
      />
      <h2>Watched Movies</h2>
      <MovieCard
        movies={unwatchedMovies}
        deleteData={props.deleteData}
        updateData={props.updateData}
      />
    </div>
  );
}

export default MovieList;
