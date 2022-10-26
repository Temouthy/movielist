import React from "react";
import MovieCard from "./MovieCard";
import Typography from "@mui/material/Typography";

function MovieList(props) {
  const { movies } = props;
  const watchedMovies = movies.filter((item) => !item.description.watched);
  const unwatchedMovies = movies.filter((item) => item.description.watched);
  return (
    <div>
      <Typography variant="h5" align="center">
        Movies to watch
      </Typography>
      <MovieCard
        movies={watchedMovies}
        deleteData={props.deleteData}
        updateData={props.updateData}
      />
      <Typography variant="h5" align="center">
        Watched Movies
      </Typography>
      <MovieCard
        movies={unwatchedMovies}
        deleteData={props.deleteData}
        updateData={props.updateData}
      />
    </div>
  );
}

export default MovieList;
